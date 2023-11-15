import bbnCp from "../Cp.js";

/**
 * Checks if the component has a property (or whatever) with the given name
 * @method has
 * @fires bbn.cp.has
 * @param {String} propName
 * @return {Function}
 */
bbnCp.prototype.$has = function(propName){
  return this.$namespaces[propName] !== undefined;
}
