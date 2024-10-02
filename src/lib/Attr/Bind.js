import bbnAttr from "./Attr.js";
import setProp from "../Cp/private/setProp.js";
import bbnInternalNode from "../Node/Internal.js";
import bbnSlotNode from "../Node/Slot.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBindAttr extends bbnAttr
{
  async attrSet(init) {
    if (this.fn) {
      this.attrGetValue();
    }
  
    for (let n in this.value) {
      if (!this.node.attr[n]) {
        this.node.props[n] = this.value[n];
      }
    }
  }


  async attrUpdate(init) {
    if (init || (this.attrGetState() !== 'OK')) {
      if (!this.value) {
        return;
      }

      bbnAttr.prototype.attrUpdate.apply(this, [init])
      for (let n in this.value) {
        if (!this.node.attr[n]) {
          this.node.props[n] = this.value[n];
          const cp = this.node.element?.bbn;
          if (!(this.node instanceof bbnInternalNode) && cp?.$props && (cp?.$namespaces?.[n] === 'props')) {
            if (cp.$internal.attr?.[n]) {
              cp.$internal.attr[n].attrUpdate(true);
            }

            setProp(cp, n, this.value[n]);
          }
        }
      }

      if (!(this.node instanceof bbnSlotNode)) {
        for (let n in this.node.props) {
          if (!this.node.attr[n] && (this.value[n] === undefined)) {
            delete this.node.props[n];
          }
        }
      }
    }
  }
}
