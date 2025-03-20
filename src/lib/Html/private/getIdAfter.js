/**
 * Retrieves the string of the ID used after the given one, at the same level
 * 
 * @param {HTMLElement} cp - The component instance from which we fetch the ID.
 * @param {string} id - The id of the origin element.
 * @returns {string|null} The id of the element after the one with the given id, null otherwise.
 */
export default function getIdAfter(cp, id) {
  bbn.fn.checkType(cp, HTMLElement, "No component in getIdAfter");
  bbn.fn.checkType(id, String, "Incorrect id in getIdAfter");

  // Ensures that the ID exists
  if (!cp.$currentMap[id]) {
    throw new Error(bbn._("The ID is invalid in getIdAfter for %s", cp.$options.name));
  }

  const bits = id.split("-");
  let last = parseInt(bits.pop());
  let numEmpty = 0;
  while (numEmpty < 5) {
    last++;
    if (cp.$currentMap[bits.join("-") + "-" + last]) {
      return bits.join("-") + "-" + last;
    }

    numEmpty++;
  }

  return null;
}
