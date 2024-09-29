import bbnAttr from "../Attr.js";
import bbnInternalNode from "../../Node/Internal.js";
import setProp from "../../Cp/private/setProp.js";

bbnAttr.prototype.attrUpdate = async function(init) {
  if (this.name && this.node.element && !this.node.isOut) {
    const name = bbn.cp.badCaseAttributes[this.name] || this.name;
    if (init || (this.exp && this.isChanged)) {
      const v = this.attrGetValue();
      this.node.props[name] = v;
      if (this.node.tag === 'svg') {
        this.node.element.setAttribute(this.name, v);
      }
      else if (this.node.element?.bbn?.$props
          && Object.hasOwn(this.node.element.bbn.$props, name)
          && ![undefined, this.node.element.bbn.$props[name]].includes(v)) {
        setProp(this.node.element.bbn, name, v);
        if ((this.node.element[name] !== undefined) && !v && this.node.element.hasAttribute(name)) {
          this.node.element.removeAttribute(name);
        }
      }
      // Regular HTML attributes of an element
      else if (this.node.element?.[name] !== undefined) {
        if (!v && (name === 'size') && (this.node.element[name] == 20)) {
          return;
        }
        else if (
          // It exists on the element and is not the same value
          ![undefined, this.node.element[name]].includes(v)
          && bbn.fn.isWritable(this.node.element, name)) {
          try {
            this.node.element[name] = v;
            if (!v && (this.node.element.hasAttribute(name))) {
              this.node.element.removeAttribute(name);
            }
          }
          catch(e) {

            bbn.fn.log(bbn._("Error in attribute update: %s with the property %s", e.message, name));
          }
        }
        else if ((v === undefined) && this.node.element[name]) {
          if (this.node.element.hasAttribute(name)) {
            this.node.element.removeAttribute(name);
          }
          else {
            try {
              this.node.element[name] = '';
            }
            catch(e) {
              bbn.fn.log(bbn._("Error in attribute update with empty string: %s", e.message));
              try {
                this.node.element[name] = undefined;
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
