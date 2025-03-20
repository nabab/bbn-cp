import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$retrieveComponent = function (id, hash, index = -1, loopObj) {
  const ele = this.$retrieveElement(...arguments);
  return ele?.bbn || null;
}