import bbnData from "../Data.js";

/**
 * Reverses the order of the elements of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyReverse = function(target) {
  return (...args) => {
    const res = target.reverse(...args);
    const targetObj = this.getObject(target);
    if (targetObj) {
      targetObj.update();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in reverse", target]);
    }

    return res;
  };
}
