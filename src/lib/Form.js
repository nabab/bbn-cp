import "../cp.js";
import createCid from "../internals/createCid.js";
import connectedCallback from "../internals/connectedCallback.js";
import disconnectedCallback from "../internals/disconnectedCallback.js";
import attributeChangedCallback from "../internals/attributeChangedCallback.js";

/**
 * Create the bbn component class which extends the HTMLElement class
 */
export default class bbnFormHTML extends HTMLFormElement
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
    return attributeChangedCallback(this, name, oldValue, newValue);
  }

}

