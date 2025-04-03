import bbnComputed from "../../Computed.js";

export default function propagateDependencyChanges(cp, name) {
  if (cp.$deps[name]?.length) {
    // The key for updating
  
    let num = bbn.cp.numTicks;
    const propagationFromHere = bbn.cp.propagationCp.length === 0;
    let propagationReallyFromHere = false;
    //bbn.fn.log("PROPAGATING DEPENDENCY CHANGES FOR " + name + " IN " + cp.$options.name + " " + cp.$cid);
    const todo = [];
    for (let i = 0; i < cp.$deps[name].length; i++) {
      const a = cp.$deps[name][i];
      if (bbn.cp.propagation.includes(a)) {
        continue;
      }

      const acp = a.component || a.node.component || cp;
      bbn.cp.propagation.push(a);
      if (!bbn.cp.propagationCp.includes(acp)) {
        if (propagationFromHere && !propagationReallyFromHere && !bbn.cp.propagationCp.length) {
          propagationReallyFromHere = true;
          bbn.cp.numTicks++;
        }
        bbn.cp.propagationCp.push(acp);
      }

      //bbn.fn.log("PROPAGATION STARTED ON " + name, a);
      if (a instanceof bbnAttr || a instanceof bbnComputed) {
        todo.push({component: acp, element: a});
      }
      else {
        bbn.fn.log("UNKNOWN DEPENDENCY", a);
      }

    }

    bbn.cp.queueUpdate(...todo);
    if (propagationReallyFromHere) {
      bbn.cp.propagation.splice(0);
      bbn.cp.propagationData.splice(0);
      bbn.cp.propagationCp.splice(0);
    }
  }
}
