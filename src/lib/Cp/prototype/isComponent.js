import bbnCp from "../../Cp.js";

bbnCp.prototype.$isComponent = function (node) {
  if (node.tag && this.$cfg.componentNames[node.tag]) {
    return true;
  }

  return bbn.cp.isComponent(node);
}