import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$treatValue = function(value, name, parent) {
    return bbnData.treatValue(value, this, name, parent);
  }