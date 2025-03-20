import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTextNode extends bbnNode
{
  nodeBuild(after) {
    if (!this.text) {
      throw new Error("A text node must be text! (Magritte)")
    }

    const parent = this.parentElement || this.component.$el;
    const cp = this.component;
    this.element = document.createTextNode(this.text.attrGetValue());
    Object.defineProperty(this.element, 'bbnId', {
      value: this.id,
      writable: false,
      configurable: false
    });
    Object.defineProperty(this.element, 'bbnComponentId', {
      value: cp.$cid,
      writable: false,
      configurable: false
    });
  
    const node = this;
    Object.defineProperty(this.element, 'bbnSchema', {
      get() {
        return node;
      }
    });
  
    if (this.data) {
      Object.defineProperty(this.element, 'bbnLoopVars', {
        value: this.data,
        writable: false,
        configurable: false
      });
    }
  
    if (this.hash) {
      Object.defineProperty(this.element, 'bbnHash', {
        value: this.hash,
        writable: false,
        configurable: false
      });
    }
  
    this.nodeInsert(this.element, after);
  }

  nodeUpdate() {
    this.text.attrUpdate();
  }
}