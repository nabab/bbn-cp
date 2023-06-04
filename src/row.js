(() => {
  const sc = document.createElement('script');
  sc.setAttribute('type', 'text/javascript');
  sc.innerHTML = `
/**
 * Create the bbn component class which extends the HTMLElement class
 */
class bbnRowHTML extends HTMLTableRowElement
{
  bbnCid;

  constructor() {
    super();
    Object.defineProperty(this, 'bbnCid', {
      value: bbn.cp.createCid(),
      writable: false,
      configurable: false
    });
  }

  connectedCallback() {
    return bbn.cp.connectedCallback(this);
  } 

  disconnectedCallback() {
    return bbn.cp.disconnectedCallback(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    return bbn.cp.attributeChangedCallback(this, name, oldValue, newValue);
  }

  bbnUpdate(newSchema) {
    return bbn.cp.bbnUpdate(this, newSchema);
  }

}

`;
document.head.appendChild(sc);
})();