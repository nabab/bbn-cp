import bbnData from "../Data.js";
import bbnComputed from "../../Computed.js";
import initResults from "../../Html/private/initResults.js";

const propagation = [];
const propagationData = [];
const propagationCp = [];

bbnData.propagate = function(cp, name) {
  let propagationFromHere = false;

  let arr = cp;
  if (arguments.length === 2) {
    arr = [{cp, name}];
  }

  let num = bbn.cp.numTicks;
  const todo = [];
  bbn.fn.each(arr, a => {
    let cp = a.cp;
    let name = a.name;
    if (!cp || !name) {
      throw new Error("Invalid arguments for propagateDependencyChanges");
    }

    if (cp.$deps[name]) {
      // The key for updating
      const dataObj = this.getObject(cp[name]);
      if (dataObj) {
        if (propagationData.includes(dataObj.uid)) {
          return;
        }

        propagationData.push(dataObj.uid);
      }

      //bbn.fn.log("PROPAGATING DEPENDENCY CHANGES FOR " + name + " IN " + cp.$options.name + " " + cp.$cid);
      for (let i = 0; i < cp.$deps[name].length; i++) {
        const a = cp.$deps[name][i];
        if (propagation.includes(a)) {
          continue;
        }

        const acp = a.component || a.node.component || cp;
        if (!propagation.length) {
          if (!propagationFromHere) {
            bbn.cp.numTicks++;
            propagationFromHere = true;
          }
        }

        propagation.push(a);
        if (!propagationCp.includes(acp)) {
          initResults(acp);
          propagationCp.push(acp);
        }

        //bbn.fn.log("PROPAGATION STARTED ON " + name, a);
        if (a instanceof bbnAttr || a instanceof bbnComputed) {
          todo.push({component: acp, element: a, num});
        }
        else {
          bbn.fn.log("UNKNOWN DEPENDENCY", a);
        }
      }
    }
  });

  bbn.cp.queueUpdate(...todo);
  if (propagationFromHere) {
    propagation.splice(0);
    propagationData.splice(0);
    propagationCp.splice(0);
  }
  else if (!propagation.length && propagationData.length) {
    propagationData.splice(0);
    propagationCp.splice(0);
  }
};
