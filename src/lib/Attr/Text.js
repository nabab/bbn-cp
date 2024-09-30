import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTextAttr extends bbnAttr
{
  async attrUpdate(init) {
    if (!init) {
      this.attrSet();
    }
  
    if (!this.comment && this.node.element) {
      if (this.node.tag) {
        if (this.node.element.innerText !== this.value) {
          this.node.element.innerText = this.value;
        }
      }
      else if (this.node.element.nodeValue !== this.value) {
        this.node.element.nodeValue = this.value;
      }
    }
  }
}
