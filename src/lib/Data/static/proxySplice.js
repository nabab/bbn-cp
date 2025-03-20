import bbnData from "../Data.js";

/**
 * Splices the elements of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxySplice = function(targetObj, target, component) {
  return (index, numDelete, ...args) => {
    if (!targetObj) {
      throw new Error(["Impossible to find the data object", target]);
    }

    if (numDelete === undefined) {
      numDelete = target.length - index;
    }

    const res = target.splice(index, numDelete, ...args);
    if (targetObj) {
      res.forEach((t, i) => {
        let subObj = this.getObject(t);
        if (subObj) {
          subObj.removeComponent(component, i + index);
        }
      });

      targetObj.fixIndexes(component);
      //bbn.fn.log("SPLICE");
      targetObj.prepareUpdate();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in splice", target]);
    }

    return res;
  };
}
