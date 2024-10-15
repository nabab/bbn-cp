import bbnData from "../Data.js";

/**
 * Gets the value stored in the bbnData object
 * @param {bbnData} obj 
 * @param {Boolean} original if true returns the original value, no the proxy
 * @returns {Object} The reactive value or the original value
 */
bbnData.getValue = function(obj, original) {
  if (obj && (typeof obj === 'object') && (obj instanceof bbnData)) {
    return obj[original ? 'targetData' : 'value'];
  }

  throw Error(bbn._("The argument is not a bbnData object"))

  return obj;
}
