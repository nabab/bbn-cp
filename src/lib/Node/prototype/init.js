import bbnNode from "../Node.js";

bbnNode.prototype.nodeInit = function(after) {
  const old = this.element;
  if (this.isCreating) {
    bbn.fn.log(["ALREADY CREATING", this.element, this]);
    //this.creation;
    throw new Error("Already creating");
  }

  if (old && (old.bbnSchema === this)) {
    //this.update();
    if (this.comment && (this.comment === bbn.fn.isComment(old))) {
      return old;
    }

    const isLaunched = this.nodeSwitch(this.comment);
    if (isLaunched) {
      return isLaunched;
    }
  }
  else if (old) {
    bbn.fn.log("ALREADY INITIALIZED");
  }

  /*
  this.creation = new Promise((resolve, reject) => {
    const iv = setInterval(() => {
      if (!this.isCreating) {
        clearInterval(iv);
        resolve();
      }
    }, 5)
  });
  */
  this.isCreating = true;
  this.nodeSetAll();
  if (!this.loop) {
    //if (this.parent.isComponent && !(this.parent instanceof bbnInternalNode)) {}
    this.nodeBuild(after);
    if (this.isComponent && this.element) {
      if (!this.element.bbn) {
        this.element.bbnConnected = true;
      }
      else if (!this.element.$isInit) {
        if (!this.element.isConnected) {
          debugger;
        }

        this.element.$connected();
      }
    }

  // The element could be be removed from above in the meantime
  }

  this.isCreating = false;

  return this.element;
};
