import bbn from "@bbn/bbn";

/**
 * Remove an element from the DOM
 * @param {HTMLElement} ele
 */
export default function removeDOM(cp, ele, replacer) {
  if (cp.$nodes[ele.bbnId]) {
    if (!ele.bbnHash) {
      if (cp.$nodes[ele.bbnId]?.element === ele) {
        cp.$nodes[ele.bbnId].element = null;
      }
    }
    else if (cp.$nodes[ele.bbnId]?.[ele.bbnHash]?.element === ele) {
      cp.$nodes[ele.bbnId][ele.bbnHash].element = null;
    }
  }

  if (ele?.parentNode) {
    if (replacer) {
      ele.parentNode.replaceChild(replacer, ele);
      if (!ele.bbnHash) {
        cp.$nodes[ele.bbnId].element = replacer;
      }
      else {
        cp.$nodes[ele.bbnId][ele.bbnHash].element = replacer;
      }
    }
    else {
      ele.parentNode.removeChild(ele);
    }
  }
  else {
    bbn.fn.log("Element not found in the DOM", ele);
  }
}