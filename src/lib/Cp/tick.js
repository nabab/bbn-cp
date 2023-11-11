import bbnCp from "../Cp.js";

/**
 * Add delay before another function call
 */
bbnCp.prototype.$tick = function () {
  let idx = bbn.fn.search(bbn.cp.queue, {cp: this});
  let tmp = idx > -1 ? bbn.cp.queue.splice(idx, 1)[0] : {cp: this, fns: []};
  bbn.cp.queue.push(tmp);
  //bbn.fn.log("TICK");
  //console.trace();
  //bbn.fn.log(this, '--------------------')
}