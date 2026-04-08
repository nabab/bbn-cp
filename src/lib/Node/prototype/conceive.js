import bbnNode from "../Node.js";
import generateNode from "../../Html/private/generateNode.js";
import retrieveNode from "../../Html/private/retrieveNode.js";

bbnNode.prototype.nodeConceive = async function() {
  if (this.items?.length && (!this.comment || (!this.loop && (!this.condition || this.condition.value)))) {

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let hash = this.hash;
      if (item.loop) {
        hash += (hash ? '-' : '') + item.id + '-loop';
      }

      let node = retrieveNode(this.component, item.id, hash);
      if (!node) {
        node = generateNode(item, this.component, this, this.root, this.rootHash, hash, this.data);
      }
      if (!node.element && !node.isCreating) {
        await node.nodeInit();
      }
    }
  }
};
