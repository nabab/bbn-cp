import bbnCp from "../Cp.js";

bbnCp.prototype.$nextTick = async function(fn){
  const cp = this;
  return new Promise((resolve) => {
    setTimeout(() => {
      bbn.cp.queueUpdate({
        component: cp,
        fn() {
          if (fn) {
            fn();
          }

          resolve();
        }
      });
    }, bbn.cp.tickDelay);
  });
}
