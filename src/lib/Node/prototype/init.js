import bbnNode from "../Node.js";

bbnNode.prototype.init = async function(after) {
  const old = this.element;
  if (old && (old.bbnSchema === this) && (old.bbnSchema.comment === bbn.fn.isComment(old))) {
    bbn.fn.warning("Already initialized " + this.tag);
    await this.update(true);
    return old;
  }

  await this.setAll();
  const ele = await this.build(after);
  if (!this.loop) {
    await this.conceive();
  }

  if (this.isComponent) {
    if (!ele.bbn) {
      ele.bbnConnected = true;
    }
    else if (!Object.hasOwn(ele.bbn, '$isCreated')){
      ele.bbn.$connected();
    }
  }

  return ele;
};
