import bbn from "@bbn/bbn";
import tryMount from "./tryMount.js";

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

  if (ele.bbnComponent) {
    let idx = ele.bbnComponent.$components.indexOf(ele);
    if (idx > -1) {
      ele.bbnComponent.$components.splice(idx, 1);
      tryMount(ele.bbnComponent);
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
    ele.remove();
    //bbn.fn.log("Element not found in the DOM", ele);
  }
}