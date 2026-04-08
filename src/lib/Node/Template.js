import bbnNode from "./Node.js";
/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTemplateNode extends bbnNode
{
  async nodeInit(after) {
    if (this.isCreating) {
      throw new Error("Already creating");
    }

    let ele = this.element;
    if (this.loop) {
      return await this.loop.attrSet(true);
    }
    else {
      this.isCreating = true;
      await this.nodeSetAll();
      //bbn.fn.log(["INIT TEMPLATE " + this.id, this.comment, this.isCommented, ele, bbn.fn.isComment(ele)]);
      if (!ele || (this.comment !== bbn.fn.isComment(ele))) {
        ele = await this.nodeBuild(after, true);
      }
      
      if (!this.pre && (!this.condition || this.condition.value) && (!this.parent?.condition || this.parent.condition.value)) {
        await this.nodeConceive();
      }
      else if (this.condition && !this.condition.value && !this.isCommented) {
        this.nodeClean();
      }

      this.isCreating = false;
    }

    return ele;
  }
}
