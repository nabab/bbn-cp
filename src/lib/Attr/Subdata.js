import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnSubdataAttr extends bbnAttr
{
  attrUpdate(init) {
    const res = bbnAttr.prototype.attrUpdate.call(this, [init]);
    if (this.isChanged) {
      bbn.fn.log("DATA IS CHANGED", this.attrGetValue());
      if (!init) {
        this.node.nodeSetAll();
      }
    }

    return res;
  }
};
