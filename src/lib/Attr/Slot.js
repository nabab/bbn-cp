import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnSlotAttr extends bbnAttr
{
  timeout = false;

  constructor(def, node, name) {
    super(def, node, name);
    if (!def.slotName) {
      throw new Error("The slot attribute needs a slot name");
    }

    Object.defineProperty(this, 'name', {
      value: def.slotName,
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'slotValue', {
      value: def.slotValue || false,
      writable: false,
      configurable: false
    });
  }
  
  attrUpdate(init) {
    if (!init) {
      this.attrSet();
      //bbn.fn.log(["UPDATE ATTR MODEL " + this.name, this.node.tag, this.isChanged, this.attrGetValue()]);
    }
  
    if (this.isChanged) {
      this.attrSerResult();
    }
  }
}