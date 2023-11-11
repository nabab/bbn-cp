import bbnCp from "../Cp.js";

bbnCp.prototype.$onHook = function(hook){
  if (this.$cfg[hook]?.length) {
    this.$cfg[hook].forEach(fn => fn.bind(this)());
  }
}
