import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnContentAttr extends bbnAttr
{
  async update() {
    this.node.element.nodeValue = this.getValue();
  }
}
