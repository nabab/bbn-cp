import setProp from "../../Html/private/setProp.js";
import setNoValueAttribute from "./setNoValueAttribute.js";

/**
 * Sets a property on a component if it has the property defined in its $props.
 *
 * @param {Object} node - The node containing the component.
 * @param {string} name - The name of the property.
 * @param {*} v - The value of the property.
 * @param {string} jsName - The JavaScript property name (camelCased).
 * @returns {boolean} - Returns true if the property was handled, false otherwise.
 */
export default function setPropOnComponent(node, name, v, jsName) {
  const ele = node.element;
  const cp = ele?.bbn;
  if (Object.hasOwn(cp?.$props || {}, name)) {
    if (v !== cp[name]) {
      setProp(cp, name, v);
    }

    if (cp.$isPropNative(jsName)) {
      if (!v && ele.hasAttribute(name) && !cp.$internal.attr[name]) {
        ele.removeAttribute(name);
      }
      else {
        try {
          ele[jsName] = v;
        }
        catch (e) {
          bbn.fn.log(["ERROR SETTING PROPERTY ON COMPONENT", name, jsName, ele[jsName], v, ele]);
        }
      }
    }
    return true;
  }

  return false;
};
