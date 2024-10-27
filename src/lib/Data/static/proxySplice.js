import bbn from "@bbn/bbn";
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

    const res = numDelete === undefined ? target.splice(index) : target.splice(index, numDelete);
    let i = index;
    res.forEach(t => {
      let subObj = this.getObject(t);
      if (subObj) {
        subObj.removeComponent(component, i);
      }
      i++;
    });

    let newArgs = [];
    args.forEach((a, i) => {
      const idx = target.length + i;
      //const newVal = this.treatValue(a, component, idx, targetObj);
      newArgs.push(a);
    });
    if (newArgs.length) {
      target.splice(index, 0, ...newArgs);
    }

    if (targetObj) {
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
