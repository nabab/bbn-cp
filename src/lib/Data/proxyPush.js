import bbnData from "../Data.js";

/**
 * Pushes one or more elements to the end of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyPush = function(target, component) {
  return (...args) => {
    // The bbnData object of the target array
    const targetObj = this.getObject(target);
    let newArgs = [];
    bbn.fn.each(args, (a, i) => {
      const idx = target.length + i;
      const newVal = this.treatValue(a, component, idx, targetObj);
      newArgs.push(newVal);
    });
    const res = target.push(...newArgs);
    if (targetObj) {
      //bbn.fn.log("PUSH");
      targetObj.update();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in push", target]);
    }

    return res;
  };
}

