import bbnNode from "../Node.js";

bbnNode.prototype.nodeDisplay = async function(show, spareChildren, includeRoot, replacer) {
  for (let i = 0; i < this.attributes.length; i++) {
    if (!this.loop || (this.attributes[i].constructor?.name === 'bbnConditionAttr') || (this.attributes[i].constructor?.name === 'bbnLoopAttr')) {
      this.attributes[i].attrSet(true);
      if (this.comment) {
        break;
      }
    }
  }

}