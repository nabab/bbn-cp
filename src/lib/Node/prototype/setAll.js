import bbnNode from "../Node.js";

bbnNode.prototype.nodeSetAll = function() {
  for (let i = 0; i < this.attributes.length; i++) {
    if (!this.loop || ['bbnConditionAttr', 'bbnLoopAttr'].includes(this.attributes[i].constructor?.name)) {
      this.attributes[i].attrSet(true);
      if (this.comment) {
        break;
      }
    }
  }
}