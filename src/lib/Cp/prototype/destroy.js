import bbnCp from "../Cp.js";
import removeDOM from "../private/removeDOM.js";

bbnCp.prototype.$destroy = function(){
  removeDOM(this.$root, this.$el);
}
