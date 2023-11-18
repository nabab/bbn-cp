import bbnHTML from "./Html.js";
import bbnAnonCp from "./AnonCp.js";
import connectedCallback from "../internals/connectedCallback.js";
import disconnectedCallback from "../internals/disconnectedCallback.js";
import stringToTemplate from "../internals/stringToTemplate.js";
import templateToMap from "../internals/templateToMap.js";
import "../cp.js";

const tpl = stringToTemplate('<slot/>', 'bbn-anon');
const map = templateToMap(tpl);


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

  static bbnFn = bbnAnonCp;

  static bbnCls = 'bbnAnon';

  static bbnTpl = tpl;

  static bbnMap = map;

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
