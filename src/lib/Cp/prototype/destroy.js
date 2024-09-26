import bbnCp from "../Cp.js";
import removeDOM from "../private/removeDOM.js";

bbnCp.prototype.$destroy = function(){
  bbn.fn.warning("ON DESTROY REMOVE");
  removeDOM(this.$root, this.$el);
}
