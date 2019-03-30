import { Log } from './class_Log';
import { appSettings } from './appSettings';
import { IElementCreate } from './interfaces';
import { utilCreateElement } from './app_util';
import {
  DebugLevel,
  ElementLocation
} from './enums';

export const elementAddToDoc = (e: HTMLElement, nodeLocation: ElementLocation): void => {
  // #region [debug]
  const methodName: string = 'elementAddToDoc';
  const appDebugLevel = appSettings.debugLevel;
  const levelDebug = DebugLevel.debug;
  if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Entered`); }
  // #endregion debug
  const D: Document = document;
  let targ: Element;
  switch (nodeLocation) {
    case ElementLocation.body:
      // #region [debug]
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Case body`); }
      // #endregion debug
      targ = D.getElementsByTagName('body')[0] || D.body;
      break;
    case ElementLocation.head:
      // #region [debug]
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Case head`); }
      // #endregion debug
      targ = D.getElementsByTagName('head')[0] || D.head;
      break;
    default:
      // #region [debug]
      if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Case default: body, documentelement`); }
      // #endregion debug
      targ = D.getElementsByTagName('body')[0] || D.body || D.documentElement;
      break;
  }
  targ.appendChild(e);
  // #region [debug]
  if (appDebugLevel >= levelDebug) { Log.debug(`${methodName}: Leaving`); }
  // #endregion debug
};
/**
 * Creates an Html element
 * @param args {IElementCreate} Extra parameters such as type and any other parameters
 * @returns {HTMLElement} Element with any extra attributes set
 *
 * To created nested html elements see elementsCreate.
 */
export const elementCreate = (args: IElementCreate): HTMLElement => {
  // #region [debug]
  const methodName: string = 'elementCreate';
  // Higher price to check using enumes each time so capture the values here
  const appDebugLevel = appSettings.debugLevel;
  const levelDebug = DebugLevel.debug;

  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Entered.`);
  }
  // #endregion debug

  const htmlNode: HTMLElement = utilCreateElement(args.elementTag); // D.createElement('script');
  if (args.elementAttributes) {
    for (const key in args.elementAttributes) {
      if (args.elementAttributes.hasOwnProperty(key)) {
        const value = args.elementAttributes[key];
        htmlNode.setAttribute(key, value);
      }
    }
  }
  if (args.elementHtml && args.elementHtml.length > 0) {
    htmlNode.innerHTML = args.elementHtml;
  }
  if (args.elementText && args.elementText.length > 0) {
    htmlNode.textContent = args.elementText;
  }
  // #region [debug]
  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Leaving`);
  }
  // #endregion debug
  return htmlNode;
};
/**
 * Creates HTMLElement with nested child elements
 * @param args The arguments that contain recursive elements to add.
 * @returns HTMLElement
 *
 * To created simple html elements see elementCreate.
 * @example
 ```ts
const args: IElementCreate = {
  elementTag: 'div',
  elementAttributes: {
    id: 'tinybox',
    class: 'gmbox gmbox-window'
  },
  childElements: [{
    elementTag: 'div',
    elementAttributes: {
      class: 'gmclose'
    }
  },
  {
    elementTag: 'div',
    elementAttributes: {
      id: appSettings.fullScreenRealId,
    },
    childElements: [{
        elementTag: 'textarea',
        elementAttributes: {
          id: appSettings.tinyId,
          rows: '18',
          cols: '66'
        }
      }]
  }]
}
 ```
 */
export const elementsCreate = (args: IElementCreate): HTMLElement => {
  // #region [debug]
  const methodName: string = 'elementsCreate';
  // Higher price to check using enumes each time so capture the values here
  const appDebugLevel = appSettings.debugLevel;
  const levelDebug = DebugLevel.debug;

  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Entered`);
  }
  // #endregion debug
  const parentEl: HTMLElement = elementCreate(args);
  if (args.childElements) {
    addElementRecursive(parentEl, args.childElements);
  }
  // #region [debug]
  if (appDebugLevel >= levelDebug) {
    Log.debug(`${methodName}: Leaving`);
  }
  // #endregion debug
  return parentEl;
};
/**
 * Recursivly creates html with child elements
 * @param parentElement The Element or Extended element to add child elements to
 * @param args an array including tag and attributes to add to elements.
 */
const addElementRecursive = (parentElement: Element, args: IElementCreate[] | undefined): void => {
  if (args && args.length > 0) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < args.length; i++) {
      const el = args[i];
      const childEl = elementCreate(el);
      parentElement.appendChild(childEl);
      if (el.childElements) {
        addElementRecursive(childEl, args[i].childElements);
      }
    }
  }
};
/**
  * Add Html Element passed in as e to the document
  * @param e The Html Element to append to document
  * @param nodeLocation determines what part of the document to append e.
  */
export const elementAppendText = (newText: string, e: HTMLElement): void => {
  if (e.textContent) {
    e.textContent += newText;
  } else {
    e.textContent = newText;
  }
};
