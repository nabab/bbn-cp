import bbnData from "../../Data.js";
import "./retrieve.js";

/**
 * Returns the bbnData object from a value
 * @param {Object} value 
 * @returns {bbnData|null}
 */
bbnData.getObject = function(value) {
  return value?.__bbnData || null;
}
