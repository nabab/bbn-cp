import bbn from "@bbn/bbn";
import bbnNode from "../Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTransitionNode extends bbnNode
{
  nodeInit(after) {
    if (this.isCreating) {
      throw new Error("Already creating");
    }
    this.isCreating = true;

    if (this.loop) {
      this.loop.attrSet();
    }
    else {
      const done = this.setComment(true);
      if (done) {
        this.isCreating = false;
        return done;
      }
    }

    const ele = this.nodeBuild(after);
    if (!this.loop) {
      this.nodeConceive();
    }
  
    this.isCreating = false;
    return ele;
  
  }
}