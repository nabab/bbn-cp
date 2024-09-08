import bbnAttr from "../Attr.js";
import bbnInternalNode from "../../Node/Internal.js";

bbnAttr.prototype.set = async function(init) {
  if (this.exp && !this.node.comment) {
    this.setResult();
  }

  if (this.name && !this.node.comment && (this.node.props[this.name] !== this.value)) {
    this.node.props[this.name] = this.value;
  }

}