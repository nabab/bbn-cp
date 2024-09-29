import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnIsAttr extends bbnAttr
{
  async attrSet(init) {
    if (init) {
      this.attrGetValue();
      if (bbn.fn.isObject(this.value)) {
        Object.defineProperty(this.node, 'cfg', {
          value: bbn.cp.normalizeComponent(this.attrGetValue()),
          writable: false,
          configurable: true
        });
      }
    }
  }

  async attrUpdate() {
    if (this.isChanged && (this.realTag === 'bbn-anon')) {
      if (bbn.fn.isObject(this.attrGetValue())) {
        Object.defineProperty(this.node, 'cfg', {
          value: bbn.cp.normalizeComponent(this.attrGetValue()),
          writable: false,
          configurable: true
        });
      }
    }
  }


}
