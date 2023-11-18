import bbn from "@bbn/bbn";
import sr from "./sr.js";
import treatItems from "./treatItems.js";

/**
 * Processes 'slot' elements within a web component, distributing child elements into the appropriate slots.
 * It handles both named and default slots, and manages the placement of child elements into these slots.
 * 
 * @param {Object} cp - The context provider (component instance) containing methods and properties.
 * @param {Object} node - The virtual DOM node representing the slot element.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the slot content will be placed.
 * @param {Object} data - Additional data that might be required for processing the elements.
 * @returns {HTMLElement} The parent element with the slot content appended or modified.
 */
export default async function treatSlot(cp, node, hash, parent, data) {
  // Check if the node is a 'slot' element.
  if (node.tag === 'slot') {
    let slot = 'default'; // Default slot name.

    // Determine the name of the slot (if specified).
    if (node.attr?.name) {
      slot = node.attr.name.exp ? sr(cp, node.attr.name, hash, data) : node.attr.name.value;
    }

    // Check if there are elements to be placed in this slot.
    if (cp.$el.bbnSlots?.[slot]?.length) {
      // Iterate over each element designated for this slot.
      bbn.fn.each(cp.$el.bbnSlots[slot], a => {
        // Prepare a search object to find the element in the slot.
        let search = {bbnId: a.bbnId};
        if (a.bbnHash) {
          search.bbnHash = a.bbnHash;
        }

        // Handle the case where the slot is inside another component.
        if ((parent !== cp.$el) && bbn.cp.isComponent(parent)) {
          let idx = bbn.fn.search(parent.bbnSlots[slot], search);
          parent.bbnSlots.default.splice(idx > -1 ? idx : parent.bbnSlots.default.length, idx > -1 ? 1 : 0, a);
        }
        // Handle the case where the element is not yet mounted.
        else if (!a.parentNode) {
          let idx = bbn.fn.search(parent.childNodes, search);
          if (idx > -1) {
            parent.replaceChild(a, parent.childNodes[idx]);
          }
          else {
            parent.appendChild(a);
          }
        }
      });
    }

    // Process any additional items within the slot node.
    await treatItems(cp, node, hash, parent, data);
    return parent; // Return the parent element with the slot content.
  }
}
