import bbnCp from "../Cp.js";

/**
 * Add delay before another function call
 */
bbnCp.prototype.$tick = function(...fns) {
  return new Promise(resolve => {
    bbn.cp.queueUpdate({
      component: this,
      fn: async () => {
        for (let i = 0; i < fns.length; i++) {
          if (bbn.fn.isFunction(fns[i])) {
            await fns[i]();
          }
        }

        resolve();
      }
    });
  });
}