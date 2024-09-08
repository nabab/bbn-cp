import bbnAttr from "../Attr.js";

bbnAttr.prototype.getValue = function() {
  if (!this.exp) {
    return this.value;
  }

  const r = this.node.component.$expResults;
  const hash = this.node.hash || '_root';

  if (this.isLate) {
    this.setResult();
  }

  return r[this.id][hash].value;
};
