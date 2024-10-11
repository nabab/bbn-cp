import bbnData from "../Data.js";

/**
 * Pushes one or more elements to the end of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyPush = function(targetObj, target, component) {
  return (...args) => {
    // The bbnData object of the target array
    let newArgs = [];
    args.forEach((a, i) => {
      const idx = target.length + i;
      const newVal = this.treatValue(a, component, idx, targetObj);
      newArgs.push(newVal);
    });
    const res = target.push(...newArgs);
    if (targetObj) {
      //bbn.fn.log("PUSH");
      targetObj.prepareUpdate('length');
    }
    else {
      bbn.fn.log(["Impossible to find the data object in push", target]);
    }

    return res;
  };
}

