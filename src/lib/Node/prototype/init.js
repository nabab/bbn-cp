import bbnNode from "../Node.js";

bbnNode.prototype.nodeInit = async function(after) {
  if (this.isCreating) {
    throw new Error("Already creating");
  }
  this.isCreating = true;
  const old = this.element;
  if (old && (old.bbnSchema === this)) {
    //await this.update();
    if (this.comment && (this.comment === bbn.fn.isComment(old))) {
      return old;
    }

    const isLaunched = await this.setComment(this.comment);
    if (isLaunched) {
      return isLaunched;
    }
  }

  await this.nodeSetAll();
  if (!this.loop) {
    await this.nodeBuild(after);
  }
  if (!this.loop) {
    await this.nodeConceive();
  }

  if (this.isComponent) {
    if (!this.element.bbn) {
      this.element.bbnConnected = true;
    }
    else if (!Object.hasOwn(this.element.bbn, '$isCreated')){
      this.element.bbn.$connected();
    }
  }
  this.isCreating = false;

  return this.element;
};
