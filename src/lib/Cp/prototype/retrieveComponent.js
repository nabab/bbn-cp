import bbnCp from "../../Cp.js";

bbnCp.prototype.$retrieveComponent = function (id, hash, index = -1, loopObj) {
  const ele = this.$retrieveElement(...arguments);
  return ele?.bbn || null;
}