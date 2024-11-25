import initResults from "../Cp/private/initResults.js";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnInternalNode extends bbnNode
{
  nodeInit(after) {
    const ele = bbnNode.prototype.nodeInit.call(this, [after]);
    this.component.$numBuild = 1;
    return ele;
  }
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
