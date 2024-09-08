import bbnCp from "../Cp.js";

bbnCp.prototype.$forceUpdate = async function (fn) {
  return new Promise((resolve) => {
    bbn.cp.queueUpdate({
      component: this,
      fn: async () => {
        if (fn) {
          await fn();
        }

        resolve()
      }
    });
  })
}