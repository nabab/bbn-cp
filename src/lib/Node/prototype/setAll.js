import bbnNode from "../Node.js";

bbnNode.prototype.nodeSetAll = function() {
  if (!this.loop && this.vars) {
    this.vars.attrSetResult();
  }

  for (let i = 0; i < this.attributes.length; i++) {
    if (!this.loop) {
      if (['bbnConditionAttr', 'bbnVarsAttr'].includes(this.attributes[i].constructor?.name)) {
        this.attributes[i].attrSet(true);
      }
      else if (this.comment) {
        break;
      }
      else if ('bbnVarsAttr' !== this.attributes[i].constructor?.name) {
        this.attributes[i].attrSet(true);
      }
    }
    else if (['bbnVarsAttr', 'bbnConditionAttr', 'bbnLoopAttr'].includes(this.attributes[i].constructor?.name)) {
      this.attributes[i].attrSet(true);
    }
    else if (this.comment) {
      break;
    }
  }
}