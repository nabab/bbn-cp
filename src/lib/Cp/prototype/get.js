import bbnCp from "../../Cp.js";

/**
 * Gets the given property from the given object using static method
 * @param {*} obj 
 * @param {*} prop 
 * @returns 
 */
bbnCp.prototype.$get = function (obj, prop) {
  return obj[prop];
}