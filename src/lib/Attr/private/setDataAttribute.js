/**
 * Sets or removes a no-value attribute (boolean attributes like 'required', 'disabled', etc.) on a DOM element.
 *
 * @param {Object} node - The node containing the element to update.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
export default function setDataAttribute(node, name, v, jsName) {
  if (name.indexOf('data-') !== 0) {
    return false;
  }

  const ele = node.element;
  if (!node.comment && ele) {
    ele.setAttribute(name, v);
  }

  return true;
};
