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
  
    for (let n in this.result.value) {
      if (!this.node.attr[n]) {
        this.node.props[n] = this.result.value[n];
      }
    }
  }


  async attrUpdate(init) {
    if (init || (this.attrGetState() !== 'OK')) {
      //bbn.fn.log("CHANGE ON BIND")
      await bbnAttr.prototype.attrUpdate.apply(this, [init]);
      const proms = [];
      if (this.result.value) {
        for (let n in this.result.value) {
          if (!this.node.attr[n]) {
            this.node.props[n] = this.result.value[n];
            const cp = this.node.element?.bbn;
            if (!(this.node instanceof bbnInternalNode) && cp?.$props && (cp?.$namespaces?.[n] === 'props')) {
              if (cp.$internal.attr?.[n]) {
                proms.push(cp.$internal.attr[n].attrUpdate(true));
              }

              setProp(cp, n, this.result.value[n]);
            }
          }
        }
      }

      await Promise.all(proms);

      if (!(this.node instanceof bbnSlotNode)) {
        for (let n in this.node.props) {
          if (!this.node.attr[n] && (this.result.value?.[n] === undefined)) {
            delete this.node.props[n];
          }
        }
      }
    }
  }
}
