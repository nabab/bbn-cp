import bbnCp from "../Cp.js";

bbnCp.prototype.$once = function(event, handler){
    this.$off(event, handler);
    this.$on(event, handler, true);
  }