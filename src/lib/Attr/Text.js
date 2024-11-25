import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTextAttr extends bbnAttr
{
  attrUpdate(init) {
    if (!init) {
      this.attrSet();
    }
  
    const node = this.node;
    if (!this.comment && node.element) {
      if (node.tag) {
        if (node.element.innerText !== this.value) {
          node.element.innerText = this.value;
        }
      }
      else if (node.element.nodeValue !== this.value) {
        node.element.nodeValue = this.value;
      }
    }
  }
}
