import bbnCp from "../Cp.js";

bbnCp.prototype.$nextTick = async function(fn){
  const f = fn ? bbn.fn.analyzeFunction(fn) : {hash: 'nextTick'}; 
  const cp = this;
  return new Promise((resolve) => {
    bbn.cp.nextQueue.push({
      component: cp,
      fn() {
        if (fn) {
          fn();
        }

        resolve();
      },
      hash: f.hash,
    });
  });
}
