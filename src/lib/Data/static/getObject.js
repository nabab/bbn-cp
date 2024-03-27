import bbnData from "../Data.js";
import "./retrieve.js";

/**
 * Returns the bbnData object from a value
 * @param {Object} value 
 * @returns {bbnData|null}
 */
bbnData.getObject = function(value) {
  if (value && (typeof value === 'object') && value.__bbnData) {
    return this.retrieve(value.__bbnData);
  }

  return null;
}
