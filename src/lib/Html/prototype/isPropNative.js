import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$isPropNative = function(name) {
  const proto = Object.getPrototypeOf(this.constructor.prototype);
  return name in proto;
};

