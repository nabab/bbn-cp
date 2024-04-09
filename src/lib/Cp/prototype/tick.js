import bbnCp from "../Cp.js";

/**
 * Add delay before another function call
 */
bbnCp.prototype.$tick = function (fn) {
  return new Promise(resolve => {
    let idx = bbn.fn.search(bbn.cp.queue, {cp: this});
    let fns = [];
    if (idx === -1) {
      bbn.cp.queue.push({cp: this, fns});
      idx = bbn.cp.queue.length - 1;
    }
    else {
      fns = bbn.cp.queue[idx].fns;
    }

    fns.push(() => {
      if (fn) {
        fn();
      }

      resolve();
    });
  });
}