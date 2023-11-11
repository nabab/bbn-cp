import bbnCp from "../Cp.js";

/**
 * Emits a new event with variable arguments
 */
bbnCp.prototype.$emit = function (eventName, ...args) {
  bbn.fn.checkType(eventName, String);

  if (bbn.env.loggingLevel > 5) {
    bbn.fn.log(bbn._("Event %s emitted by %s", eventName, this.$options.name));
  }
  /*
  if ((args.length === 1) && (args[0] instanceof Event) && (args[0].type === eventName)) {
    
    this.$el.dispatchEvent(args[0]);
    return;
  }
  */

  let ok = true;
  bbn.fn.each(args, a => {
    if (!bbn.fn.isPrimitive(a)) {
      if ((a instanceof CustomEvent) && a.detail && a.detail.__bbnEvent) {
        ok = false;
        return false;
      }
    }
  });

  if (!ok) {
    return;
  }

  const option = bbn.fn.createObject({
    detail: {
      __bbnEvent: true,
      args: args
    }
  });
  const ev = new CustomEvent(eventName, option);
  this.$el.dispatchEvent(ev);
}