import bbnAttr from "./Attr.js";
import bbnInternalNode from "../Node/Internal.js";
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
      const node = (this.node.constructor.name === 'bbnInternalNode') && !this.node.component.$isRoot ? this.node.element.bbnNode : this.node;
      node.styles[this.uid] = this.attrGetValue();
      node.nodeSetStyle();
    }
  }

}