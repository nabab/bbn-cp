import bbnAnonCp from "../Cp/Anon.js";
import bbnProtoHtml from "./Proto.js";
import stringToTemplate from "../../internals/stringToTemplate.js";

const tmp = stringToTemplate('<slot/>', true, 'bbn-anon');

export default class bbnAnonHtml extends HTMLElement
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

  static bbnTag = 'bbn-anon';

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

}
