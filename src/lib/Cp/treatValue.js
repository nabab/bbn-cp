import bbnCp from "../Cp.js";

bbnCp.prototype.$treatValue = function(value, name){
    return bbnData.treatValue(value, this, name);
  }