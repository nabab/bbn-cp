import bbnHTML from "./Html.js";
import bbnAnonCp from "./AnonCp.js";
import connectedCallback from "../internals/connectedCallback.js";
import disconnectedCallback from "../internals/disconnectedCallback.js";
import attributeChangedCallback from "../internals/attributeChangedCallback.js";
import stringToTemplate from "../internals/stringToTemplate.js";
import "../cp.js";

const tmp = stringToTemplate('<slot/>', true, 'bbn-anon');

export default class bbnAnon extends bbnHTML
{
  constructor() {
    super();
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
