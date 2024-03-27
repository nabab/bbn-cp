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
  if (!r[attr.hash]) {
    r[attr.hash] = bbn.fn.createObject();
  }

  // Default the hash to '_root' if not provided.
  if (!hash) {
    hash = '_root';
  }

  // If the result for the given name and hash doesn't exist, create it.
  if (!r[attr.hash][hash]) {
    r[attr.hash][hash] = bbn.fn.createObject({
      state: 'NEW', // Mark the state as new.
      value: expValue,   // Set the provided result.
      num: cp.$numBuild + 1, // Set the build number.
      old: bbnData.hash(expValue) // Store a hash of the value for comparison purposes.
    });
  }
  else if (r[attr.hash][hash].num <= cp.$numBuild) {
    // If the existing state is 'DEL', update the value and mark as new.
    if (r[attr.hash][hash].state === 'DEL') {
      r[attr.hash][hash].value = expValue;
      r[attr.hash][hash].state = 'NEW';
      r[attr.hash][hash].num = cp.$numBuild + 1;
    }
    // If the state is 'TMP', update the value and determine if it has been modified.
    else if (r[attr.hash][hash].state === 'TMP') {
      r[attr.hash][hash].value = expValue;
      r[attr.hash][hash].num = cp.$numBuild + 1;
      const _o = bbnData.hash(expValue);
      // Check if the value has changed since the last update.
      if (!bbn.fn.isSame(r[attr.hash][hash].old, _o)) {
        r[attr.hash][hash].state = 'MOD'; // Modified state.
        // Update the old hash to the current hash.
        r[attr.hash][hash].old = _o;
      }
      else {
        r[attr.hash][hash].state = 'OK'; // Unchanged state.
      }

    }
  }

  // Return the updated result value.
  return r[attr.hash][hash].value;
}
