import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnPreAttr extends bbnAttr
{
  attrSet() {
  }

  attrUpdate() {
  }

  attrSetResult() {
    return this.value;
  }

  get value() {
    return this.node.template?.pre?.content;
  }
}