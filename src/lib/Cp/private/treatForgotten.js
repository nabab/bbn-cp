import bbn from "@bbn/bbn";
import sr from "./sr.js";
import removeDOM from "./removeDOM.js";
import getInternalState from "./getInternalState.js";

/**
 * Processes a virtual DOM node with the 'forget' directive.
 * If the 'forget' condition is true, the element itself is not rendered, 
 * but its children are rendered directly under the parent element.
 * 
 * @param {bbnCp} cp - The context provider (component instance) containing methods and properties.
 * @param {Object} a - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed children will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {HTMLElement|null} The processed element or null if the element is forgotten.
 */
export default function treatForgotten(cp, a, hash, parent, data) {
  // Check if the 'forget' directive exists and is an expression.
  if (a.forget?.exp) {
    // Retrieve the existing element based on the node ID and hash.
    let ele = cp.$retrieveElement(a.id, hash);
    // Evaluate the 'forget' directive's condition.
    const forgotten = sr(cp, a.forget, hash, data);
    bbn.fn.warning("forgotten : " + forgotten);

    // Check if the internal state of the 'forget' directive is not 'OK'.
    if (getInternalState(cp, a.forget.id, hash) !== 'OK') {
      // If the condition is true, process the children without rendering the parent element.
      if (forgotten) {
        if (ele) {
          Array.from(ele.childNodes).forEach(node => {
            parent.insertBefore(node, ele);
          });
          // Remove the existing element from the DOM.
          removeDOM(cp, ele);
        }

      }
    }

    return forgotten;
  }

  return false;
}
