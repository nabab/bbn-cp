import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnIsAttr extends bbnAttr
{
  attrSet(init) {
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

  attrUpdate() {
    if (this.isChanged && (this.realTag === 'bbn-anon')) {
      if (bbn.fn.isObject(this.attrGetValue())) {
        Object.defineProperty(this.node, 'cfg', {
          value: bbn.cp.normalizeComponent(this.attrGetValue()),
          writable: false,
          configurable: true
        });
      }
    }

    if (this.isChanged && !this.node.isCreating && this.node.element) {
      //this.node.nodeRemove(this.node.element);
      this.node.nodeInit();
    }
  }


}
