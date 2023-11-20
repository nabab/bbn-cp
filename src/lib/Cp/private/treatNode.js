import bbn from "@bbn/bbn";
import sr from "./sr.js";
import setInternalResult from "./setInternalResult.js";
import treatProperties from "./treatProperties.js";
import treatEvents from "./treatEvents.js";
import treatItems from "./treatItems.js";
import treatSlot from "./treatSlot.js";
import treatText from "./treatText.js";
import treatForgotten from "./treatForgotten.js";
import applyPropsOnElement from "./applyPropsOnElement.js";
import getInternalState from "./getInternalState.js";
import getInternalValue from "./getInternalValue.js";
import createElement from "./createElement.js";
import setProp from "./setProp.js";
import addToElements from "./addToElements.js";
import treatElement from "./treatElement.js";

/**
 * Processes an element in the virtual DOM of a web component.
 * It handles the creation and updating of elements, binding properties and events,
 * processing slots, text nodes, and more.
 * 
 * @param {Object} cp - The component instance containing methods and properties.
 * @param {Object} a - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed element will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {HTMLElement|null} The processed element or null if no element is processed.
 */
export default async function treatNode(cp, a, hash, parent, data, go = true) {
  // Default parent to a DocumentFragment if not provided.
  if (!parent) {
    parent = new DocumentFragment();
  }

  // Retrieve the existing element and its virtual DOM node.
  const node = cp.$currentMap[a.id];
  let forgotten = null;
  let ele;

  // Handle 'forget' directive to conditionally remove elements.
  forgotten = treatForgotten(cp, a, hash, parent, data);
  if (forgotten) {
    go = false;
  }
  // Special handling for 'transition' and 'template' tags.
  else if (!node.pre && ['transition', 'template'].includes(node.tag)) {
    go = false;
    forgotten = true;
  }

  // Process text nodes
  if (node.text) {
    treatText(cp, node, hash, parent, data);
  }
  // process slots content
  else if (node.tag === 'slot') {
    treatSlot(cp, node, hash, parent, data);
  }
  else if (node.tag) {
    // Determine if the element already exists or needs to be created.
    if (!forgotten && !cp.$retrieveElement(node.id, hash)) {
      go = true;
    }

    if (forgotten) {
      bbn.fn.log(["FORGOTTEN " + node.id, go]);
    }

    if (go) {
      ele = await treatElement(cp, node, hash, parent, data, go);
    }

    // Handle 'pre' directive or process child items.
    if (node.pre) {
      if (ele) {
        let preVal = setInternalResult(cp, node.id, `${node.pre}`, hash);
        if (ele.innerHTML !== preVal) {
          ele.innerHTML = preVal;
        }
      }
    }
    else if (node.items) {
      await treatItems(cp, node.items, hash, forgotten ? parent : ele, data);
    }

    return ele;
  }

  return null;
}
