import bbnNode from "../Node.js";
import generateNode from "../../Html/private/generateNode.js";
import bbnInternalNode from "../Internal.js";

bbnNode.prototype.nodeConceive = function() {
  if (this.items && (!this.comment || (!this.loop && (!this.condition || this.condition.value)))) {

    const directives = [];
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let hash = this.hash;
      if (item.loop) {
        hash = this.hash + (this.hash ? '-root' : 'root');
      }

      const node = this.component.$retrieveNode(item.id, hash) || generateNode(item, this.component, this, this.root, this.rootHash, hash, this.data);
      const ele = node.element;
      if (!ele && !node.isCreating) {
        node.nodeInit();
      }
    }

    for (let i = 0; i < directives.length; i++) {
      directives[i]();
    }
  }
};
