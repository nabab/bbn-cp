/**
 * Checks if the given element matches a specific tag.
 * @param {string} tag - The tag to check against.
 * @param {HTMLElement|SVGElement} ele - The element to check.
 * @returns {boolean} True if the element matches the tag or 'is' attribute, false otherwise.
 */
export default function isTag(tag, ele) {
// Validate that the tag is a string.
  bbn.fn.checkType(tag, 'string', bbn._("Tags must be strings"));

  // Return false if the element doesn't have a tagName property.
  if (!ele.tagName) {
    return false;
  }

  // Ensure the element is either an HTML or SVG element.
  bbn.fn.checkType(ele, [HTMLElement, SVGElement], bbn._("Elements must be HTML or SVG elements"));

  // Check if the element's tagName matches the provided tag (case-insensitive).
  if (ele.tagName.toLowerCase() === tag) {
    return true;
  }

// Alternatively, check if the element's 'is' attribute matches the provided tag.
  if (ele.getAttribute("is") === tag) {
    return true;
  }

// Return false if none of the conditions are met.
  return false;
}
