import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBreakAttr extends bbnAttr
{
  attrUpdate(init) {
    bbnAttr.prototype.attrUpdate.call(this, init);
    if (this.isChanged && !this.comment) {
      bbn.fn.log("CHANGE IN BREAK");
    }
  }
}