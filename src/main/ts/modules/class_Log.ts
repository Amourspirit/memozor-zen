import { appSettings } from './appSettings';
import { DebugLevel } from './enums';
export class Log {

  public static Info(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.info) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.info(msg, ...params);
  }

  public static Warn(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.warn) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.warn(msg, ...params);
  }

  public static Error(msg: any, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.error) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.error(msg, ...params);
  }
  public static Debug(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.debug) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.debug(`${appSettings.shortName}: Debug: ${msg}`, ...params);
  }

  public static DebugWarn(msg: string, optionalParams?: any[]): void {
    if (appSettings.debugLevel > DebugLevel.debug) {
      return;
    }
    const params = [];
    if (optionalParams) {
      for (let i = 0; i < optionalParams.length; i++) {
        params[i] = optionalParams[i];
      }
    }
    console.warn(`${appSettings.shortName}: Debug: ${msg}`, ...params);
  }
}