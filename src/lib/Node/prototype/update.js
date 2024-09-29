import bbnNode from "../Node.js";

bbnNode.prototype.nodeUpdate = async function() {
  return;
  if (!this.comment) {
    for (let i = 0; i < this.attributes.length; i++) {
      await this.attributes[i].attrUpdate(false);
      if (this.comment) {
        break;
      }
    }
  }
  /*
  debugger;
  bbn.fn.log("UPDATE ABORTED");
  return;
  applyPropsOnElement(this.component, this, this.element);
  bbn.fn.log(["INSIDE UPDATE", this.parentElement, this.idParent, this.parent])
  if (this.pre) {
    if (this.element) {
      if (this.element.innerHTML !== this.pre) {
        this.element.innerHTML = this.pre;
      }
    }
  }
  else if (this.component.$currentMap[this.id].items?.length) {
    bbn.fn.log("INSODE TREAT TIEMSSS")
    await treatItems(this.component, this.component.$currentMap[this.id].items, this.hash, forgotten ? parent : this.element, forgotten ? hashList : null);
  }
  */
};
