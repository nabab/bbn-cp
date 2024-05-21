import bbn from "@bbn/bbn";
import bbnData from "../Data.js";

/**
 * Splices the elements of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.proxySplice = function(target, component) {
  return (index, numDelete, ...args) => {
    const targetObj = this.getObject(target);
    if (!targetObj) {
      bbn.fn.log(["Impossible to find the data object", target]);
    }
    let newArgs = [];
    bbn.fn.each(args, (a, i) => {
      const idx = target.length + i;
      const newVal = this.treatValue(a, component, idx, targetObj);
      newArgs.push(newVal);
    });
    const res = numDelete === undefined ? target.splice(index) : target.splice(index, numDelete, ...newArgs);
    bbn.fn.each(res, t => {
      let subObj = this.getObject(t);
      if (subObj) {
        subObj.unset();
      }
    });
    if (targetObj) {
      //bbn.fn.log("SPLICE");
      targetObj.update();
    }
    else {
      bbn.fn.log(["Impossible to find the data object in splice", target]);
    }

    return res;
  };
}
