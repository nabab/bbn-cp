const noValueAttributes = ['required', 'disabled', 'readonly', 'hidden', 'checked', 'selected', 'multiple'];

/**
 * Sets or removes a no-value attribute (boolean attributes like 'required', 'disabled', etc.) on a DOM element.
 *
 * @param {Object} node - The node containing the element to update.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
export default function setNoValueAttribute(node, name, v, jsName) {
  const ele = node.element;
  if (noValueAttributes.includes(name) && (ele?.[jsName] !== undefined)) {
    if (!node.comment && ele) {
      ele[jsName] = !!v;
    }

    return true;
  }

  return false;
};
