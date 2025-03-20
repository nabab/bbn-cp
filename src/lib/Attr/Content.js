import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnContentAttr extends bbnAttr
{
  attrUpdate() {
    this.node.element.nodeValue = this.attrGetValue();
  }
}
