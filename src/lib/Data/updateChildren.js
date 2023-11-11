
import bbnData from "../Data.js";

bbnData.prototype.updateChildren = function() {
  if (this.children.length) {
    bbn.fn.each(this.children, obj => {
      obj.update(true);
    });
  }
}
