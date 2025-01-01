import bbnAttr from "../Attr.js";
import bbnInternalNode from "../Node/Internal.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnClassAttr extends bbnAttr
{
  attrUpdate(init) {
    if (!this.node.element || this.node.comment) {
      return;
    }

    if (init || (this.exp && this.isChanged)) {
      const node = this.node instanceof bbnInternalNode && !this.node.component.$isRoot ? this.node.element.bbnSchema : this.node;
      node.classes[this.uid] = this.attrGetValue();
      node.nodeSetClass();
    }
  }
}