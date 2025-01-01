import bbnCp from "../../Cp.js";

/**
 * Sets an event listener for the given event with the given handler on the component's element
 * @param {String} event 
 * @param {Function} handler 
 */
bbnCp.prototype.$on = function (event, handler, remove, bound) {
  if (!bound) {
    bound = this;
  }

  bbn.fn.checkType(event, String, bbn._("Events must be strings for \$on in %s", this.$options.name));
  bbn.fn.checkType(handler, Function, bbn._("Events handlers must be functions for \$on in %s", this.$options.name));
  const fn = bbn.fn.analyzeFunction(handler);
  const hash = bbn.fn.md5((bound || this).$cid + '-' + fn.hash);
  if (!this.$events[event]) {
    this.$events[event] = bbn.fn.createObject();
  }

  if (!remove && this.$events[event][hash]) {
    //throw new Error(bbn._("The event %s is already set in %s", event, this.$options.name));
  }

  this.$events[event][hash] = (ev) => {
    const args = [];
    if (ev.detail?.args) {
      args.push(...ev.detail.args);
    }
    /*
    else {
      args.push(ev);
    }
    */

    handler.bind(bound)(...args);
  }

  const opt = {};
  if (remove) {
    opt.once = true;
  }

  this.$el.addEventListener(event, this.$events[event][hash], opt);
}