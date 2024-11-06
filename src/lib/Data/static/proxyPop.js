import bbnData from "../Data.js";

/**
 * Pops the last element of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxyPop = function(targetObj, target, component, path) {
  return () => {
    // The bbnData object of the target array
    const len = target.length;
    if (len) {
      const subObj = this.getObject(target[len - 1]);
      if (subObj) {
        subObj.removeComponent(component, len - 1);
      }
    }
    const res = target.pop();
    if (targetObj) {
      //bbn.fn.log("POP");
      targetObj.prepareUpdate();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in pop", target]);
    }
    return res;
  };
}
