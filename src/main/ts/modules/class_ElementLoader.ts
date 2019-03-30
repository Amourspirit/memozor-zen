import { IEvent, EventDispatcher } from 'strongly-typed-events';
import { ElementLoaderEventArgs } from './class_ElementLoaderEventArgs';
import { IKeyValueGeneric, IDisposable } from './interfaces';
import { BaseElementLoad } from './abstract_class_BaseElementLoad';
import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
import { ElementsLoadedArgs } from './class_ElementsLoadedArgs';
import { IEventArgs, EventArgs } from './class_EventArgs';
import { ElementsLoadFailArgs } from './class_ElementsLoadFailArgs';
export class ElementLoader implements IDisposable {
  private lTotalScripts: number = 0; // the total number of scritps added with addElement
  private lEvents: IKeyValueGeneric<BaseElementLoad>;
  private lEventsFailed: Array<string> = [];
  private lOnElementLoaded = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  private lOnAllElementLoaded = new EventDispatcher<ElementLoader, ElementsLoadedArgs>();
  private lOnElementLoadFail = new EventDispatcher<ElementLoader, ElementsLoadFailArgs>();
  private lOnTick = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  private lOnTickExpired = new EventDispatcher<ElementLoader, ElementLoaderEventArgs>();
  public constructor() {
    this.lEvents = {};
  }
  public addElement(key: string, e: BaseElementLoad): void {
    // #region [debug]
    const methodName: string = 'ElementLoader.addElement';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered.`); }
    // #endregion debug
    if (key.length === 0) {
      Log.Error(`${appSettings.shortName}: addElement: key argument can not be an empty string`);
      return;
    }
    if (this.lEvents.hasOwnProperty(key)) {
      Log.Error(`${appSettings.shortName}: addElement: key ${key} is already in the list of elemets and can not be added again`);
      return;
    }
    this.lEvents[key] = e;
    this.lTotalScripts++;
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  public hasElement(key: string): boolean {
    // #region [debug]
    const methodName: string = 'ElementLoader.methodName';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered.`); }
    // #endregion debug
    if (key.length === 0) {
      Log.DebugWarn(`${appSettings.shortName}: addElement: key is empty`);
      return false;
    }
    const reslut: boolean = this.lEvents.hasOwnProperty(key);
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
    return reslut;
  }
  public onAllElementsLoaded(): IEvent<ElementLoader, ElementsLoadedArgs> {
    return this.lOnAllElementLoaded.asEvent();
  }
  public onElementsLoadFail(): IEvent<ElementLoader, ElementsLoadFailArgs> {
    return this.lOnElementLoadFail.asEvent();
  }
  public onElementLoaded(): IEvent<ElementLoader, ElementLoaderEventArgs> {
    return this.lOnElementLoaded.asEvent();
  }
  public onTick(): IEvent<ElementLoader, ElementLoaderEventArgs> {
    return this.lOnTick.asEvent();
  }
  public onTickExpired(): IEvent<ElementLoader, ElementLoaderEventArgs> {
    return this.lOnTickExpired.asEvent();
  }

  public start(): void {
    // #region [debug]
    const methodName: string = 'ElementLoader.start';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered`); }
    // #endregion debug
    const onBeforeStartEventArgs = new EventArgs();
    this.onBeforeStart(onBeforeStartEventArgs);
    if (onBeforeStartEventArgs.cancel === true) {
      // #region [debug]
      Log.Debug(`${methodName}: Exiting due to event was canceled `);
      // #endregion debug
      return;
    }
    for (const key in this.lEvents) {
      if (this.lEvents.hasOwnProperty(key)) {
        const element: BaseElementLoad = this.lEvents[key];
        element.onTick().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          this.tick(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          // #region [debug]
          Log.Debug(`${methodName}: Dispatching onTick for key: ${eArgs.key}`);
          // #endregion debug
          this.lOnTick.dispatch(this, eArgs);
        });
        element.onExpired().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          // dispose the class if time is up.
          sender.dispose();
          this.tickExpired(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          // #region [debug]
          Log.Debug(`${methodName}: Dispatching onTickExpired for key: ${eArgs.key}`);
          // #endregion debug
          this.lOnTickExpired.dispatch(this, eArgs);
        });
        element.onElementLoaded().subscribe((sender, args) => {
          const eArgs: ElementLoaderEventArgs = new ElementLoaderEventArgs(key, args);
          // dispose the class now that the script is loaded.
          sender.dispose();
          this.elementLoaded(eArgs);
          if (eArgs.cancel === true) {
            return;
          }
          // #region [debug]
          Log.Debug(`${methodName}: Dispatching onElementLoaded for key: ${eArgs.key}`);
          // #endregion debug
          this.lOnElementLoaded.dispatch(this, eArgs);
        });
        element.start();
      }
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
    this.onAfterStart(new EventArgs());
  }
  /**
   * Disposes all of the events
   */
  public dispose() {
    for (const key in this.lEvents) {
      if (this.lEvents.hasOwnProperty(key)) {
        const el = this.lEvents[key];
        if (el.isDisposed === false) {
          el.dispose();
        }
      }
    }
    this.lEvents = {};
  }
  protected onBeforeStart(args: IEventArgs): void {
    return;
  }
  protected onAfterStart(args: IEventArgs): void {
    return;
  }
  private elementLoaded(args: ElementLoaderEventArgs): void {
    // #region [debug]
    const methodName: string = 'ElementLoader.elementLoaded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.Debug(`${methodName}: Entered.`);
      Log.Debug(`${methodName}: args key: ${args.key}`);
    }
    // #endregion debug
    if (this.lEvents.hasOwnProperty(args.key) === false) {
      Log.Error(`${appSettings.shortName}: elementLoaded: key ${args.key} was not found to delete. This may be a serious error`);
      return;
    } else {
      // delete the added script
      delete this.lEvents[args.key];
    }
    this.goForFinish();
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  private tick(args: ElementLoaderEventArgs): void {
    // #region [debug]
    const methodName: string = 'ElementLoader.tick';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.Debug(`${methodName}: Entered.`);
      Log.Debug(`${methodName}: tick for key ${args.key}`);
    }
    // #endregion debug
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
    return;
  }
  private tickExpired(args: ElementLoaderEventArgs): void {
    // #region [debug]
    const methodName: string = 'ElementLoader.tickExpired';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) {
      Log.Debug(`${methodName}: Entered`);
      Log.Debug(`${methodName}: for key: ${args.key}`);
    }
    // #endregion debug
    // set the args loadFailed property
    args.loadFailed = true;
    // add faile event key to failed events array
    this.lEventsFailed.push(args.key);
    // event if the event failed we want to remove if from the list of events
    if (this.lEvents.hasOwnProperty(args.key) === false) {
      Log.Error(`${appSettings.shortName}: tickExpired: key ${args.key} was not found to delete. This may be a serious error`);
      return;
    } else {
      // delete the added script
      delete this.lEvents[args.key];
    }
    this.goForFinish();
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
    return;
  }
  private allElementsLoaded(args: ElementsLoadedArgs): void {
    // #region [debug]
    const methodName: string = 'ElementLoader.allScriptsLoaded';
    // Higher price to check using enumes each time so capture the values here
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered.`); }
    // #endregion debug
    if (this.lEventsFailed.length > 0) {
      // #region [debug]
      Log.Debug(`${methodName}: Failed to load all elements. Dispatching onElementsLoadFail()`);
      // #endregion debug
      args.cancel = true;
      const eArgs: ElementsLoadFailArgs = new ElementsLoadFailArgs(this.lTotalScripts, this.lEventsFailed);
      this.lOnElementLoadFail.dispatch(this, eArgs);
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
    return;
  }
  private goForFinish() {
    // #region [debug]
    const methodName: string = 'ElementLoader.goForFinish';
    const appDebugLevel = appSettings.debugLevel;
    const levelDebug = DebugLevel.debug;
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Entered`); }
    // #endregion debug
    const done: boolean = this.isElementsLoaded();
    if (done) {
      // #region [debug]
      Log.Debug(`${methodName}: All elemets are loaded dispatching onAllElementsLoaded`);
      // #endregion debug
      const eArgs = new ElementsLoadedArgs(this.lTotalScripts);
      this.allElementsLoaded(eArgs);
      if (eArgs.cancel === false) {
        this.lOnAllElementLoaded.dispatch(this, eArgs);
      }
    } else {
      // #region [debug]
      Log.Debug(`${methodName}: Not elemets are loaded yet`);
      // #endregion debug
    }
    // #region [debug]
    if (appDebugLevel >= levelDebug) { Log.Debug(`${methodName}: Leaving`); }
    // #endregion debug
  }
  /*
 * Function to check and see if there are any element left to be loaded
 * @returns boolean, true if all the elements are loaded; Otherwise false
 */
  private isElementsLoaded(): boolean {
    for (const key in this.lEvents) {
      if (this.lEvents[key]) {
        return false;
      }
    }
    return true;
  }
}