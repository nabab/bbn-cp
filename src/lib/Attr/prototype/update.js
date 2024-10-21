import bbnAttr from "../Attr.js";
import bbnInternalNode from "../../Node/Internal.js";
import setProp from "../../Cp/private/setProp.js";
import bbn from "@bbn/bbn";

const noValueAttributes = ['required', 'disabled', 'readonly', 'hidden', 'checked', 'selected', 'multiple'];

bbnAttr.prototype.attrUpdate = async function(init) {
  if (this.name && this.node.element && !this.node.isOut) {
    const name = this.name;
    const jsName = bbn.cp.badCaseAttributes[this.name] || this.name;
    if (init || (this.exp && this.isChanged)) {
      const v = this.attrGetValue();
      this.node.props[name] = v;
      if (noValueAttributes.includes(name)) {
        if (!this.node.comment && this.node.element) {
          if (v && !this.node.element.hasAttribute(name)) {
            this.node.element.setAttribute(name, '');
          }
          else if (!v && this.node.element.hasAttribute(name)) {
            this.node.element.removeAttribute(name);
          }
        }
      }
      else if (this.node.tag === 'svg') {
        this.node.element.setAttribute(this.name, v);
      }
      else if (this.node.element?.bbn?.$props && Object.hasOwn(this.node.element.bbn.$props, name)) {
        if (v !== this.node.element.bbn.$props[name]) {
          setProp(this.node.element.bbn, name, v);
          if ((this.node.element[jsName] !== undefined) && !v && this.node.element.hasAttribute(name)) {
            this.node.element.removeAttribute(name);
          }
        }
      }
      // Regular HTML attributes of an element
      else if (this.node.element?.[jsName] !== undefined) {
        if (!v && (name === 'size') && (this.node.element.size == 20)) {
          return;
        }
        else if (
          // It exists on the element and is not the same value
          ![undefined, this.node.element[name]].includes(v)
          && bbn.fn.isWritable(this.node.element, jsName)) {
          try {
            this.node.element[jsName] = v;
            if (!v && (this.node.element.hasAttribute(name))) {
              this.node.element.removeAttribute(name);
            }
          }
          catch(e) {

            bbn.fn.log(bbn._("Error in attribute update: %s with the property %s", e.message, name));
          }
        }
        else if ((v === undefined) && this.node.element[jsName]) {
          if (this.node.element.hasAttribute(name)) {
            this.node.element.removeAttribute(name);
          }
          else {
            try {
              this.node.element[jsName] = '';
            }
            catch(e) {
              bbn.fn.log(bbn._("Error in attribute update with empty string: %s", e.message));
              try {
                this.node.element[jsName] = undefined;
              }
              catch(e) {
                bbn.fn.log(bbn._("Error in attribute update with null: %s", e.message));
              }
            }
          }
        }
      }
    }
  }
}
