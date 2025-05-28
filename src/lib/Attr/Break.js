import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBreakAttr extends bbnAttr
{
  attrUpdate(init) {
    bbnAttr.prototype.attrUpdate.call(this, init);
    if (this.isChanged && this.node.loopNode && !this.node.loopNode.isRunning) {
      this.node.loopNode.attrUpdate();
      bbn.fn.log("CHANGE IN BREAK");
    }
  }
}