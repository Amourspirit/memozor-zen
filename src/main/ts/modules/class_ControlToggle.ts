import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import $ from 'jquery';
import { elementsCreate } from './ElementHelper';
import { IElementCreate } from './interfaces';

export class ControlToggle {
  private lDivWrapId: string = 'mem-ctl-wrap';
  private lDivtoggleId: string = 'mem-div-tog';
  private lVisible: boolean = true;
  public init() {
    // @debug start
    const methodName: string = 'ControlToggle.init';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    if (this.controlExist() === true) {
      this.wrapControl();
      this.addControlClass();
      this.insertToggle();
      this.addOnClick();
    } else {
      Log.message(`Selector ${appSettings.controlSelector} is not found on this page`);
    }
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  private addControlClass(): void {
    $(appSettings.controlSelector).addClass('mem-fs-ctl');
  }
  private addOnClick(): void {
    $(`#${this.lDivtoggleId}`).on('click', () => {
      this.toggle();
    });
  }
  private controlExist(): boolean {
    return $(appSettings.controlSelector).length === 1;
  }
  private insertToggle(): void {
    const html: IElementCreate = {
      elementTag: 'div',
      elementAttributes: {
        id: this.lDivtoggleId,
        class: 'mem-fs-div-tog'
      },
      childElements: [{
        elementTag: 'i',
        elementAttributes: {
          class: 'mem-fs-tog up'
        }
      }]
    };
    const arrow: HTMLElement = elementsCreate(html);
    $(`#${this.lDivWrapId}`).prepend(arrow);
  }
  private wrapControl(): void {
    // @debug start
    const methodName: string = 'ControlToggle.wrapControl';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
    // @debug end
    const htmlWrap: IElementCreate = {
      elementTag: 'div',
      elementAttributes: {
        id: this.lDivWrapId,
        class: 'mem-fs-toggle-ctl'
      }
    };
    const wrapDiv: HTMLElement = elementsCreate(htmlWrap);
    $(appSettings.controlSelector).wrap(wrapDiv);
    // @debug start
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // @debug end
  }
  private toggle(): void {
    const el = $('i.mem-fs-tog');
    if (this.lVisible) {
     $(appSettings.controlSelector).slideUp('slow', () => {
        el.removeClass('up');
        el.addClass('down');
      });
    } else {
      $(appSettings.controlSelector).slideDown('slow', () => {
        el.removeClass('down');
        el.addClass('up');
      });
    }
    this.lVisible = !this.lVisible;
  }
}