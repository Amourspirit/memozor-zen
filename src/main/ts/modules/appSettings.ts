import { DebugLevel } from './enums';

export interface IappSettings {
  debugLevel: DebugLevel;
  shortName: string;
  buttonId: string;
  preKey: string;
  gameBoardSelector: string;
  buttonPlacementSelector: string;
  controlSelector: string;
}

export const appSettings: IappSettings = {
  // #region [BUILD_REMOVE]
  // this next line will be deleted during grunt and replaced by debugLevel generated from package.json
  debugLevel: DebugLevel.debug,
  // #endregion BUILD_REMOVE
  // BUILD_INCLUDE('./scratch/text/debug_level.txt')
  buttonId: 'fsmc-btn',
  shortName: 'fsmc',
  preKey: 'fsmc_',
  gameBoardSelector: 'div#game',
  buttonPlacementSelector: 'body',
  controlSelector: 'div#control'
};