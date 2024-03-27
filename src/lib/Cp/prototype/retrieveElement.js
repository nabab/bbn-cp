import bbnCp from "../Cp.js";

bbnCp.prototype.$retrieveElement = function (id, hash, index = -1, loopObj) {
  let res = this.$elements[id] || null;
  if (res && hash) {
    return res[hash] || null;
  }

  return res;
}