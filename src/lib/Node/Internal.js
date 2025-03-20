import initResults from "../Html/private/initResults.js";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnInternalNode extends bbnNode
{
  nodeInit(after) {
    return bbnNode.prototype.nodeInit.call(this, [after]);
  }
  nodeBuild() {
    this.element = this.component.$el;
    this.isBuilding = true;
    if (!this.comment) {
      for (let i = 0; i < this.attributes.length; i++) {
        this.attributes[i].attrSet();
        this.attributes[i].attrUpdate(true);
      }
    }

    this.nodeConceive();
    this.isBuilding = false;
    this.numBuild++;
  }
}
