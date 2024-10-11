import bbnData from "../Data.js";

/**
 * Pops the last element of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyPop = function(targetObj, target) {
  return () => {
    // The bbnData object of the target array
    const len = target.length;
    if (len) {
      const subObj = this.getObject(target[len - 1]);
      if (subObj) {
        subObj.unset();
      }
    }
    const res = target.pop();
    if (targetObj) {
      //bbn.fn.log("POP");
      targetObj.prepareUpdate('length');
    }
    else {
      bbn.fn.log(["Impossible to find the data object in pop", target]);
    }
    return res;
  };
}
