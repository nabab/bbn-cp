import bbnCp from "../Cp.js";

bbnCp.prototype.$destroy = function(){
    this.$root.$removeDOM(this.$el);
  }