import updateWatcher from "../Cp/private/updateWatcher.js";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnInternalNode extends bbnNode
{
  nodeBuild() {
    this.element = this.component.$el;
    if (!this.comment) {
      for (let i = 0; i < this.attributes.length; i++) {
        this.attributes[i].attrSet();
        this.attributes[i].attrUpdate(true);
      }
    }

    this.nodeConceive();
  }
}
