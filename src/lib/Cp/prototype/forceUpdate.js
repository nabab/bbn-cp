import bbnCp from "../Cp.js";
import bbnNode from "../../Node/Node.js";

bbnCp.prototype.$forceUpdate = async function (fn) {
  const f = fn ? bbn.fn.analyzeFunction(fn) : {hash: 'forceUpdate'}; 
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