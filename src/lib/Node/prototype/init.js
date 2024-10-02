import bbnNode from "../Node.js";

const deleteNodes = (cp, id, hash) => {
  for (let idx in cp.$nodes) {
    if (!idx.indexOf(id + '-')) {
      const obj = cp.$nodes[idx];
      if (hash) {
        for (let n in obj) {
          if ((n === hash) || !n.indexOf(hash + '-')) {
            delete obj[n];
          }
        }
      }
      else {
        delete cp.$nodes[idx];
      }
    }
  }
};

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
      if (this.comment) {
        deleteNodes(this.component, this.id, this.hash);
      }
      return isLaunched;
    }
  }

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
