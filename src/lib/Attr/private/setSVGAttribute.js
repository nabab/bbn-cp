/**
 * Sets an attribute on an SVG element.
 *
 * @param {Object} node - The node containing the SVG element.
 * @param {string} name - The name of the attribute.
 * @param {*} v - The value of the attribute.
 * @returns {boolean} - Returns true if the attribute was handled, false otherwise.
 */
export default function setSVGAttribute(node, name, v) {
  if (node.tag === 'svg') {
    node.element.setAttribute(name, v);
    return true;
  }
  return false;
};
