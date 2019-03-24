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
  buttonId: 'fsmc-btn',
  shortName: 'fsmc',
  preKey: 'fsmc_',
  debugLevel: DebugLevel.none,
  gameBoardSelector: 'div#game',
  buttonPlacementSelector: 'body',
  controlSelector: 'div#control'
};