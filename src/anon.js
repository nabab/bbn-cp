(() => {
  const sc = document.createElement('script');
  sc.setAttribute('type', 'text/javascript');
  const tmp = bbn.cp.stringToTemplate('<slot/>', true);
  sc.innerHTML = `
class bbnAnon extends bbnHTML
{
  constructor() {
    super();
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

  static bbnFn = bbnAnonCp;

  static bbnCls = 'bbnAnon';

  static bbnTpl = ${JSON.stringify(tmp.res)};

  static bbnMap = ${JSON.stringify(tmp.map)};

  static bbnCfg = bbn.cp.normalizeComponent({
    mixins: [bbn.cp.mixins.basic],
    props: {
      is: {
        type: [String, Object],
        default: 'div'
      }
    }
  }, 'bbnAnonSub' + this.bbnCid);

  static get bbnCls() {
    return bbnAnonCp;
  }

}

// Adding the newly defined component to the known array
bbn.cp.known.push('bbn-anon');
// Assigning the public class to the component's tag
customElements.define('bbn-anon', bbnAnon);
`;
  window.document.head.appendChild(sc);
})();
