/**
 * Remove an element from the DOM
 * @param {HTMLElement} ele
 */
export default function removeDOM(cp, ele, replacer) {
  if (ele?.parentNode) {
    if (replacer) {
      ele.parentNode.replaceChild(replacer, ele);
    }
    else {
      ele.parentNode.removeChild(ele);
    }
  }
}