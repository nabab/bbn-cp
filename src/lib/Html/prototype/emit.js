import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Emits a new event with variable arguments
 */
bbnProtoHtml.$emit = function (eventName, ...args) {
  bbn.fn.checkType(eventName, String);

  if (bbn.env.loggingLevel > 5) {
    bbn.fn.log(bbn._("Event %s emitted by %s", eventName, this.$options.name));
  }

  const ev = new CustomEvent(eventName, bbn.fn.createObject({
    cancelable: true,
    detail: {
      __bbnEvent: true,
      __bbnCid: this.$cid,
      args
    }
  }));
  this.dispatchEvent(ev);
  return ev;
}
