import bbnCp from "../Cp.js";

bbnCp.prototype.$makeReactive = function(obj){
    return obj;
    //const cp = this;
    //return bbn.fn.makeReactive(obj, () => cp.$tick(), cp);
  }