/**
 * Sets or updates the internal result for a given name and hash within the context of the component.
 * This method manages the state of the result, tracking changes and updates.
 * 
 * @param {string} _name - The name associated with the result. Acts as a key in the results object.
 * @param {*} _res - The result or value to be set or updated.
 * @param {string} [_hash='_root'] - The hash associated with this result, defaults to '_root' if not provided.
 * @returns {*} The updated result value.
 */
export default function setInternalResult(cp, _name, _res, _hash) {
  // Ensure the existence of a result object for the given name.
  if (!cp.$currentResult[_name]) {
    cp.$currentResult[_name] = bbn.fn.createObject();
  }

  // Default the hash to '_root' if not provided.
  if (!_hash) {
    _hash = '_root';
  }

  // If the result for the given name and hash doesn't exist, create it.
  if (!cp.$currentResult[_name][_hash]) {
    cp.$currentResult[_name][_hash] = bbn.fn.createObject({
      state: 'NEW', // Mark the state as new.
      value: _res   // Set the provided result.
    });
    // Store a hash of the value for comparison purposes.
    cp.$currentResult[_name][_hash].old = bbnData.hash(cp.$currentResult[_name][_hash].value);
  }
  // If the existing state is 'DEL', update the value and mark as new.
  else if (cp.$currentResult[_name][_hash].state === 'DEL') {
    cp.$currentResult[_name][_hash].value = _res;
    cp.$currentResult[_name][_hash].state = 'NEW';
  }
  // If the state is 'TMP', update the value and determine if it has been modified.
  else if (cp.$currentResult[_name][_hash].state === 'TMP') {
    cp.$currentResult[_name][_hash].value = _res;
    const _o = bbnData.hash(cp.$currentResult[_name][_hash].value);
    // Check if the value has changed since the last update.
    if (!bbn.fn.isSame(cp.$currentResult[_name][_hash].old, _o)) {
      cp.$currentResult[_name][_hash].state = 'MOD'; // Modified state.
    }
    else {
      cp.$currentResult[_name][_hash].state = 'OK'; // Unchanged state.
    }

    // Update the old hash to the current hash.
    cp.$currentResult[_name][_hash].old = _o;
  }

  // Return the updated result value.
  return cp.$currentResult[_name][_hash].value;
}
