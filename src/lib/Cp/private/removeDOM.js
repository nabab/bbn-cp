import removeFromElements from "./removeFromElements.js";

/**
 * Remove an element from the DOM
 * @param {HTMLElement} ele
 */
export default function removeDOM(cp, ele, replacer) {
  bbn.fn.log([
    "REMOVING " + ele.bbnId + (replacer ? " WITH REPLACER " + replacer.bbnId : ""),
    ele,
    replacer,
    ele.bbnSchema.tag || "NO TAG",
    cp === ele.bbnSchema.component,
    cp.$options.name,
    ele.bbnSchema.parentElement
  ]);
  if (ele.parentNode) {
    if (replacer) {
      ele.parentNode.replaceChild(replacer, ele);
      if (ele.bbnHash) {
        cp.$elements[ele.bbnId][ele.bbnHash] = replacer;
      }
      else {
        cp.$elements[ele.bbnId] = replacer;
      }
    }
    else {
      ele.parentNode.removeChild(ele);
      if (ele.bbnHash) {
        delete cp.$elements[ele.bbnId][ele.bbnHash];
      }
      else {
        delete cp.$elements[ele.bbnId];
      }
    }
  }
}