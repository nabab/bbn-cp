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

      if (item.id === "0-1-0-0-0") {
        bbn.fn.log("CONCEIVE " + item.id + ' ' + item.tag)
        //bbn.fn.log(["SHOULD CONCEIVE " + (this instanceof bbnInternalNode ? this.component.$options.name : this.tag), this])
      }
      const node = this.component.$retrieveNode(item.id, hash) || generateNode(item, this.component, this, hash, this.data);
      const ele = node.element;
      if (!ele && !node.isCreating) {
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
