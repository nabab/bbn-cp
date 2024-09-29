import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnContentAttr extends bbnAttr
{
  async attrUpdate() {
    this.node.element.nodeValue = this.getValue();
  }
}
