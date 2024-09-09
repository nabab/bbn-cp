import bbn from "@bbn/bbn";
import bbnComputed from "../../Computed/Computed.js";

export default function propagateDependencyChanges(cp, name) {
  if (cp.$deps[name]) {
    cp.$deps[name].forEach((a) => {
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        bbn.cp.queueUpdate(a);
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }
    });
  }
}
