import bbnCp from "../../Cp.js";

bbnCp.prototype.$destroy = function() {
  this.$el.remove();
}
