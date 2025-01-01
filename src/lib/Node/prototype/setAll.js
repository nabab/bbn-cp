import bbnNode from "../../Node.js";
import bbnConditionAttr from "../../Attr/Condition.js";
import bbnLoopAttr from "../../Attr/Loop.js";

bbnNode.prototype.nodeSetAll = function() {
  for (let i = 0; i < this.attributes.length; i++) {
    if (!this.loop || (this.attributes[i] instanceof bbnConditionAttr) || (this.attributes[i] instanceof bbnLoopAttr)) {
      this.attributes[i].attrSet(true);
      if (this.comment) {
        break;
      }
    }
  }

}