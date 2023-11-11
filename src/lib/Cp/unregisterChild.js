import bbnCp from "../Cp.js";

/**
 * Unregister the given child of the component from the $children array
 */
bbnCp.prototype.$unregisterChild = function (child) {
  let idx = this.$children.indexOf(child);
  if (idx > -1) {
    this.$children.splice(idx, 1);
  }
}