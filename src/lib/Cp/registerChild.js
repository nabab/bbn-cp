import bbnCp from "../Cp.js";

/**
 * Register the given child of the component into the $children array
 */
bbnCp.prototype.$registerChild = function (child) {
  bbn.fn.checkType(child, Object, "The child must be an object");
  this.$children.push(child);
  if (this.onRegisterChild) {
    this.onRegisterChild(child);
  }
}