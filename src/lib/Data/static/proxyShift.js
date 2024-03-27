import bbnData from "../Data.js";

/**
 * Shifts the first element of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyShift = function(target) {
  return () => {
    // The bbnData object of the target array
    const targetObj = this.getObject(target);
    if (target.length) {
      const subObj = this.getObject(target[0]);
      if (subObj) {
        subObj.unset();
      }
    }
    const res = target.shift();
    if (targetObj) {
      //bbn.fn.log("SHIFT");
      targetObj.update();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in shift", target]);
    }

    return res;
  };
}
