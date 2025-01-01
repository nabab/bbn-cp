import bbn from "@bbn/bbn";
import bbnAttr from "../Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnRefAttr extends bbnAttr
{
  attrUpdate(init) {
    if (!init) {
      //bbn.fn.log("UPDATE ATTR REF " + this.name)
    }
  
    if (this.node.comment || !this.node.element) {
      return;
    }

    const cp = this.node.component;
    if (init || (this.exp && this.isChanged)) {
      const ref = this.attrGetValue();
      if (cp.$refsElements[ref] && (cp.$refsElements[ref] !== this.node.element)) {
        if (!bbn.fn.isArray(cp.$refsElements[ref])) {
          if (!cp.$refsElements[ref].isConnected) {
            cp.$refsElements[ref] = this.node.element;
          }
          else {
            cp.$refsElements[ref] = [cp.$refsElements[ref]]
          }
        }
        if (bbn.fn.isArray(cp.$refsElements[ref])) {
          cp.$refsElements[ref].push(this.node.element);
        }
      }
      else {
        cp.$refsElements[ref] = this.node.element;
      }
        }
  }

}