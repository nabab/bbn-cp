import bbnCp from "../Cp.js";

/**
 * Adds or updates the given element to the $elements object property
 * 
 * @param {Symbol} id The ID of the element, based on the template
 * @param {HTMLElement, Text} ele The HTML element to be added
 * @param {String} hash The loop hash if any
 * @param {Number} index The loop index if any
 * @returns {undefined}
 */
bbnCp.prototype.$addToElements = function (ele) {
  bbn.fn.checkType(ele, [HTMLElement, Text, Comment, SVGElement], "Elements should be HTML elements or text nodes");
  bbn.fn.checkType(ele.bbnId, ['string', 'symbol'], "In addToElements the ID should be a symbol");
  const id = ele.bbnId;
  const hash = ele.bbnHash;
  const origin = ele.bbnComponentId;
  let cp = this;
  if (origin !== this.$cid) {
    cp = bbn.cp.getComponent(origin).bbn;
  }

  if (hash) {
    if (!cp.$elements[id]) {
      cp.$elements[id] = bbn.fn.createObject();
    }

    if (cp.$elements[id][hash] && (cp.$elements[id][hash] !== ele)) {
      cp.$removeDOM(cp.$elements[id][hash]);
      cp.$elements[id][hash] = ele;
    }
    else if (cp.$elements[id][hash] !== ele) {
      cp.$elements[id][hash] = ele;
    }
  }
  else {
    if (cp.$elements[id] && (cp.$elements[id] !== ele)) {
      //bbn.fn.log("HHHH", this, "OLD", cp.$elements[id], "NEW", ele);
      cp.$removeDOM(cp.$elements[id]);
      cp.$elements[id] = ele;
    }
    else if (cp.$elements[id] !== ele) {
      cp.$elements[id] = ele;
    }
  }
}