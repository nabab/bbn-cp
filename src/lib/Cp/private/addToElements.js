import bbn from "@bbn/bbn";
import removeDOM from "./removeDOM.js";
/**
 * Adds or updates the given element to the `$elements` object property of a `bbnCp` component.
 * 
 * @param {bbnCp} cp - The component instance where the element is to be added.
 * @param {HTMLElement | Text | Comment | SVGElement} ele - The HTML element, text node, or comment to be added.
 */
export default function addToElements(cp, ele) {
  bbn.fn.checkType(cp, bbnCp, "No component in addToElements");
  // Ensure that the element is of a valid type (HTML element, text node, or comment).
  bbn.fn.checkType(ele, [HTMLElement, Text, Comment, SVGElement], "Elements should be HTML elements or text nodes");

  // Ensure that the element has a valid ID (string or symbol).
  bbn.fn.checkType(ele.bbnId, ['string', 'symbol'], "In addToElements the ID should be a symbol");

  // Retrieve the element's unique identifier and hash.
  const id = ele.bbnId;
  const hash = ele.bbnHash;
  // Retrieve the component ID associated with the element.
  const origin = ele.bbnComponentId;

  // If the element originates from a different component, get that component.
  if (origin !== cp.$cid) {
    cp = bbn.cp.getComponent(origin).bbn;
  }

  if (!cp.$currentMap[id]) {
    bbn.fn.warning("Element does not exist in map");
    bbn.fn.log(["Element does not exist in map", cp, id, ele]);
  }
  // If the element has a hash, add or update it in the $elements object using the hash.
  if (hash) {
    // Initialize the object for the element ID if not already present.
    if (!cp.$elements[id]) {
      cp.$elements[id] = bbn.fn.createObject();
    }

    // If the element is not already present, add it; otherwise, throw an error.
    if (cp.$elements[id][hash] !== ele) {
      if (cp.$elements[id][hash]) {
        let isCommentNew = bbn.fn.isComment(ele);
        let isCommentOld = bbn.fn.isComment(cp.$elements[id][hash]);
        if ((isCommentNew !== isCommentOld) || (ele.tagName !== cp.$elements[id][hash].tagName)) {
          removeDOM(cp, cp.$elements[id][hash]);
        }
        else {
          bbn.fn.log(["Element exist error with hash", cp, cp.$elements[id][hash], ele, id, hash]);
          removeDOM(cp, cp.$elements[id][hash]);
          //throw Error("The element " + id + " with hash " + hash + " already exists in the DOM");
        }
      }
      cp.$elements[id][hash] = ele;
    }
  }
  // If the element does not have a hash, add or update it in the $elements object using the ID.
  else if (cp.$elements[id] !== ele) {
    if (cp.$elements[id]) {
      let isCommentNew = bbn.fn.isComment(ele);
      let isCommentOld = bbn.fn.isComment(cp.$elements[id]);
      if ((isCommentNew !== isCommentOld) || (ele.tagName !== cp.$elements[id].tagName)) {
        removeDOM(cp, cp.$elements[id]);
      }
      else {
        bbn.fn.log(["Element exist error", cp, cp.$elements[id], ele, ele.bbnSchema.tag, id, cp.$numBuild, cp.$options.name]);
        removeDOM(cp, cp.$elements[id]);
        //throw Error("The element " + id + " already exists in the DOM");
      }
    }

    cp.$elements[id] = ele;
  }
}
