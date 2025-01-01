import bbnCp from "../../Cp.js";

bbnCp.prototype.$treatValue = function(value, name, parent) {
    return bbnData.treatValue(value, this, name, parent);
  }