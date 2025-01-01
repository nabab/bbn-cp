import bbnAttr from "../../Attr.js";

bbnAttr.prototype.attrGetValue = function() {
  if (!this.exp) {
    return this.value;
  }

  if (this.isLate) {
    this.attrSetResult();
  }

  return this.result.value;
};
