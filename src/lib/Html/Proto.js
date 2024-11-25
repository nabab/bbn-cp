import "../../cp.js";
import connectedCallback from "../../internals/connectedCallback.js";
import disconnectedCallback from "../../internals/disconnectedCallback.js";
import createCid from "../../internals/createCid.js";
import bbn from "@bbn/bbn";


/**
 * Create the bbn component class which extends the HTMLElement class
 */
const bbnProtoHtml = {
  construct() {
    Object.defineProperty(this, 'bbnCid', {
      value: createCid(),
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, 'bbnTmpSlots', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
  },

  connectedCallback() {
    const tag = this.constructor.bbnTag;
    if (bbn.cp.statics[tag] || (tag === 'bbn-anon')) {
      return connectedCallback(this);
    }
    else {
      const listener = document.addEventListener('bbn-loaded-' + tag, () => {
        document.removeEventListener('bbn-loaded-' + tag, listener);
        return connectedCallback(this);
      });
    }
  },

  disconnectedCallback() {
    return disconnectedCallback(this);
  },

  attributeChangedCallback(name, oldValue, newValue) {
    return bbn.cp.attributeChangedCallback(this, name, oldValue, newValue);
  }
}

export default bbnProtoHtml;