import bbnProtoHtml from "./Proto.js";
export default class bbnElementHtml extends HTMLLIElement
{
  constructor() {
    super();
    bbnProtoHtml.construct.call(this);
  }

  connectedCallback() {
    return bbnProtoHtml.connectedCallback.call(this);
  } 

  disconnectedCallback() {
    return bbnProtoHtml.disconnectedCallback.call(this, [this]);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    return bbnProtoHtml.attributeChangedCallback.call(this, [this, name, oldValue, newValue]);
  }
}
