import bbnNode from "../Node.js";
import deleteNodes from "../../Cp/private/deleteNodes.js";

bbnNode.prototype.nodeInit = async function(after) {
  if (this.isCreating) {
    throw new Error("Already creating");
  }

  const old = this.element;
  if (old && (old.bbnSchema === this)) {
    //await this.update();
    if (this.comment && (this.comment === bbn.fn.isComment(old))) {
      return old;
    }

    const isLaunched = await this.setComment(this.comment);
    if (isLaunched) {
      if (this.comment) {
        deleteNodes(this.component, this.id, this.hash);
      }
      return isLaunched;
    }
  }

  this.isCreating = true;
  await this.nodeSetAll();
  if (!this.loop) {
    await this.nodeBuild(after);
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
