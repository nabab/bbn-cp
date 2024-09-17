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
    else {
      this.setResult();
    }
  
    if (!this.comment && this.node.element) {
      if (this.node.tag) {
        if (this.node.element.innerText !== this.value) {
          this.node.element.innerText = this.value;
        }
      }
      else if (this.node.element.innerText !== this.value) {
        this.node.element.innerText = this.value;
      }
    }
  }
}
