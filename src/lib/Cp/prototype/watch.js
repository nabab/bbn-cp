import bbnWatcher from "../../Watcher.js";
import bbnCp from "../../Cp.js";
import updateWatcher from "../private/updateWatcher.js";

/**
 * Set the watcher for the given property.
 * 
 * @param {Number} index The loop index if any
 * @returns {undefined}
 */
bbnCp.prototype.$watch = function (name, a) {
  const cp = this;

  const handler = (bbn.fn.isFunction(a) ? a : a.handler).bind(cp);
  const options = {
    immediate: a.immediate || false,
    deep: a.deep || false,
  };
  return bbnWatcher.setUp(cp, name, handler, options);
}