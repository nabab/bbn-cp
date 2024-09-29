import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnHtmlAttr extends bbnAttr
{
  async attrUpdate(init) {
    if (!init) {
      //bbn.fn.log("UPDATE ATTR " + this.name)
    }

    if (!this.node.comment && this.node.element) {
      this.node.element.innerHTML = this.attrGetValue();
    }
  }
}
