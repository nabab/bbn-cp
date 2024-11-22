import bbn from "@bbn/bbn";
import bbnCp from "../Cp.js";

/**
 * Emits a new event with variable arguments
 */
bbnCp.prototype.$emit = function (eventName, ...args) {
  bbn.fn.checkType(eventName, String);

  if (bbn.env.loggingLevel > 5) {
    bbn.fn.log(bbn._("Event %s emitted by %s", eventName, this.$options.name));
  }

  if (!args.length) {
    bbn.fn.each(args, a => {
      if (!bbn.fn.isPrimitive(a)
          && (a instanceof CustomEvent)
          && a.detail
          && a.detail.__bbnEvent
      ) {
        if (a.detail.args) {
          args = a.detail.args;
        }
      }
    });
  }

  const ev = new CustomEvent(eventName, bbn.fn.createObject({
    cancelable: true,
    detail: {
      __bbnEvent: true,
      __bbnCid: this.$cid,
      args: args
    }
  }));
  this.$el.dispatchEvent(ev);
  return ev;
}
