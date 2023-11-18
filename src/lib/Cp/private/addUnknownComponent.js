/**
 * Adds the given name to the list of unknown components
 * @param {bbnCp} cp
 * @param {String} name
 * @returns {Boolean}
 */
export default function addUnknownComponent(cp, name) {
  if ((name.indexOf('-') > 0) && !bbn.cp.known.includes(name) && !cp.$root.$unknownComponents.includes(name)) {
    cp.$root.$unknownComponents.push(name);
    return true;
  }

  return false;
}
