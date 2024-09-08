import bbn from "@bbn/bbn";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTemplateNode extends bbnNode
{
  async init(after) {
    let ele = this.element;
    if (this.loop) {
      return await this.loop.set(true);
    }
    else {
      this.setAll();
      if (!ele || (this.comment !== bbn.fn.isComment(ele))) {
        ele = await this.build(after);
      }
      
      if (!this.pre && (!this.condition || this.condition.value) && (!this.parent?.condition || this.parent.condition.value)) {
        await this.conceive();
      }
    }

    return ele;
  }
}
