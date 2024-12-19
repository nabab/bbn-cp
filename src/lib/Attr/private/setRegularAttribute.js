/**
 * Sets a regular attribute on a DOM element.
 *
 * @param {Object} node - The node containing the element.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @param {string} jsName - The JavaScript property name (camelCased).
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
export default function setRegularAttribute(node, name, v, jsName) {
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

