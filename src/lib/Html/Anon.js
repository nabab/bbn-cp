import bbnHtml from "./Html.js";
import bbnAnonCp from "../Cp/Anon.js";
import bbnProtoHtml from "./Proto.js";
import stringToTemplate from "../../internals/stringToTemplate.js";
import connectedCallback from "../../internals/connectedCallback.js";
import disconnectedCallback from "../../internals/disconnectedCallback.js";

const tmp = stringToTemplate('<slot/>', true, 'bbn-anon');

export default class bbnAnonHtml extends bbnHtml
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
    return bbn.cp.attributeChangedCallback(this, name, oldValue, newValue);
  }

  static bbnFn = bbnAnonCp;

  static bbnCls = 'bbnAnonHtml';

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
  }, 'bbnAnonHtml');

  static get bbnCls() {
    return bbnAnonCp;
  }

}
