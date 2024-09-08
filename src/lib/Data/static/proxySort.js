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
    const res = target.sort(...args);
    if (targetObj) {
      bbn.fn.warning("SORT");
      targetObj.prepareUpdate();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in sort", target]);
    }

    return res;
  };
}
