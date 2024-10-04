import bbnData from "../Data.js";

/**
 * Determines whether a piece of data is part of a computed data property.
 * 
 * @param {bbnCp} cp - The component whose data references are being assessed.
 * @param {Array} name - The data key for the computed we're looking for.
 * @returns {Array} - An array of objects, each containing a component (`cp`) and the path (`path`) to the affected data within that component.
 */
bbnData.prototype.hasParent = function(cp, name) {
  // Iterate over each reference to this data object within components.
  let hasParent = false;
  for (let i = 0; i < this.refs.length; i++) {
    const it = this.refs[i];
    if (!it.parent && (it.component === cp) && (it.path === name)) {
      hasParent = true;
    }
    else if (it.parent) {
      hasParent = it.parent.hasParent(cp, name);
    }

    if (hasParent) {
      return false;
    }
  }

  return hasParent;
};
