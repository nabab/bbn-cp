import bbnNode from "./Node.js";
import setNodeRegion from "../../internals/setNodeRegion.js";

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
    setNodeRegion(this, after);
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
    Object.defineProperty(this.element, 'bbnNode', {
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

  nodeClean() {
    const ele = this.element;
    const id = this.id;
    const hash = this.hash;
    const nodes = this.component.$nodes;
    if (!ele) {
      throw new Error("Text node clean: no element found");
    }

    if (nodes[id]) {
      if (hash) {
        if (nodes[id][hash]) {
          delete nodes[id][hash];
        }
        else {
          throw new Error("Text node clean: hash not found");
        }
      }
      else {
        delete nodes[id];
      }
    }
    else {
      throw new Error("Text node clean: id not found");
    }

    ele.remove();
  }
}