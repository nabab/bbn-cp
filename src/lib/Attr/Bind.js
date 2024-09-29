import bbnAttr from "./Attr.js";
import setProp from "../Cp/private/setProp.js";
import bbnInternalNode from "../Node/Internal.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBindAttr extends bbnAttr
{
  async set(init) {
    if (this.fn) {
      this.getValue();
    }
  
    for (let n in this.value) {
      if (!this.node.attr[n]) {
        this.node.props[n] = this.value[n];
      }
    }
  }


  async attrUpdate(init) {
    if (init || (this.getState() !== 'OK')) {
      if (!this.value) {
        return;
      }

      bbnAttr.prototype.attrUpdate.apply(this, [init])
      for (let n in this.value) {
        if (!this.node.attr[n] || (this.node.attr[n] === undefined)) {
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
    }
  }
}
