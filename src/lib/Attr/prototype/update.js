import bbnAttr from "../Attr.js";
import bbnInternalNode from "../../Node/Internal.js";
import setProp from "../../Cp/private/setProp.js";
import bbn from "@bbn/bbn";

const noValueAttributes = ['required', 'disabled', 'readonly', 'hidden', 'checked', 'selected', 'multiple'];

/**
 * Sets or removes a no-value attribute (boolean attributes like 'required', 'disabled', etc.) on a DOM element.
 *
 * @param {Object} node - The node containing the element to update.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
const setNoValueAttribute = (node, name, v, jsName) => {
  const ele = node.element;
  if (noValueAttributes.includes(name) && (ele?.[jsName] !== undefined)) {
    if (!node.comment && ele) {
      ele[jsName] = !!v;
    }

    return true;
  }

  return false;
};

/**
 * Sets an attribute on an SVG element.
 *
 * @param {Object} node - The node containing the SVG element.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
const setSVGAttribute = (node, name, v) => {
  if (node.tag === 'svg') {
    node.element.setAttribute(name, v);
    return true;
  }
  return false;
};

/**
 * Sets a property on a component if it has the property defined in its $props.
 *
 * @param {Object} node - The node containing the component.
 * @param {string} name - The name of the property.
 * @param {*} v - The value of the property.
 * @param {string} jsName - The JavaScript property name (camelCased).
 * @returns {boolean} - Returns true if the property was handled, false otherwise.
 */
const setPropOnComponent = (node, name, v, jsName) => {
  const ele = node.element;
  const cp = ele?.bbn;
  if (Object.hasOwn(cp?.$props || {}, name)) {
    if (v !== cp[name]) {
      setProp(cp, name, v);
    }

    if (![v, undefined].includes(ele[jsName])) {
      if (!v && ele.hasAttribute(name) && !cp.$internal.attr[name]) {
        ele.removeAttribute(name);
      }
      else {
        ele[jsName] = v;
      }
    }
    return true;
  }

  return false;
};

/**
 * Sets a regular attribute on a DOM element.
 *
 * @param {Object} node - The node containing the element.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @param {string} jsName - The JavaScript property name (camelCased).
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
const setRegularAttribute = (node, name, v, jsName) => {
  const ele = node.element;
  if (ele?.[jsName] !== undefined) {
    // Special case for 'size' attribute with default value
    if (!v && name === 'size' && ele.size == 20) {
      return true;
    }
    else if (
      ![undefined, ele[name]].includes(v) &&
      bbn.fn.isWritable(ele, jsName)
    ) {
      try {
        ele[jsName] = v;
      }
      catch (e) {
        bbn.fn.log(bbn._("Error in attribute update: %s with the property %s", e.message, name));
      }
    }
    return true;
  }
  return false;
};

/**
 * Handles setting an attribute when its value is undefined.
 *
 * @param {Object} node - The node containing the element.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute (expected to be undefined).
 * @param {string} jsName - The JavaScript property name (camelCased).
 */
const setUndefinedAttribute = (node, name, v, jsName) => {
  const ele = node.element;
  if (v === undefined && ele?.[jsName]) {
    if (ele.hasAttribute(name)) {
      ele.removeAttribute(name);
    }
    else {
      try {
        ele[jsName] = '';
      }
      catch (e) {
        bbn.fn.log(bbn._("Error in attribute update with empty string: %s", e.message));
        try {
          ele[jsName] = undefined;
        }
        catch (e) {
          bbn.fn.log(bbn._("Error in attribute update with null: %s", e.message));
        }
      }
    }
  }
};

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
