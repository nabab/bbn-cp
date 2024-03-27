import bbnData from "../Data.js";

/**
 * Identifies all components impacted by changes to a given data key.
 * This method traverses the component's data reference tree to build a list of affected components
 * and the path to the changed data within those components.
 * 
 * @param {string} key - The data key whose impact is being assessed. This could be the name of a property or path within the data object.
 * @returns {Array} - An array of objects, each containing a component (`cp`) and the path (`path`) to the affected data within that component.
 */
bbnData.prototype.getImpacted = function(key) {
  const seq = []; // Initialize an array to hold the sequence of keys leading to the impacted data.
  if (key) {
    seq.push(key); // If a specific key is being checked, start the sequence with it.
  }
  const res = []; // Initialize an array to collect the impact results.

  // Iterate over each reference to this data object within components.
  bbn.fn.each(this.refs, it => {
    let bits = seq.slice(); // Create a copy of the initial key sequence.
    bits.unshift(it.path); // Prepend the current reference's path to the sequence.

    // If the current data object has a parent, recursively identify impacts in the parent's context.
    if (it.parent) {
      let all = it.parent.getImpacted();
      bbn.fn.each(all, a => {
        // For each impacted path in the parent, concatenate it with the current path and add to results.
        res.push({
          cp: it.component, // The impacted component.
          path: a.path.concat(bits) // The full path to the impacted data within the component.
        });
      });
    }
    else {
      // If there's no parent, this is a direct impact on the current component.
      res.push({
        cp: it.component, // The directly impacted component.
        path: bits // The path to the impacted data within the component.
      });
    }
  });

  return res; // Return the list of impacted components and paths.
};
