import bbnCp from "../Cp.js";

bbnCp.prototype.$retrieveElement = function (id, hash) {
  let res = this.$elements[id] || null;
  if (res && hash) {
    return res[hash] || null;
  }

  return res;
}