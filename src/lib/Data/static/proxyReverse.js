import bbnData from "../../Data.js";

/**
 * Reverses the order of the elements of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyReverse = function(targetObj, target, component) {
  return (...args) => {
    const res = target.reverse(...args);
    if (targetObj) {
      targetObj.fixIndexes(component);
      targetObj.prepareUpdate();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in reverse", target]);
    }

    return res;
  };
}
