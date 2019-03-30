import { Log } from './modules/class_Log';
import { appSettings } from './modules/appSettings';
import { MainElementLoader } from './modules/class_MainLoader';
import { Fullscreen } from './modules/class_Fullscreen';
import { IntervalManual } from './modules/class_InternalManual';
import { ControlToggle } from './modules/class_ControlToggle';
import $ from 'jquery';

const validateIfTop = (): boolean => {
  return window.top === window.self;
};

const main = () => {
  Log.Info(`${appSettings.shortName}: Start main...`);
  const ctlTog: ControlToggle = new ControlToggle();
  ctlTog.init();
  const fs: Fullscreen = new Fullscreen();
  fs.init();
  Log.Info(`${appSettings.shortName}: End main...`);
};

if (validateIfTop()) {
  Log.Info(appSettings.shortName + ': Entry Script: Start loading...');
  const iv: IntervalManual = new IntervalManual(500, 30);
  iv.onTick().subscribe((s, a): void => {
    if ($(appSettings.gameBoardSelector).length === 1) {
      iv.dispose();
      const loader: MainElementLoader = new MainElementLoader();
      loader.onAllElementsLoaded().subscribe((sender, args): void => {
        loader.dispose();
        Log.Info(`${appSettings.shortName}: Entry Script: All Scripts loaded. Total count: ${args.totalNumberOfScripts}`);
        main();
      });
      loader.onElementsLoadFail().subscribe((sender, args): void => {
        loader.dispose();
        Log.Error(`${appSettings.shortName}: Entry Script: The neceassary elements were note loaded. Failed:`, args.remainingEvents);
      });
      loader.onElementLoaded().subscribe((sender, args): void => {
        Log.Info(`${appSettings.shortName}: Entry Script: Element with Key value of '${args.key}' has loaded`);
      });
      loader.onTickExpired().subscribe((sender, args): void => {
        Log.Warn(`${appSettings.shortName}: Entry Script: Element with Key value of '${args.key}' has failed to load`);
      });
      loader.start();
    }
  });
  iv.onExpired().subscribe((sender, args): void => {
    Log.Info(`${appSettings.shortName}: No game board found on this page`);
  });
  iv.start();
  Log.Info(appSettings.shortName + ': Entry Script: End loading...');
}
