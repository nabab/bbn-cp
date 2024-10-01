import bbnCp from "../Cp.js";

bbnCp.prototype.$forceUpdate = async function (fn) {
  const f = fn ? bbn.fn.analyzeFunction(fn) : {hash: 'forceUpdate'}; 
  return new Promise((resolve) => {
    bbn.cp.queueUpdate({
      component: this,
      fn: async () => {
        if (fn) {
          await fn();
        }

        resolve()
      },
      hash: f.hash
    });
  })
}