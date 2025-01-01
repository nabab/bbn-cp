import bbnCp from "../../Cp.js";

/**
 * Removes an event listener on the element set with $on
 * @param {String} event 
 * @param {Function} handler 
 */
bbnCp.prototype.$off = function (event, handler, bound) {
  bbn.fn.checkType(event, String, bbn._("Events must be strings for \$off / %s in %s", event, this.$options.name));
  if (!this.$events[event]) {
    return;
  }

  if (!handler) {
    for (let hash in this.$events[event]) {
      this.$el.removeEventListener(event, this.$events[event][hash]);
      delete this.$events[event][hash];
    }
    return;
  }

  bbn.fn.checkType(handler, Function, bbn._("Events handlers must be functions for \$off / %s in %s", event, this.$options.name));
  const fn = bbn.fn.analyzeFunction(handler);
  const hash = bbn.fn.md5((bound || this).$cid + '-' + event + '-' + handler.toString());
  if (this.$events[event]?.[hash]) {
    this.$el.removeEventListener(event, this.$events[event][hash]);
    delete this.$events[event][hash];
  }
}