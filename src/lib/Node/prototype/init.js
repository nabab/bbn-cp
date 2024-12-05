import bbnNode from "../Node.js";
import deleteNodes from "../../Cp/private/deleteNodes.js";

bbnNode.prototype.nodeInit = function(after) {
  const old = this.element;
  if (this.isCreating) {
    if (old) {
      bbn.fn.log("ALREADY CREATING");
      return old;
    }

    throw new Error("Already creating");
  }

  if (old && (old.bbnSchema === this)) {
    //await this.update();
    if (this.comment && (this.comment === bbn.fn.isComment(old))) {
      return old;
    }

    if (this.comment && this.numBuild && !(old instanceof Comment)) {
      deleteNodes(this.component, this.id, this.hash);
    }

    const isLaunched = this.setComment(this.comment);
    if (isLaunched) {
      return isLaunched;
    }
  }
  else if (old) {
    bbn.fn.log("ALREADY INITIALIZED");
  }

  this.isCreating = true;
  this.nodeSetAll();
  if (!this.loop) {
    this.nodeBuild(after);
    this.nodeConceive();
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
