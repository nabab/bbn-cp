import bbnCp from "../Cp.js";

/**
 * Add delay before another function call
 */
bbnCp.prototype.$tick = function(...fns) {
  let hash = 'tick-';
  bbn.fn.each(fns, fn => {
    const f = bbn.fn.analyzeFunction(fn);
    hash += f.hash + '-';
  });
  return new Promise(resolve => {
    bbn.cp.queueUpdate({
      component: this,
      fn: () => {
        for (let i = 0; i < fns.length; i++) {
          if (bbn.fn.isFunction(fns[i])) {
            fns[i]();
          }
        }

        resolve();
      },
      hash,
      num: bbn.cp.numTicks
    });
  });
}