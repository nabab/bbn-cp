import bbnProtoHtml from "../../Html/Proto.js";
import setProp from "../private/setProp.js";
import setUpData from "../private/setUpData.js";

/**
 * Sets the given property on the given object using static method
 * @param {Object} obj 
 * @param {String} prop 
 * @param {*} value 
 * @param {Boolean} writable 
 * @param {Boolean} configurable 
 * @returns 
 */
bbnProtoHtml.$delete = function (obj, prop) {
  delete obj[prop];
}