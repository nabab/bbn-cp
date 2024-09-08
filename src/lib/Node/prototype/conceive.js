import bbnNode from "../Node.js";
import generateNode from "../../Cp/private/generateNode.js";
import bbnInternalNode from "../Internal.js";

bbnNode.prototype.conceive = async function() {
  if (this.items && (!this.comment || (!this.loop && (!this.condition || this.condition.value)))) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      let hash = this.hash;
      if (item.loop) {
        hash = this.hash + (this.hash ? '-root' : 'root');
      }

      const ele = this.component.$retrieveElement(item.id, hash);
      const node = ele ? ele.bbnSchema : generateNode(item, this.component, this, hash, this.data);
      if (!ele) {
        await node.init();
      }
      else {
        //bbn.fn.log(["SHOULD UPDATE " + (this instanceof bbnInternalNode ? this.component.$options.name : this.tag), this])
        await node.update();
      }
    }
  }
};
