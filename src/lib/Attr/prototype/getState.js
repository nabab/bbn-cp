import bbnAttr from "../Attr.js";

bbnAttr.prototype.getState = function() {
  if (!this.exp) {
    return 'OK';
  }

  const r = this.node.component.$expResults;
  const hash = this.node.hash || '_root';
  if (this.exp && this.isLate) {
    this.setResult();
  }

  return r[this.id][hash].state;
};
