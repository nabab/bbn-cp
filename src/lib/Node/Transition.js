import bbn from "@bbn/bbn";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTransitionNode extends bbnNode
{
  async nodeInit(after) {
    if (this.isCreating) {
      throw new Error("Already creating");
    }
    this.isCreating = true;

    if (this.loop) {
      await this.loop.attrSet();
    }
    else {
      const done = await this.setComment(true);
      if (done) {
        this.isCreating = false;
        return done;
      }
    }

    const ele = await this.nodeBuild(after);
    if (!this.loop) {
      await this.nodeConceive();
    }
  
    this.isCreating = false;
    return ele;
  
  }
}