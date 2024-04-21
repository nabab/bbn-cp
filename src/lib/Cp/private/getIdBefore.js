/**
 * Retrieves the string of the ID used before the given one, at the same level
 * 
 * @param {bbnCp} cp - The component instance from which we fetch the ID.
 * @param {string} id - The id of the origin element.
 * @returns {string|null} The id of the element before the one with the given id, null otherwise.
 */
export default function getIdBefore(cp, id) {
  bbn.fn.checkType(cp, bbnCp, "No component in getIdBefore");
  bbn.fn.checkType(id, String, "Incorrect id in getIdBefore");

  // Ensures that the ID exists
  if (!cp.$currentMap[id]) {
    throw Error(bbn._("The ID is invalid in getIdBefore for %s", cp.$options.name));
  }

  const bits = id.split("-");
  let last = parseInt(bits.pop());
  while (last > 0) {
    last--;
    if (cp.$currentMap[bits.join("-") + "-" + last]) {
      return bits.join("-") + "-" + last;
    }
  }

  return null;
}
