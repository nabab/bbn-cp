import bbnAttr from "./Attr.js";
import bbnSlotNode from "../Node/Slot.js";
import setNoValueAttribute from "./private/setNoValueAttribute.js";
import setSVGAttribute from "./private/setSVGAttribute.js";
import setPropOnComponent from "./private/setPropOnComponent.js";
import setRegularAttribute from "./private/setRegularAttribute.js";
import setUndefinedAttribute from "./private/setUndefinedAttribute.js";


/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBindAttr extends bbnAttr
{
  attrSet(init) {
    if (this.fn) {
      this.attrGetValue();
    }
  
    for (let n in this.result.value) {
      if (!this.node.attr[n]) {
        this.node.props[n] = this.result.value[n];
      }
    }
  }


  attrUpdate(init) {
    if ((this.attrGetState() !== 'OK') || init) {
      const node = this.node;
      //bbn.fn.log("CHANGE ON BIND")
      //bbnAttr.prototype.attrUpdate.apply(this, [init])
      if (this.result.value) {
        for (let n in this.result.value) {
          if (!this.node.attr[n]) {
            const v = this.result.value[n];
            this.node.props[n] = v;
            const cp = this.node.element?.bbn;
            const jsName = bbn.cp.badCaseAttributes[n] || n;
            if (
              !setNoValueAttribute(node, n, v, jsName) &&
              !setSVGAttribute(node, n, v) &&
              !setPropOnComponent(node, n, v, jsName) &&
              !setRegularAttribute(node, n, v, jsName)
            ) {
              setUndefinedAttribute(node, n, v, jsName);
            }
          }
        }
      }

      if (!(this.node instanceof bbnSlotNode)) {
        for (let n in this.node.props) {
          if (!this.node.attr[n] && (this.result.value?.[n] === undefined)) {
            delete this.node.props[n];
          }
        }
      }
    }
  }
}
