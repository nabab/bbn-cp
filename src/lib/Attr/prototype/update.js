import bbnAttr from "../../Attr.js";
import bbnInternalNode from "../../Node/Internal.js";
import bbn from "@bbn/bbn";
import setNoValueAttribute from "../private/setNoValueAttribute.js";
import setSVGAttribute from "../private/setSVGAttribute.js";
import setPropOnComponent from "../private/setPropOnComponent.js";
import setRegularAttribute from "../private/setRegularAttribute.js";
import setUndefinedAttribute from "../private/setUndefinedAttribute.js";


/**
 * Asynchronously updates the attribute value on the associated DOM element based on the current state of the attribute.
 * This function handles various cases such as boolean attributes, SVG elements, component properties, and regular HTML attributes.
 *
 * @async
 * @param {boolean} init - Indicates whether this is the initial call (e.g., during initialization).
 * @returns {Promise<void>} - Resolves when the attribute has been updated.
 */
bbnAttr.prototype.attrUpdate = function(init) {
  if (this.name && this.node.element && !this.node.isOut) {
    const name = this.name;
    const jsName = bbn.cp.badCaseAttributes[this.name] || this.name;
    if (init || (this.exp && this.isChanged)) {
      const v = this.attrGetValue();
      let node = this.node;
      node.props[name] = v;
      /*
      if (node.isComponent) {
        node = node.component.$internal;
        if (Object.hasOwn(node?.attr || {}, name) || Object.hasOwn(node?.bind?.value || {}, name)) {
          return;
        }
      }
      */
      if (node instanceof bbnInternalNode) {
        node = this.node.component.$el?.bbnSchema;
        if (Object.hasOwn(node?.attr || {}, name) || Object.hasOwn(node?.bind?.value || {}, name)) {
          //return;
        }
      }

      if (
        !setNoValueAttribute(node, name, v, jsName) &&
        !setSVGAttribute(node, name, v) &&
        !setPropOnComponent(node, name, v, jsName) &&
        !setRegularAttribute(node, name, v, jsName)
      ) {
        setUndefinedAttribute(node, name, v, jsName);
      }
    }

  }
};
