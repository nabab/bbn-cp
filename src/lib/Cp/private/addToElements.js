import removeDOM from "./removeDOM.js";
/**
 * Adds or updates the given element to the $elements object property
 * 
 * @param {bbnCp} cp 
 * @param {HTMLElement, Text} ele The HTML element to be added
 * @returns {undefined}
 */
export default function addToElements(cp, ele) {
  bbn.fn.checkType(ele, [HTMLElement, Text, Comment, SVGElement], "Elements should be HTML elements or text nodes");
  bbn.fn.checkType(ele.bbnId, ['string', 'symbol'], "In addToElements the ID should be a symbol");
  const id = ele.bbnId;
  const hash = ele.bbnHash;
  const origin = ele.bbnComponentId;
  if (origin !== cp.$cid) {
    cp = bbn.cp.getComponent(origin).bbn;
  }

  if (hash) {
    if (!cp.$elements[id]) {
      cp.$elements[id] = bbn.fn.createObject();
    }

    if (cp.$elements[id][hash] && (cp.$elements[id][hash] !== ele)) {
      removeDOM(cp, cp.$elements[id][hash]);
      cp.$elements[id][hash] = ele;
    }
    else if (cp.$elements[id][hash] !== ele) {
      cp.$elements[id][hash] = ele;
    }
  }
  else {
    if (cp.$elements[id] && (cp.$elements[id] !== ele)) {
      //bbn.fn.log("HHHH", this, "OLD", cp.$elements[id], "NEW", ele);
      removeDOM(cp, cp.$elements[id]);
      cp.$elements[id] = ele;
    }
    else if (cp.$elements[id] !== ele) {
      cp.$elements[id] = ele;
    }
  }
}