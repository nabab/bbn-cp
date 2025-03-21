import bbnNode from "../Node.js";
import generateNode from "../../Html/private/generateNode.js";

bbnNode.prototype.nodeConceive = function() {
  if (this.items?.length && (!this.comment || (!this.loop && (!this.condition || this.condition.value)))) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let hash = this.hash;
      if (item.loop) {
        hash += (hash ? '-' : '') + item.id + '-loop';
      }

      const node = this.component.$retrieveNode(item.id, hash) || generateNode(item, this.component, this, this.root, this.rootHash, hash, this.data);
      const ele = node.element;
      if (!ele && !node.isCreating) {
        node.nodeInit();
      }
    }
  }
};
