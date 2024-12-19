/**
 * Handles setting an attribute when its value is undefined.
 *
 * @param {Object} node - The node containing the element.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute (expected to be undefined).
 * @param {string} jsName - The JavaScript property name (camelCased).
 */
export default function setUndefinedAttribute(node, name, v, jsName) {
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

