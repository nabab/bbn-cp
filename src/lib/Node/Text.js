import bbn from "@bbn/bbn";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTextNode extends bbnNode
{
  nodeBuild() {
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
  
    Object.defineProperty(this.element, 'bbnSchema', {
      value: this,
      writable: false,
      configurable: false
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
      /*
      Object.defineProperty(ele, 'bbnIndex', {
        value: node.loopIndex,
        writable: false,
        configurable: false
      });
      */
    }
  
    if (bbn.cp.isComponent(parent)) {
      if (parent.bbnSlots?.default?.length || bbn.fn.removeExtraSpaces(this.element.textContent)) {
        parent.bbnSlots.default.push(this.element);
      }
    }
    else if (parent !== cp.$el) {
      parent.appendChild(this.element);
    }
  
  }

  nodeUpdate() {
    this.text.attrUpdate();
    //bbn.fn.log("UPDATE FROM TEXT NIODE")
    //this.element.nodeValue = this.text.attrGetValue();
  }
}