import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnHtmlAttr extends bbnAttr
{
  attrUpdate(init) {
    if (!init) {
      //bbn.fn.log("UPDATE ATTR " + this.name)
    }

    if (!this.node.comment && this.node.element) {
      this.node.element.innerHTML = this.attrGetValue();
    }
  }
}
