import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Gets the given property from the given object using static method
 * @param {*} obj 
 * @param {*} prop 
 * @returns 
 */
bbnProtoHtml.$get = function (obj, prop) {
  return obj[prop];
}