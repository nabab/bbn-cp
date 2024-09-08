import bbn from "@bbn/bbn";
import bbnNode from "./Node.js";
import addToElements from "../Cp/private/addToElements.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTextNode extends bbnNode
{
  build() {
    if (!this.text) {
      throw new Error("A text node must be text! (Magritte)")
    }

    const parent = this.parentElement || this.component.$el;
    const cp = this.component;
    const ele = document.createTextNode(this.text.getValue());
    Object.defineProperty(ele, 'bbnId', {
      value: this.id,
      writable: false,
      configurable: false
    });
    Object.defineProperty(ele, 'bbnComponentId', {
      value: cp.$cid,
      writable: false,
      configurable: false
    });
  
    Object.defineProperty(ele, 'bbnSchema', {
      value: this,
      writable: false,
      configurable: false
    });
  
    if (this.data) {
      Object.defineProperty(ele, 'bbnLoopVars', {
        value: this.data,
        writable: false,
        configurable: false
      });
    }
  
    if (this.hash) {
      Object.defineProperty(ele, 'bbnHash', {
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
  
    addToElements(cp, ele);
  
    if (bbn.cp.isComponent(parent)) {
      if (parent.bbnSlots?.default?.length || bbn.fn.removeExtraSpaces(ele.textContent)) {
        parent.bbnSlots.default.push(ele);
      }
    }
    else if (parent !== cp.$el) {
      parent.appendChild(ele);
    }
  
  }

  update() {
    //bbn.fn.log("UPDATE FROM TEXT NIODE")
    this.element.nodeValue = this.text.getValue();
  }
}