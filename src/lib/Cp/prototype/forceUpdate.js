import bbnCp from "../Cp.js";
import initResults from "../private/initResults.js";

bbnCp.prototype.$forceUpdate = async function (fn) {
  const f = fn ? bbn.fn.analyzeFunction(fn) : {hash: 'forceUpdate'};
  initResults(this);
  return new Promise((resolve) => {
    bbn.cp.queueUpdate({
      num: bbn.cp.numTicks + 1,
      component: this,
      fn: () => {
        if (fn) {
          fn();
        }

        resolve()
      },
      hash: f.hash,
    });
  })
}