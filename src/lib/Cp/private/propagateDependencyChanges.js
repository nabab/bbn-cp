import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";

export default function propagateDependencyChanges(cp, name) {
  let propagationFromHere = false;

  if (cp.$deps[name]) {
    // The key for updating
  
    let num = bbn.cp.numTicks;
    const dataObj = bbnData.getObject(cp[name]);
    if (dataObj) {
      if (bbn.cp.propagationData.includes(dataObj.uid)) {
        return;
      }

      bbn.cp.propagationData.push(dataObj.uid);
    }

    //bbn.fn.log("PROPAGATING DEPENDENCY CHANGES FOR " + name + " IN " + cp.$options.name + " " + cp.$cid);
    for (let i = 0; i < cp.$deps[name].length; i++) {
      const a = cp.$deps[name][i];
      if (bbn.cp.propagation.includes(a)) {
        continue;
      }

      if (!bbn.cp.propagation.length) {
        if (!propagationFromHere) {
          bbn.cp.numTicks++;
          propagationFromHere = true;
        }
      }

      bbn.cp.propagation.push(a);
      //bbn.fn.log("PROPAGATION STARTED ON " + name, a);
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        bbn.cp.queueUpdate({component: cp, element: a, num});
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }

    }

  }

  if (propagationFromHere) {
    bbn.cp.propagation.splice(0);
    bbn.cp.propagationData.splice(0);
  }
  else if (!bbn.cp.propagation.length && bbn.cp.propagationData.length) {
    bbn.cp.propagationData.splice(0);
  }

}
