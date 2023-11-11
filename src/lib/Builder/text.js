import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.text = function(node, hashName) {
  if (node.text) {
    $_sr(node.hash, `${bbn.fn.escapeTicks(node.text)}`, hashName);
    if ($_go || ($_gs(node.hash, hashName) !== "OK")) {
      if ($_items[node.id] && ($_items[node.id].textContent !== $_gv(node.hash, hashName))) {
        $_items[node.id].textContent = $_gv(node.hash, hashName);
      }
      else {
        $_items[node.id] = $_this.$createText({
          id: node.id,
          hash: node.hash,
          text: $_gv(node.hash, hashName),
          loopHash: hashName,
        }, $_par.at(-1));
        if ($_par.at(-1) === $_this.$el) {
          $_final.push({ ele: $_items[node.id], position: $_num['-'] - 1 });
        }
      }
    }
    if ($_par.at(-1) === $_this.$el) {
      $_num['-']++;
    }
    if (!$_num[$_par.at(-1).bbnId]) {
      $_num[$_par.at(-1).bbnId] = 0;
    }
    $_num[$_par.at(-1).bbnId]++;
  }
};
