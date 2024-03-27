import "../cp.js";
import connectedCallback from "../internals/connectedCallback.js";
import disconnectedCallback from "../internals/disconnectedCallback.js";
import createCid from "../internals/createCid.js";

/**
 * Create the bbn component class which extends the HTMLElement class
 */
export default class bbnRowHTML extends HTMLTableRowElement
{
  bbnCid;

  constructor() {
    super();
    Object.defineProperty(this, 'bbnCid', {
      value: createCid(),
      writable: false,
      configurable: false
    });
  }

  connectedCallback() {
    return connectedCallback(this);
  } 

  disconnectedCallback() {
    return disconnectedCallback(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    return bbn.cp.attributeChangedCallback(this, name, oldValue, newValue);
  }

  bbnUpdate(newSchema) {
    return bbn.cp.bbnUpdate(this, newSchema);
  }

}
