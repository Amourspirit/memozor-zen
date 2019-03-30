// import jQ from 'jquery';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import { IntervalManual } from './class_InternalManual';
import $ from 'jquery';
import { elementsCreate } from './ElementHelper';
import { IElementCreate } from './interfaces';
// import * as jQ from 'jquery';
// see: https://stackoverflow.com/questions/33768509/how-to-make-an-iframe-to-go-fullscreen-on-a-button-click
export class Fullscreen {
  protected inFullScreen: boolean = false;
  private lWrapDivId: string = 'mem-fs-game-wrap';
  public init(): void {
    this.addDoucmentEvent();
    this.injectButton();
    this.addBtnClick();
  }
  private toggleDisplay(): void {
    // #region [debug]
    const methodName: string = 'toggleDisplay';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // #endregion debug
    const jqGameBoard = $(appSettings.gameBoardSelector);
    if (jqGameBoard.length !== 1) {
      // #region [debug]
      Log.debugWarn(`${methodName}: unable to find element with selector of: ${appSettings.gameBoardSelector}`);
      // #endregion debug
      return;
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  private injectButton(): void {
    const divBtnHolder: JQuery<HTMLElement> = $(appSettings.buttonPlacementSelector);
    if (!divBtnHolder.length) {
      Log.error(`${appSettings.shortName} could not find where to place button: selector: ${appSettings.buttonPlacementSelector}`);
      return;
    }
    const btnHtml = this.getButton();
    // Log.message(`${appSettings.shortName} Button HTML: ${btnHtml}`);
    // divBtnHolder.insertBefore(btnHtml);
    divBtnHolder.append(btnHtml);
  }
  private getButton(): HTMLElement {
    /* let html: string = `<div id="${appSettings.buttonId}"`;
    html += ' class="enfs-button"><span class="enfs-btntooltip">Click to open note in full screen view</span></div>';
    return html; */
    const htmlArgs: IElementCreate = {
      elementTag: 'div',
      elementAttributes: {
        class: 'mem-fs-button-parent'
      },
      childElements: [{
        elementTag: 'div',
        elementAttributes: {
          id: appSettings.buttonId,
          class: 'mem-fs-button'
        }
      },
      {
        elementTag: 'span',
        elementAttributes: {
          class: 'mem-fs-btntooltip'
        },
        elementText: 'Click to open game in full screen view'
      }]
    };
    const btnDiv: HTMLElement = elementsCreate(htmlArgs);
    return btnDiv;
  }
  private addBtnClick(): void {
    // #region [debug]
    const methodName: string = 'addBtnClick';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // #endregion debug
    const intTick = new IntervalManual(500, 30);
    intTick.onTick().subscribe((): void => {
      const divBtn: JQuery<HTMLElement> = $(`#${appSettings.buttonId}`);
      if (!divBtn.length) {
        Log.message(`try no: ${intTick.count} looking for button: ${appSettings.buttonId}`);
        return;
      }
      Log.message(`Found button ${appSettings.buttonId} on try ${intTick.count}`);
      intTick.dispose();
      divBtn.on('click', (): void => {
        // #region [debug]
        Log.message('Button onclick fired');
        // #endregion debug
        const jqGameBoard = $(appSettings.gameBoardSelector);

        if (jqGameBoard.length !== 1) {
          // #region [debug]
          Log.debugWarn(`${methodName}: unable to find element with selector of: ${appSettings.gameBoardSelector}`);
          // #endregion debug
          return;
        }
        jqGameBoard.wrap(this.getGameWrapper());
        const gmBoard = $(`#${this.lWrapDivId}`)[0];
        if (gmBoard) {

          if (gmBoard.requestFullscreen) {
            gmBoard.requestFullscreen();
          } else if ((gmBoard as any).webkitRequestFullscreen) {
            (gmBoard as any).webkitRequestFullscreen();
          } else if ((gmBoard as any).mozRequestFullScreen) {
            (gmBoard as any).mozRequestFullScreen();
          } else if ((gmBoard as any).msRequestFullscreen) {
            (gmBoard as any).msRequestFullscreen();
          }
        }
      });
    });
    intTick.onExpired().subscribe((): void => {
      Log.warn(`Unable to find button ${appSettings.buttonId}`);
    });
    intTick.start();
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
// #endregion debug
  }
  private addDoucmentEvent(): void {
    // #region [debug]
    const methodName: string = 'addDoucmentEvent';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // #endregion debug
    if (document.fullscreenEnabled) {
      document.addEventListener('fullscreenchange', this.fullScreenChange);
    } else if ((document as any).webkitExitFullscreen) {
      document.addEventListener('webkitfullscreenchange', this.fullScreenChange);
    } else if ((document as any).mozRequestFullScreen) {
      document.addEventListener('mozfullscreenchange', this.fullScreenChange);
    } else if ((document as any).msRequestFullscreen) {
      document.addEventListener('MSFullscreenChange', this.fullScreenChange);
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // #endregion debug
  }

  private fullScreenChange = (): void => {
    // #region [debug]
    const methodName: string = 'fullScreenChange';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // #endregion debug
    if (document.fullscreenEnabled ||
      (document as any).webkitIsFullScreen ||
      (document as any).mozFullScreen ||
      (document as any).msFullscreenElement) {
      this.inFullScreen = !this.inFullScreen;
      this.toggleClass();
      this.toggleDisplay();
      // #region [debug]
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: In Fullscreen`); }
      // #endregion debug
    } else {
      // #region [debug]
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Not in Fullscreen`); }
      // #endregion debug
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  private getGameWrapper(): HTMLElement {
    const htmlArgs: IElementCreate = {
      elementTag: 'div',
      elementAttributes: {
        id: this.lWrapDivId,
        class: `mem-fs-no-sel ${this.getWrapperBgClass()}`
      }
    };
    return elementsCreate(htmlArgs);
  }
  private getWrapperBgClass(): string {
    const loc: string = window.location.href;
    let result: string;
    if (loc.includes('grids-of-black-squares')
      || loc.includes('abacus-games')
      || loc.includes('grids-of-pictures')) {
      result = 'mem-fs-game-gobs';
    } else if (loc.includes('simon-games')) {
      result = 'mem-fs-game-sg';
    } else if (loc.includes('sight-word-games')) {
      result = 'mem-fs-game-swg';
    } else {
      result = 'mem-fs-game';
    }
    return result;
  }
  private toggleClass(): void {
    // #region [debug]
    const methodName: string = 'toggleClass';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // #endregion debug
    const elBoard = $(appSettings.gameBoardSelector);
    if (elBoard.length !== 1) {
      // #region [debug]
      Log.debugWarn(`${methodName}: unable to find ${this.lWrapDivId}`);
      // #endregion debug
      return;
    }
    if (this.inFullScreen === false) {
      elBoard.unwrap();
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
}