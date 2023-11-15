import bbnCp from "../Cp.js";


/**
 * Adds the given name to the list of unknown components
 * @param {String} name
 * @returns {Boolean}
 */
bbnCp.prototype.$addUnknownComponent = function (name) {
  if ((name.indexOf('-') > 0) && !bbn.cp.known.includes(name) && !this.$root.$unknownComponents.includes(name)) {
    this.$root.$unknownComponents.push(name);
    return true;
  }

  return false;
}
