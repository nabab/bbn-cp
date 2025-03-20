import bbnData from "../Data.js";

/**
 * Shifts the first element of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyShift = function(targetObj, target, component) {
  return () => {
    // The bbnData object of the target array
    const subObj = this.getObject(target[0]);
    const res = target.shift();
    if (subObj) {
      if (subObj) {
        subObj.removeComponent(component, 0);
      }
    }

    if (targetObj) {
      targetObj.fixIndexes(component);
      //bbn.fn.log("SHIFT");
      targetObj.prepareUpdate();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in shift", target]);
    }

    return res;
  };
}
