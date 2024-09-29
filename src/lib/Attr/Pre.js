import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnPreAttr extends bbnAttr
{
  async attrSet() {
  }

  async attrUpdate() {
  }

  attrSetResult() {
    return this.value;
  }

  get value() {
    return this.node.template?.pre?.content;
  }
}