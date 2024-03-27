import bbnCp from "../Cp.js";

/**
 * Set the watcher for the given property.
 * 
 * @param {Number} index The loop index if any
 * @returns {undefined}
 */
bbnCp.prototype.$watch = function (name, a) {
  const cp = this;

  const val = bbn.fn.getProperty(cp, name);
  let tmp = bbn.fn.createObject({
    handler: (bbn.fn.isFunction(a) ? a : a.handler).bind(cp),
    immediate: a.immediate || false,
    deep: a.deep || false,
    value: val,
    hash: bbnData.hash(val),
    num: 0
  });
  //bbn.fn.log(["WATCHING " + name, val, tmp])

  cp.$watcher[name] = tmp;

  // Returns a function to cancel the watcher
  return () => {
    delete cp.$watcher[name];
  }
}