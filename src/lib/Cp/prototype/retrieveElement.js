import bbnCp from "../Cp.js";

bbnCp.prototype.$retrieveElement = function (id, hash) {
  let res = this.$nodes[id] || null;
  if (res && hash) {
    return res[hash]?.element || null;
  }

  return res?.element;
}