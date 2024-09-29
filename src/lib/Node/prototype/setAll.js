import bbnNode from "../Node.js";
import bbnConditionAttr from "../../Attr/Condition.js";
import bbnLoopAttr from "../../Attr/Loop.js";

bbnNode.prototype.nodeSetAll = async function() {
  for (let i = 0; i < this.attributes.length; i++) {
    if (!this.loop || (this.attributes[i] instanceof bbnConditionAttr) || (this.attributes[i] instanceof bbnLoopAttr)) {
      await this.attributes[i].set(true);
      if (this.comment) {
        break;
      }
    }
  }

}