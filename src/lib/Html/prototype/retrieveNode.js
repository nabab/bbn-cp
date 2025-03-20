import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$retrieveNode = function (id, hash) {
  let res = this.$nodes[id] || null;
  if (res && hash) {
    return res[hash];
  }

  return res;
}