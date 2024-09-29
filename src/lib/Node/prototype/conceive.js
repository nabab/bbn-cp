import bbnNode from "../Node.js";
import generateNode from "../../Cp/private/generateNode.js";
import bbnInternalNode from "../Internal.js";

bbnNode.prototype.nodeConceive = async function() {
  if (this.items && (!this.comment || (!this.loop && (!this.condition || this.condition.value)))) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let hash = this.hash;
      if (item.loop) {
        hash = this.hash + (this.hash ? '-root' : 'root');
      }

      const node = this.component.$retrieveNode(item.id, hash) || generateNode(item, this.component, this, hash, this.data);
      const ele = node.element;
      if (!ele) {
        await node.nodeInit();
      }
      else {
        //bbn.fn.log("UPDATE " + node.id + ' ' + node.tag)
        //bbn.fn.log(["SHOULD UPDATE " + (this instanceof bbnInternalNode ? this.component.$options.name : this.tag), this])
        //await node.nodeUpdate();
      }
    }
  }
};
