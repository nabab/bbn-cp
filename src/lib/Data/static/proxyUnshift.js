import bbnData from "../Data.js";

/**
 * Unshifts one or more elements to the beginning of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyUnshift = function(targetObj, target, component) {
  return (...args) => {
    // The bbnData object of the target array
    let newArgs = [];
    args.forEach((a, i) => {
      const idx = target.length + i;
      //const newVal = this.treatValue(a, component, idx, targetObj);
      newArgs.push(a);
    });
    const res = target.unshift(...newArgs);

    if (targetObj) {
      targetObj.fixIndexes(component);
      targetObj.prepareUpdate();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in unshift", target]);
    }

    return res;
  };
}
