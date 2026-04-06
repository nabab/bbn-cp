import initResults from "../Html/private/initResults.js";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnInternalNode extends bbnNode
{
  get _region() {
    return this.component?.bbnNode?._region || {};
  }

  async nodeInit(after) {
    return await bbnNode.prototype.nodeInit.call(this, [after]);
  }
  async nodeBuild() {
    this.element = this.component.$el;
    this.isBuilding = true;
    if (!this.comment) {
      for (let i = 0; i < this.attributes.length; i++) {
        await this.attributes[i].attrSet();
        await this.attributes[i].attrUpdate(true);
      }
    }

    await this.nodeConceive();
    this.isBuilding = false;
    this.numBuild++;
  }
}
