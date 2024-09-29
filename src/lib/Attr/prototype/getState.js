import bbnAttr from "../Attr.js";

bbnAttr.prototype.attrGetState = function() {
  if (!this.exp) {
    return 'OK';
  }

  const r = this.node.component.$expResults;
  const hash = this.node.hash || '_root';
  if (this.exp && this.isLate) {
    this.attrSetResult();
  }

  return r[this.id][hash].state;
};
