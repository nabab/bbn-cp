import bbnCp from "../Cp.js";

bbnCp.prototype.$retrieveLoopObject = function(id, hash, index = -1){
    return retrieve(id, hash, index, true);
  }