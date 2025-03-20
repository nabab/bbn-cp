import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$isComponent = function (node) {
  if (node.tag && this.$cfg.componentNames[node.tag]) {
    return true;
  }

  return bbn.cp.isComponent(node);
}