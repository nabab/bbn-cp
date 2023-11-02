import bbnHTML from "./Html.js";
import bbnAnonCp from "./AnonCp.js";
import "../cp.js";

const tmp = bbn.cp.stringToTemplate('<slot/>', true);

export default class bbnAnon extends bbnHTML
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

  static bbnTpl = tmp.res;

  static bbnMap = tmp.map;

  static bbnCfg = bbn.cp.normalizeComponent({
    mixins: [bbn.cp.mixins.basic],
    props: {
      is: {
        type: [String, Object],
        default: 'div'
      },
      source: bbn.fn.createObject()
    }
  }, 'bbnAnon');

  static get bbnCls() {
    return bbnAnonCp;
  }

}
