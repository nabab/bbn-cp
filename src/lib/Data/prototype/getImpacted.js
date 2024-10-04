import data from "../../../mixins/data.js";
import bbnData from "../Data.js";

/**
 * Identifies all components impacted by changes to a given data key.
 * This method traverses the component's data reference tree to build a list of affected components
 * and the path to the changed data within those components.
 * 
 * @param {Array} path - The data key whose impact is being assessed. This could be the name of a property or path within the data object.
 * @returns {Array} - An array of objects, each containing a component (`cp`) and the path (`path`) to the affected data within that component.
 */
bbnData.prototype.getImpacted = function(path, numTicks, level = 0) {
  // Initialize an array to hold the sequence of keys leading to the impacted data.
  const seq = [];
  // Initialize an array to collect the impact results.
  const res = [];

  if (path !== undefined) {
    seq.push(path);
  }



  // Iterate over each reference to this data object within components.
  this.refs.forEach(it => {
    // Create a copy of the initial key sequence.
    let bits = seq.slice(); 
    // Prepend the current reference's path to the sequence.

    // If the current data object has a parent, recursively identify impacts in the parent's context.
    if (it.parent) {
      if (it.parent.lastUpdate < numTicks) {
        it.parent.lastUpdate = bbn.cp.numTicks;
      }

      const impacted = it.parent.getImpacted(it.path, numTicks, level + 1);
      impacted.forEach(a => {
        a.path.push(...bits);
      });
      res.push(...impacted);
    }
    else {
      res.push({
        // The directly impacted component.
        component: it.component,
        // The path to the impacted data within the component.
        path: [it.path, ...bits],
        level
      });
    }
  });

  // Return the list of impacted components and paths.
  return res; 
};
