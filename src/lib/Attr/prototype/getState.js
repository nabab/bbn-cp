import bbnAttr from "../Attr.js";

bbnAttr.prototype.attrGetState = function() {
  if (!this.exp) {
    return 'OK';
  }

  if (this.exp && this.isLate) {
    this.attrSetResult();
  }

  return this.result.state;
};
