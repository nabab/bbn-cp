import bbn from '@bbn/bbn';
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
export default function setExpResult(cp, attr, hash, data, force) {
  const r = cp.$expResults;
  // Ensure the existence of a result object for the given name.
  if (!r[attr.hash]) {
    r[attr.hash] = bbn.fn.createObject();
  }

  // Default the hash to '_root' if not provided.
  if (!hash) {
    hash = '_root';
  }

  if (!r[attr.hash][hash] || force || (r[attr.hash][hash].num <= cp.$numBuild)) {
    const v = () => {
      const args = attr.args ? attr.args.map(a => {
        let res;
        try {
          // Process each argument using treatArgument.
          res = treatArgument(cp, a, hash, data);
        }
        catch(e) {
          // Log and rethrow any errors encountered during argument processing.
          bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, cp, hash, attr, data]);
          throw Error(e.message + ' (' + bbn._("Expression") + ': ' + attr.exp + ')');
        }
    
        return res; // Return the processed argument.
      }) : [];

      return attr.fn.bind(cp)(...args);
    };
    bbnData.startWatching();
    const expValue = v();
    const sequence = bbnData.stopWatching();
    for (let i = 0; i < sequence.length; i++) {
      let a = sequence[i];
      if (a.data instanceof bbnData) {
        if (!a.data.deps.includes(this)) {
          a.data.deps.push(this);
        }

        if (!a.cp.$deps.__bbnDataRegister.has(a.data.id)) {
          a.cp.$deps.__bbnDataRegister.set(a.data.id, this);
        }
      }
      else {
        if (!a.cp.$deps[a.name]) {
          a.cp.$deps[a.name] = [];
        }

        if (!a.cp.$deps[a.name].includes(this)) {
          a.cp.$deps[a.name].push(this);
        }
      }
    }

    // If the result for the given name and hash doesn't exist, create it.
    if (!r[attr.hash][hash]) {
      r[attr.hash][hash] = bbn.fn.createObject({
        state: 'NEW', // Mark the state as new.
        value: expValue,   // Set the provided result.
        old: bbnData.hash(expValue), // Store a hash of the value for comparison purposes.
      });
      cp.$tick();
    }
    // If the existing state is 'DEL', update the value and mark as new.
    else if (r[attr.hash][hash].state === 'DEL') {
      r[attr.hash][hash].value = expValue;
      r[attr.hash][hash].state = 'NEW';
      cp.$tick();
    }
    // If the state is 'TMP', update the value and determine if it has been modified.
    else if (r[attr.hash][hash].state === 'TMP') {
      r[attr.hash][hash].value = expValue;
      const _o = bbnData.hash(expValue);
      // Check if the value has changed since the last update.
      if (!bbn.fn.isSame(r[attr.hash][hash].old, _o)) {
        r[attr.hash][hash].state = 'MOD'; // Modified state.
        // Update the old hash to the current hash.
        r[attr.hash][hash].old = _o;
        cp.$tick();
      }
      else {
        r[attr.hash][hash].state = 'OK'; // Unchanged state.
      }

    }

    if (!force) {
      r[attr.hash][hash].num = cp.$numBuild + 1;
    }
    //r[attr.hash][hash].dependencies = dependencies;
  }

  // Return the updated result value.
  return r[attr.hash][hash].value;
}
