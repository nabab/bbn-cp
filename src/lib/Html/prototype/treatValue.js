import bbnProtoHtml from "../../Html/Proto.js";
import bbnData from "../../Data.js";
bbnProtoHtml.$treatValue = function(value, name, parent) {
    return bbnData.treatValue(value, this, name, parent);
  }