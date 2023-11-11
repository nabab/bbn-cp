import bbnCp from "../Cp.js";

bbnCp.prototype.$stop = function () {
  if (this !== this.$root) {
    return;
  }

  if (!this.$interval) {
    throw new Error(bbn._("The component %s is not started", this.$options.name));
  }

  clearInterval(this.$interval);
  Object.defineProperty(this, '$interval', {
    value: null,
    writable: false,
    configurable: true
  });
}