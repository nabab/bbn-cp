import bbnCp from "../Cp.js";

bbnCp.prototype.$nextTick = async function(fn){
  const cp = this;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fn) {
        fn.bind(cp)();
      }

      resolve();
    }, bbn.cp.tickDelay);
  });
}
