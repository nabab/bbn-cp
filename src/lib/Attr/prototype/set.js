import bbnAttr from "../Attr.js";

bbnAttr.prototype.attrSet = async function(init) {
  const node = this.node;
  if (node.loop) {
    return;
  }
  if (this.exp && !node.comment) {
    this.attrSetResult();
  }

  if (this.name && !node.comment && (node.props[this.name] !== this.value)) {
    node.props[this.name] = this.value;
  }
}