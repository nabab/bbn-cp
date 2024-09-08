/**
 * Retrieves the string of the ID used after the given one, at the same level
 * 
 * @param {bbnCp} cp - The component instance from which we fetch the ID.
 * @param {string} id - The id of the origin element.
 * @returns {string|null} The id of the element after the one with the given id, null otherwise.
 */
export default function getIdParent(cp, id) {
  bbn.fn.checkType(cp, bbnCp, "No component in getIdParent");
  bbn.fn.checkType(id, String, "Incorrect id in getIdParent");

  // Ensures that the ID exists
  if (!cp.$currentMap[id]) {
    throw Error(bbn._("The ID is invalid in getIdParent for %s", cp.$options.name));
  }

  const bits = id.split("-");
  bits.pop();
  return bits.length ? bits.join("-") : null;
}
