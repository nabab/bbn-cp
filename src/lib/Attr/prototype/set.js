import bbnAttr from "../Attr.js";
import bbnInternalNode from "../../Node/Internal.js";

bbnAttr.prototype.attrSet = async function(init) {
  if (this.exp && !this.node.comment) {
    this.attrSetResult();
  }

  if (this.name && !this.node.comment && (this.node.props[this.name] !== this.value)) {
    this.node.props[this.name] = this.value;
  }

}