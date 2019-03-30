export interface IKeyAny {
  [key: string]: any;
}

/**
 * Provides a mechanism for releasing resources.
 *  @see {@link  https://gist.github.com/dsherret/cf5d6bec3d0f791cef00 }
 **/
export interface IDisposable {
  dispose(): void;
}
/**
 * Represents a generic item with a string key value
 * @example
 ```ts
const lst: IKeyValueGeneric<string> = {
    src: 'https://someUrl.come/js/myjs.js',
    scrolling: 'yes',
    type: 'text/javascript'
};
for (const key in lst) {
    if (lst.hasOwnProperty(key)) {
    const value = lst[key];
    console.log(key, value);
    }
}
console.log('src: ', lst['src']);
console.log('type: ', lst.type);
 ```
 */
export interface IKeyValueGeneric<T> {
  [key: string]: T;
}

/**
 * Represents a generic item with a numeric key value
 * @example
```ts
interface IIndexValueGeneric<T> {
  [index: number]: T;
}
const lst: IIndexValueGeneric<string> = {
    1: 'https://someUrl.come/js/myjs.js',
    7: 'yes',
    3: 'text/javascript'
};
for (const key in lst) {
    if (lst.hasOwnProperty(key)) {
    const value = lst[key];
    console.log(key, value);
    }
}
console.log(lst[7]);
```
 */
export interface IIndexValueGeneric<T> {
  [index: number]: T;
}

/**
 * Elements creation arguments
 * @param tag (required) The tag of the element such as div, script, style
 * @param text (optional) The text to add to the element content.
 * @param html (optional) The html to add to the element content.
 * @param attribs (optional) Array of Attributes and values to add to the element.
 * @param children (optional) child elements to add to the current element.
 */
export interface IElementCreate {
  /**
   * The tag of the element such as div, script, style
   */
  tag: string;
  /**
   * text only to add to the element content.
   */
  text?: string;
  /**
   * html to add to the element content.
   */
  html?: string;
  /**
   * Any extra attributes to apply to element such as scrolling
   */
  attribs?: IKeyValueGeneric<string>;
  children?: IElementCreate[];
}
/**
 * Elements creation arguments
 * @param elementTag (required) The tag of the element such as div, script, style
 * @param elementText (optional) The text/html to add to the element content.
 * @param elementAttributes (optional) Array of Attributes and values to add to the element.
 * @param childElements {IElementsCreate;} (optional) Child Elements to create of the parent.
 */
export interface IElementsCreate extends IElementCreate {
  /**
   * Child Elements to create of the parent.
   */
  children?: IElementCreate[];
}
