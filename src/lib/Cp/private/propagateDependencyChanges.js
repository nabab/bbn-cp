import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";

export default function propagateDependencyChanges(cp, name) {
  if (cp.$deps[name]) {
    const num = ++bbn.cp.numTicks;
    const dataObj = cp.$computed[name] ? bbnData.getObject(cp.$computed[name].value) : null;
    cp.$deps[name].forEach((a) => {
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        if (a instanceof bbnComputed && cp.$computed[a.name] && dataObj && dataObj.hasParent(a.component, a.name)) {
          bbn.fn.log("SKIP", a);
        }
        else {
          bbn.cp.queueUpdate({element: a, num});
        }
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }
    });
  }
}
