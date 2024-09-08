import treatArgument from './treatArgument.js';

/**
 * Sets or updates the internal result for a given name and hash within the context of the component.
 * This method manages the state of the result, tracking changes and updates.
 * 
 * @param {string} attr.hash - The name associated with the result. Acts as a key in the results object.
 * @param {*} expValue - The result or value to be set or updated.
 * @param {string} [hash='_root'] - The hash associated with this result, defaults to '_root' if not provided.
 * @returns {*} The updated result value.
 */
export default function setConditionResult(cp, attr, expValue, hash, data) {
  const r = cp.$expResults;
  // Ensure the existence of a result object for the given name.
  if (!r[attr.id]) {
    r[attr.id] = bbn.fn.createObject();
  }

  // Default the hash to '_root' if not provided.
  if (!hash) {
    hash = '_root';
  }

  // If the result for the given name and hash doesn't exist, create it.
  if (!r[attr.id][hash]) {
    r[attr.id][hash] = bbn.fn.createObject({
      state: 'NEW', // Mark the state as new.
      value: expValue,   // Set the provided result.
      num: cp.$numBuild + 1, // Set the build number.
    });
  }
  else if (r[attr.id][hash].num <= cp.$numBuild) {
    // If the existing state is 'DEL', update the value and mark as new.
    if (r[attr.id][hash].state === 'DEL') {
      r[attr.id][hash].value = expValue;
      r[attr.id][hash].state = 'NEW';
      r[attr.id][hash].num = cp.$numBuild + 1;
    }
    // If the state is 'TMP', update the value and determine if it has been modified.
    else if (r[attr.id][hash].state === 'TMP') {
      r[attr.id][hash].num = cp.$numBuild + 1;
      // Check if the value has changed since the last update.
      if (r[attr.id][hash].value !== expValue) {
        r[attr.id][hash].state = 'MOD'; // Modified state.
        r[attr.id][hash].value = expValue;
        // Update the old hash to the current hash.
      }
      else {
        r[attr.id][hash].state = 'OK'; // Unchanged state.
      }

    }
  }

  // Return the updated result value.
  return r[attr.id][hash].value;
}
