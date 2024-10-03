import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";

export default async function propagateDependencyChanges(cp, name) {
  let propagationFromHere = false;

  if (cp.$deps[name]) {
    // The key for updating
  
    let num = bbn.cp.numTicks;
    const dataObj = cp.$computed[name] ? bbnData.getObject(cp.$computed[name].value) : null;
    for (let i = 0; i < cp.$deps[name].length; i++) {
      const a = cp.$deps[name][i];
      if (bbn.cp.propagation.includes(a)) {
        continue;
      }

      if (!bbn.cp.propagation.length) {
        if (!propagationFromHere) {
          bbn.cp.numTicks++;
          //bbn.fn.log("PROPAGATION STARTED ON " + name);
          propagationFromHere = true;
        }
      }

      bbn.cp.propagation.push(a);
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        await bbn.cp.queueUpdate({element: a, num});
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }

    }

  }

  if (propagationFromHere) {
    bbn.cp.propagation.splice(0);
  }

}
