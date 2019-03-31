import { ElementLoader } from './class_ElementLoader';
import { ElementLoad } from './class_ElementLoad';
import { DebugLevel } from './enums';
import { ElLocation } from 'element-helper-lite';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { IEventArgs } from './class_EventArgs';
// import { exceptionMessages } from './appResourceString';
// import { ResourceTest } from './class_ResourceTest';
import './ext';

export class MainElementLoader extends ElementLoader {

  protected onBeforeStart(args: IEventArgs): void {
    // #region [debug]
    const methodName: string = 'onBeforeStart';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered`); }
    // #endregion debug
    if (args.cancel === true) {
      return;
    }
    this.addStyleCss();
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
 /*  private testForResource(key: string, timing: number = 500, attempts: number = 30, ...globalRes: string[]) {
    if (this.hasElement(key)) {
      this.dispose();
      throw new Error(String.Format(exceptionMessages.argKeyExist, 'key', key));
    }
    const lt: ResourceTest = new ResourceTest(timing, attempts, ...globalRes);
    this.addElement(key, lt);
  } */
  // #region Style css
  private addStyleCss(): void {
    // #region [debug]
    const methodName: string = 'addStyleCss';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered`); }
    // #endregion debug
    this.addStyle('styleCss', this.getStyleCss(), ElLocation.head);
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  private getStyleCss(): string {
    const css = '// BUILD_INCLUDE("./scratch/css/style.min.css")';
    return css;
  }
  //  #end Style css
 /*  private _addStyleLink(key: string, srcLink: string, elementLocation: ElementLocation = ElementLocation.head): void {
    // #region [debug]
    const methodName: string = 'EvernoteElementLoader.addStyleLink';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.debug(`${methodName}: Entered`);
      Log.debug(`${methodName}: Adding Csslink for key: ${key} and src ${srcLink}`);
    }
    // #endregion debug
    const elCss = new ElementLoad({
      scriptLocation: elementLocation,
      elementCreate: {
        elementTag: 'link',
        elementAttributes: {
          type: 'text/css',
          href: srcLink,
          rel: 'stylesheet'
        }
      }
    });
    this.addElement(key, elCss);
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
    // #endregion debug
  } */

  private addStyle(key: string, styelcontent: string, elementLocation: ElLocation = ElLocation.head): void {
    // #region [debug]
    const methodName: string = 'EvernoteElementLoader.addStyle';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.Debug(`${methodName}: Entered`);
      Log.Debug(`${methodName}: Adding Csslink for key: ${key}`);
    }
    // #endregion debug
    const elCss = new ElementLoad({
      scriptLocation: elementLocation,
      elementCreate: {
        tag: 'style',
        text: styelcontent,
        attribs: {
          type: 'text/css'
        }
      }
    });
    this.addElement(key, elCss);
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
}