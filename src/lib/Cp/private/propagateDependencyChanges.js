import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";

export default async function propagateDependencyChanges(cp, name) {
  if (cp.$deps[name]) {
    if (!bbn.cp.propagation) {
      bbn.cp.numTicks++;
      bbn.fn.log("PREPARE UPDATE " + name +  " IN " + cp.$cid);
      bbn.cp.propagation = name;
    }
  
    let num = bbn.cp.numTicks;
    const dataObj = cp.$computed[name] ? bbnData.getObject(cp.$computed[name].value) : null;
    for (let i = 0; i < cp.$deps[name].length; i++) {
      const a = cp.$deps[name][i];
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        if (a instanceof bbnComputed && cp.$computed[a.name] && dataObj && dataObj.hasParent(a.component, a.name)) {
          bbn.fn.log("SKIP", a);
        }
        else {
          await bbn.cp.queueUpdate({element: a, num});
        }
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }
    }

  }
  if (bbn.cp.propagation) {
    bbn.cp.propagation = false;
  }
}
