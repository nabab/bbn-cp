import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.items = function(node) {
  if (node.items?.length) {
    if ($_items[node.id]) {
      x.msp();
      $_par.push($_items[node.id]);
      nodesToFunction(cp, node.items, hashName);
      $_par.pop();
      x.lsp();
    }
  }
};
