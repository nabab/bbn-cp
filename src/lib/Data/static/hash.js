import bbnData from "../../Data.js";

/**
 * Makes a string out of anything
 * @param {*} value
 * @param {Function} fn
 * @param {Number} [depth=null]
 * @param {Number} [level=0]
 * @param {WeakSet} [visited=null]
 * @returns {String}
 */

function treatForHash(value, depth = null, level = 0, visited = null) {
  if (!level && !visited) {
    visited = new WeakSet();
  }

  if (value?.__bbnData) {
    const data = value.__bbnData;
    if (data) {
      value = "__BBN_DATA__" + data.uid;
    }
  }
  else {
    value = bbn.fn.treatForHash(value, depth, level, visited, treatForHash);
  }

  return value;
}


/**
 * Returns a unique identifier from any type of value (hashes only simple objects and arrays)
 * 
 * @param {*} value Value to hash
 * @returns {String} The hash
 */
bbnData.hash = function(value) {
  const wasStarted = bbnData.watchStarted;
  if (wasStarted) {
    bbnData.watchStarted = false;
  }

  let st = treatForHash(value);
  if (wasStarted) {
    bbnData.watchStarted = true;
  }

  return bbn.fn.simpleHash(st);
}
