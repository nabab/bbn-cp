import treatNode from "./treatNode.js";
import removeDOM from "./removeDOM.js";
import buildElement from "./buildElement.js";
import bbn from "@bbn/bbn";



/**
 * Applies a condition to a specific element, treating it if the condition is true,
 * and deleting it if the condition is false.
 * 
 * @param {bbnCp} cp - The context provider, containing methods and properties to manipulate elements.
 * @param {boolean} conditionValue - The condition value determining the action to be taken.
 * @param {Object} node - The node object representing the element to be treated or deleted.
 * @param {string} hash - A unique identifier for the element, used in conjunction with cp.
 * @param {HTMLElement} parent - The parent element of the node.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {Array} hashList - An array of elements done through an upper loop
 * 
 * @returns {Element} The treated element if the condition is true, otherwise null.
 */
export default async function treatCondition(
  cp,
  conditionValue,
  node,
  hash,
  parent,
  data,
  hashList
) {
  let ele = null;
  // If the condition is true, treat the element.
  if (conditionValue) {
    ele = await treatNode(cp, node, hash, parent, data, true, hashList);
  }
  // If the condition is false, delete the element if it exists.
  else {
    // Special handling for specific node tags like 'template', 'transition', 'slot'.
    if (['template', 'transition', 'slot'].includes(node.tag)) {
      if (cp.$currentMap[node.id].items) {
        // Iterate over each item in the node.
        bbn.fn.each(cp.$currentMap[node.id].items, it => {
          let e = cp.$retrieveElement(it.id, hash);
          // Remove the element if it exists and is not a comment.
          if (e) {
            removeDOM(cp, e);
          }
        });
      }
    }
    // Retrieve the element based on node id and hash.
    ele = cp.$retrieveElement(node.id, hash);
    // Check if the element is not already a comment.
    if (!ele || !bbn.fn.isComment(ele)) {
      // If the element exists, remove it.
      node.comment = true;
      ele = await buildElement(cp, node, parent, data);
    }
  }

  return ele;
};
