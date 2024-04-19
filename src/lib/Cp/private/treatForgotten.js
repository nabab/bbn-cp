import setExpResult from "./setExpResult.js";
import buildElement from "./buildElement.js";
import getExpState from "./getExpState.js";
import removeDOM from "./removeDOM.js";
import treatProperties from "./treatProperties.js";
import treatElement from "./treatElement.js";
import bbn from "@bbn/bbn";

/**
 * Processes a virtual DOM node with the 'forget' directive.
 * If the 'forget' condition is true, the element itself is not rendered, 
 * but its children are rendered directly under the parent element.
 * If the element is forgotten and already exists, it is removed from the DOM.
 * 
 * @param {bbnCp} cp - The context provider (component instance) containing methods and properties.
 * @param {Object} node - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed children will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {Boolean} The result of the forget value.
 */
export default async function treatForgotten(cp, node, hash, parent, data) {
  // Check if the 'forget' directive exists and is an expression.
  if (node.forget?.exp) {
    // Evaluate the 'forget' directive's condition.
    const forgotten = setExpResult(cp, node.forget, hash, data);

    // Check if the internal state of the 'forget' directive is not 'OK'.
    if (getExpState(cp, node.forget.hash, hash) !== 'OK') {
      // Retrieve the existing element based on the node ID and hash.
      let ele = cp.$retrieveElement(node.id, hash);
      // If the condition is true, process the children without rendering the parent element.
      if (forgotten) {
        node.comment = true;

        if (!ele) {
          ele = await buildElement(cp, node, parent);
        }
        else if (!bbn.fn.isComment(ele)) {
          Array.from(ele.childNodes).forEach(child => {
            parent.insertBefore(child, ele);
          });
          // Remove the existing element from the DOM.
          await buildElement(cp, node, parent, data);
        }
      }
      // If forgotten is false but has changed
      else if (bbn.fn.isComment(ele)) {
        node.comment = false;
      }
    }

    return forgotten;
  }

  return false;
}
