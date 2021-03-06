import { BaseElementLoad } from './abstract_class_BaseElementLoad';
import { exceptionMessages } from './appResourceString';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import { IIntervalEventArgs } from './class_IntervalEventArgs';
import { Log } from './class_Log';
import './ext';

export class ResourceTest extends BaseElementLoad {
  private lTestFuncton: Array<string>;
  constructor(timing: number = 500, attempts: number = 30, ...globalRes: string[]) {
    if (globalRes.length === 0) {
      throw new RangeError(String.Format(exceptionMessages.argEmptyString, 'globalRes'));
    }
    if (timing < 0) {
      throw new RangeError(String.Format(exceptionMessages.argLessThenZero, 'timing'));
    }
    if (attempts < 1) {
      throw new RangeError(String.Format(exceptionMessages.argLessThenOne, 'attempts'));
    }
    super(timing, attempts);
    this.lTestFuncton = globalRes;
  }
  /**
  * Overrides super method to capture onTick events
  * @param eventArgs The event args for the event
  *
  * If there is no globalRes functions to test the edOnScriptAdded is dispatched right awaway.
  * In this case there would only be one tick.
  *
  * If eventargs.cancel property is set to true for thie method then
  * the event onTick will not dispatch
  */
  protected onTickTock(eventArgs: IIntervalEventArgs): void {
    // #region [debug]
    const methodName: string = 'ResourceTest.onTickTock';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;

    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered.`); }
    Log.Debug(`${methodName} try no ${this.count}`);
    // #endregion debug
    if (this.lTestFuncton.length > 0) {
      if (this.fnArrayExist(this.lTestFuncton) === true) {
        this.elementLoaded.dispatch(this, eventArgs);
        this.dispose();
      } else {
        // #region [debug]
        if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Try no ${this.count}, Unable to find test function: ${this.lTestFuncton}`); }
        // #endregion debug
        this.elementLoaded.dispatch(this, eventArgs);
        this.dispose();
      }
    } else {
      // #region [debug]
      if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: There is no function to test for. Dispatching OnScriptAdded`); }
      // #endregion debug
      this.elementLoaded.dispatch(this, eventArgs);
      this.dispose();
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving: count: ${this.count}`); }
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
    const methodName: string = 'ResourceTest.onExpired';
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