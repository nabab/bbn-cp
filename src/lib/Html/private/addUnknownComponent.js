/**
 * Adds the given component name to the list of unknown components if it's not already known or listed as unknown.
 *
 * @param {HTMLElement} cp - The component instance where the unknown component is encountered.
 * @param {String} name - The name of the component to be added to the unknown list.
 * @returns {Boolean} - Returns true if the component name was added to the list, otherwise false.
 */
export default function addUnknownComponent(cp, name) {
  bbn.fn.checkType(cp, HTMLElement, "No component in addUnknownComponent");
  bbn.fn.checkType(name, String, "Incorrect name in addUnknownComponent");
  // Check if the component name contains a hyphen, is not already known, and is not already listed as unknown.
  if ((name !== 'bbn-anon') && (name.indexOf('-') > 0) && !bbn.cp.known.includes(name) && !bbn.cp.unknown.includes(name)) {
    // Add the component name to the list of unknown components at the root level of the component tree.
    bbn.cp.unknown.push(name);
    //bbn.fn.log("ADD " + name);
    return true; // Indicate that the name was successfully added.
  }

  return false; // Indicate that the name was not added (already known or listed as unknown).
}
