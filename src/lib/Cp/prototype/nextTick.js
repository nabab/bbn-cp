import queueUpdate from "../../../functions/queueUpdate.js";
import bbnCp from "../Cp.js";

bbnCp.prototype.$nextTick = async function(fn){
  const f = fn ? bbn.fn.analyzeFunction(fn) : {hash: 'nextTick'}; 
  const cp = this;
  return new Promise((resolve) => {
    bbn.cp.nextQueue.push({
      num: bbn.cp.numTicks+1,
      component: cp,
      fn() {
        let res;
        if (fn) {
          res = fn();
        }

        resolve(res);
      },
      hash: f.hash,
    });
    bbn.cp.startTick();
  });
}
