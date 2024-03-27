import bbnCp from "../Cp.js";

/**
 * Deletes the given property from the given object using static method
 * @param {*} obj 
 * @param {*} prop 
 * @returns 
 */
bbnCp.prototype.$delete = function (obj, prop) {
  return delete obj[prop];
}