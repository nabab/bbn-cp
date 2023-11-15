import bbnCp from "../Cp.js";

/**
 * Checks if the component corresponds to the selector
 * @method is
 * @fires bbn.cp.is
 * @param {String} selector 
 * @return {Function}
 */
bbnCp.prototype.$is = function (selector) {
  return this.$el.matches(selector);
}