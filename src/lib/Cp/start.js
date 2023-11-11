import bbnCp from "../Cp.js";

bbnCp.prototype.$start = function () {
  return;
  if (this !== this.$root) {
    return;
  }

  if (this.$interval) {
    throw new Error(bbn._("The component %s is already started", this.$options.name));
  }

  Object.defineProperty(this, '$interval', {
    value: setInterval(
      () => this.$launchQueue(),
      bbn.cp.tickDelay
    ),
    writable: false,
    configurable: true
  });
}