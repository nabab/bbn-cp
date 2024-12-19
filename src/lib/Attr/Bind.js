import bbnAttr from "./Attr.js";
import setProp from "../Cp/private/setProp.js";
import bbnInternalNode from "../Node/Internal.js";
import bbnSlotNode from "../Node/Slot.js";

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
