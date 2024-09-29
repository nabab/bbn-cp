import bbnCp from "../Cp.js";

bbnCp.prototype.$retrieveNode = function (id, hash) {
  let res = this.$nodes[id] || null;
  if (res && hash) {
    return res[hash];
  }

  return res;
}