import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTextAttr extends bbnAttr
{
  async update(init) {
    if (!init) {
      this.set();
    }
  
    if (!this.comment && this.node.element) {
      if (this.node.tag) {
        this.node.element.innerText = this.value;
      }
      else {
        this.node.element.nodeValue = this.value;
      }
    }
  }
}
