import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";

export default function propagateDependencyChanges(cp, name) {
  if (cp.$deps[name]) {
    const num = ++bbn.cp.numTicks;
    cp.$deps[name].forEach((a) => {
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        bbn.cp.queueUpdate({element: a, num});
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }
    });
  }
}
