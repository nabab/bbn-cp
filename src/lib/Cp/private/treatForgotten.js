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
 * @param {Object} o - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed children will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {Boolean} The result of the forget value.
 */
export default async function treatForgotten(cp, o, hash, parent, data) {
  // Check if the 'forget' directive exists and is an expression.
  if (o.forget?.exp) {
    // Evaluate the 'forget' directive's condition.
    const forgotten = setExpResult(cp, o.forget, hash, data);

    // Check if the internal state of the 'forget' directive is not 'OK'.
    if (getExpState(cp, o.forget.hash, hash) !== 'OK') {
      // Retrieve the existing element based on the node ID and hash.
      let ele = cp.$retrieveElement(o.id, hash);
      // If the condition is true, process the children without rendering the parent element.
      if (forgotten) {
        o.loopHash = hash;
        o.comment = true;

        if (!ele) {
          ele = await buildElement(cp, o, parent);
        }
        else if (!bbn.fn.isComment(ele)) {
          Array.from(ele.childNodes).forEach(node => {
            parent.insertBefore(node, ele);
          });
          // Remove the existing element from the DOM.
          await buildElement(cp, o, parent, data);
        }
      }
      // If forgotten is false but has changed
      else if (bbn.fn.isComment(ele)) {
        o.comment = false;
      }
    }

    return forgotten;
  }

  return false;
}
