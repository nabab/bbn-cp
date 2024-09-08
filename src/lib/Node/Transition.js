import bbn from "@bbn/bbn";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTransitionNode extends bbnNode
{
  async init(after) {
    if (this.loop) {
      await this.loop.set();
    }
    else {
      await this.setComment(true);
    }

    const ele = await this.build(after);
    if (!this.loop) {
      await this.conceive();
    }
  
    return ele;
  
  }
}