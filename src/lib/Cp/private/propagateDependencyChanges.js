import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";
import initResults from "./initResults.js";

const propagation = [];
const propagationData = [];
const propagationCp = [];
export default function propagateDependencyChanges(cp, name) {
  let propagationFromHere = false;

  if (cp.$deps[name]) {
    // The key for updating
  
    let num = bbn.cp.numTicks;
    const dataObj = bbnData.getObject(cp[name]);
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

      const acp = a.component || a.node.component;
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
        bbn.cp.queueUpdate({component: acp, element: a, num});
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }

    }

  }

  if (propagationFromHere) {
    propagation.splice(0);
    propagationData.splice(0);
    propagationCp.splice(0);
  }
  else if (!propagation.length && propagationData.length) {
    propagationData.splice(0);
    propagationCp.splice(0);
  }

}
