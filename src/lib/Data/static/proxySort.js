import bbnData from "../Data.js";

/**
 * Sorts the elements of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxySort = function(targetObj, target) {
  return (...args) => {
    const before = JSON.stringify(target);
    const res = target.sort(...args);
    const after = JSON.stringify(target);
    if (targetObj) {
      if (before !== after) {
        bbn.fn.warning("SORT");
        targetObj.prepareUpdate();
      }
    }
    else {
      bbn.fn.log(["Impossible to find the data object in sort", target]);
    }

    return res;
  };
}
