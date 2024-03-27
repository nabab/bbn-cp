/**
 * Adds or updates the given element to the $elements object property
 * 
 * @param {Symbol} id The ID of the element, based on the template
 * @param {HTMLElement, Text} ele The HTML element to be added
 * @param {String} hash The loop hash if any
 * @param {Number} index The loop index if any
 * @returns {undefined}
 */
export default function removeFromElements(cp, id, hash) {
  bbn.fn.checkType(id, ['string', 'symbol'], "In removeFromElements the ID should be a symbol");
  if (hash) {
    const row = cp.$elements[id];
    if (row) {
      delete cp.$elements[id][hash];
    }
    else{
      bbn.fn.log(["HASH BUT NO ROW IN " + cp.$options.name, id, hash, cp.$elements[id]]);
    }
  }
  else {
    delete cp.$elements[id];
  }
}