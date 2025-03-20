import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnStyleAttr extends bbnAttr
{
  attrUpdate(init) {
    if (!this.node.element || this.node.comment) {
      return;
    }
    
    if (init || (this.exp && (this.isChanged || (bbn.fn.numProperties(this.node.styles) > 1)))) {
      const node = this.node instanceof bbnInternalNode && !this.node.component.$isRoot ? this.node.element.bbnSchema : this.node;
      node.styles[this.uid] = this.attrGetValue();
      node.nodeSetStyle();
    }
  }

}