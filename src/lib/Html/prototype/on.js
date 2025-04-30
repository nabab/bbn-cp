import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Sets an event listener for the given event with the given handler on the component's element
 * @param {String} event 
 * @param {Function} handler 
 */
bbnProtoHtml.$on = function (...args) {
  let hasEvent = false;
  let hasHandler = false;
  let hasDom = false;
  let events = [];
  let dom = this;
  let handler, remove, bound;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === undefined) {
      continue;
    }

    if (bbn.fn.isString(args[i])) {
      events.push(args[i]);
      hasEvent = true;
    }
    else if (bbn.fn.isFunction(args[i])) {
      if (hasHandler) {
        throw new Error(bbn._("You cannot pass two functions to \$on in %s", this.$options.name));
      }

      handler = args[i];
      hasHandler = true;
    }
    else if (bbn.fn.isDom(args[i])) {
      if ((!hasHandler || !hasEvent) && !hasDom) {
        dom = args[i];
        hasDom = true;
      }
      else if (!bound) {
        bound = args[i];
      }
      else {
        throw new Error(bbn._("You cannot pass two DOM elements to \$on in %s", this.$options.name));
      }
    }
    else if ((remove === undefined) && [true, false, 1, 0].includes(args[i])) {
      remove = args[i];
    }
    else {
      throw new Error(bbn._("The argument number %d is invalid in %s", i + 1, this.$options.name));
    }
  }

  if (!bound) {
    bound = this;
  }

  if (!hasEvent) {
    throw new Error(bbn._("You must pass an event to \$on in %s", this.$options.name));
  }

  if (!hasHandler) {
    throw new Error(bbn._("You must pass a handler to \$on in %s", this.$options.name));
  }

  const fn = bbn.fn.analyzeFunction(handler);
  const hash = bbn.fn.md5((bound || this).$cid + '-' + fn.hash);
  const controller = new AbortController();
  bbn.fn.each(events, event => {
    if (!this.$events[event]) {
      this.$events[event] = bbn.fn.createObject();
    }

    if (!remove && this.$events[event][hash]) {
      return;
      //throw new Error(bbn._("The event %s is already set in %s", event, this.$options.name));
    }

    this.$events[event][hash] = (ev) => {
      const args = [];
      if (ev.detail?.args) {
        args.push(...ev.detail.args);
      }
      else {
        args.push(ev);
      }

      handler.bind(bound)(...args);
    };

    const signal = controller.signal;
    const opt = {signal};
    if (remove) {
      opt.once = true;
    }

    this.$events[event]['controller-' + hash] = controller;
    this.addEventListener(event, this.$events[event][hash], opt);
  });

  return controller;
}
