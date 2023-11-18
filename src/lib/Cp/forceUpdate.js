import bbnCp from "../Cp.js";
import launch from "./private/launch.js";

bbnCp.prototype.$forceUpdate = async function (fn) {
  if (!this.$isBusy) {
    const prom = launch(this);
    if (fn) {
      return prom.then(() => fn);
    }

    return prom;
  }
  else {
    return new Promise(resolve => {
      let idx = bbn.fn.search(bbn.cp.queue, {cp: this});
      let tmp;
      if (idx > -1) {
        tmp = bbn.cp.queue.splice(idx, 1)[0];
      }
      else {
        tmp = {
          cp: this,
          fns: [],
          force: true
        };
      }

      tmp.fns.push(resolve);
      if (fn && bbn.fn.isFunction(fn)) {
        tmp.fns.push(fn);
      }

      if (!tmp.force) {
        tmp.force = true;
      }

      bbn.cp.queue.unshift(tmp);

    });
  }
}