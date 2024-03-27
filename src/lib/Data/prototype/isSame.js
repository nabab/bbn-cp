import bbnData from "../Data.js";

bbnData.prototype.isSame = function(obj) {
  if (obj?.__bbnProxy) {
    return bbn.fn.isSame(obj, this.value);
  }
  else if (obj?.__bbnData) {
    return bbn.fn.isSame(obj, this.data);
  }

  return false;
}
