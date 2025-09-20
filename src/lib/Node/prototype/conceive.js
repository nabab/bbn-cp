import bbnNode from "../Node.js";
import generateNode from "../../Html/private/generateNode.js";

bbnNode.prototype.nodeConceive = function() {
  if (this.items?.length && (!this.comment || (!this.loop && (!this.condition || this.condition.value)))) {
    let element;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let hash = this.hash;
      if (item.loop) {
        hash += (hash ? '-' : '') + item.id + '-loop';
      }

      let node = this.component.$retrieveNode(item.id, hash);
      if (!node) {
        node = generateNode(item, this.component, this, this.root, this.rootHash, hash, this.data);
      }
      if (!node.element && !node.isCreating) {
        node.nodeInit();
      }
      else {
        bbn.fn.log(["is creating", node.element, node.isCreating]);
      }
    }
  }
};
