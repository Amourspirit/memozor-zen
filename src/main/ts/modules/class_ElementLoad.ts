import { BaseElementLoad } from './abstract_class_BaseElementLoad';
import { DebugLevel } from './enums';
import { appSettings } from './appSettings';
import { Log } from './class_Log';
import { IIntervalEventArgs } from './class_IntervalEventArgs';

import { IElementCreate,
  ElLocation,
  elementAddToDoc,
  elementsCreate
} from 'element-helper-lite';

/**
 * Arguments for ElementLoad
 * @param scriptLocation (required) The location to inject the script such as head or body.
 * @param elementCreate (required) Elements creation arguments
 */
export interface IElementLoadArgs {
  /**
   * The location to inject the script such as head or body.
   */
  scriptLocation: ElLocation;
  /**
   * Elements creation arguments
   */
  elementCreate: IElementCreate;
}
/**
 * Adds css inline to document page
 */
export class ElementLoad extends BaseElementLoad {
  private lArgs: IElementLoadArgs;
  /**
   * Creates a new instance of the class
   * @param args The arguments to create a new instance of the claas
   * @param args.scriptLocation {ElementLocation} The location to inject the script such as head or body.
   * @param arg.elementCreate {IElementCreate} Elements creation arguments
   */
  public constructor(args: IElementLoadArgs) {
    super(0, 1);
    this.lArgs = args;
  }
  /**
   * Overrides super method to capture onTick events
   * @param eventArgs The event args for the event
   *
   * If there is no script function to test the edOnScriptAdded is dispatched right awaway.
   * In this case there would only be one tick.
   *
   * If eventargs.cancel property is set to true for thie method then
   * the event onTick will not dispatch
   *
   * This method is expected only to be fired once on this class
   */
  protected onTickTock(eventArgs: IIntervalEventArgs): void {
    // #region [debug]
    const methodName: string = 'ElementLoad.onTickTock';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.Debug(`${methodName}: Entered.`);
    }
    // #endregion debug
    if (eventArgs.count > 1) {
      // #region [debug]
      Log.Debug(`${methodName}: eventArgs count has a value of: ${eventArgs.count} when a maxumim of 1 was expected`);
      // #endregion debug
      eventArgs.cancel = true;
      return;
    }
    if (this.lArgs.elementCreate.children) {
      const multiHtml: HTMLElement = elementsCreate(this.lArgs.elementCreate);
      elementAddToDoc(multiHtml, this.lArgs.scriptLocation);
    } else {
      const eHtml: HTMLElement = elementsCreate(this.lArgs.elementCreate);
      elementAddToDoc(eHtml, this.lArgs.scriptLocation);
    }
    // now that thte element is added to the document dispatch on script loaded.
    this.elementLoaded.dispatch(this, eventArgs);
    this.dispose();
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  /**
  * Overrides super method to capture onExpired events
  * @param eventArgs The event args for the event
  *
  * If eventargs.cancel property is set to true for thie method then
  * the event onExpired will not dispatch
  */
  protected onTickExpired(eventArgs: IIntervalEventArgs): void {
    // #region [debug]
    const methodName: string = 'ElementLoad.onExpired';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) {
      Log.Debug(`${methodName}: Entered.`);
    }
    Log.Debug(`${methodName} try no ${this.count}`);
    Log.Debug(`${methodName}: Leaving.`);
    // #endregion debug
    return;
  }
}