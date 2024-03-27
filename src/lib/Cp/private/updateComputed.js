import updateWatcher from "./updateWatcher.js";
import propagateDependencyChanges from "./propagateDependencyChanges.js";

export default function updateComputed(cp, name, val) {
  // If the computed property does not exist in cp's options
  if (!cp.$computed[name]) {
    throw new Error(bbn._("The computed %s is not defined in %s", name, cp.$options.name));
  }

  //bbn.fn.log("UPDATING COMPUTED " + name + " IN " + cp.$options.name, val);

  // Calculate the hash of the new value
  const hash = bbnData.hash(val);
  // Get the old value and its hash from the computed property
  const oldValue = cp.$computed[name].val;
  const oldHash = cp.$computed[name].hash;
  // Flag to determine if the computed property needs to be updated
  let go = ((val !== oldValue) && !bbn.fn.isSame(oldHash, hash))
    || !bbn.fn.isSame(cp.$computed[name].hash, hash);

  if (go) {
    let isDifferent = false;

    // Get the new data object and the old data object
    let newData = bbnData.getObject(val);
    const oldData = bbnData.getObject(oldValue);

    // If the old value and new value are both arrays, and they're not the same but have the same path and root component
    if (bbn.fn.isArray(val, oldValue) && !newData && oldData && (oldData.root === cp) && (oldData.path === name)) {
      // If the old value and new value are not the same, update the old array with the values from the new array
      if (val !== oldValue) {
        isDifferent = true;
        bbn.fn.mutateArray(oldValue, val);
      }
    }
    // If the new value and old value are not the same
    else if (oldValue !== val) {
      isDifferent = true;
      // Remove the old data object from its component's list of data objects
      if (oldData && oldData.hasComponent(cp, name)) {
        // bbn.fn.log('Removing 6 data for ' + cp.$cid + ' in ' + cp.$options.name + ' / path: ' + name);
        oldData.removeComponent(cp, name);
      }
      // Update the computed property's value and hash
      cp.$computed[name].old = oldValue;
      cp.$computed[name].val = cp.$treatValue(val, name);
      newData = bbnData.getObject(cp.$computed[name].val);
      // If there's a new data object, add it to its component's list of data objects
      if (newData) {
        newData.addComponent(cp, name);
      }
    }

    if (isDifferent) {
      cp.$computed[name].hash = hash;
      // If there's a new data object, update it
      if (newData) {
        newData.update();
      }
      // Update the computed property's watcher and propagate any dependency changes
      updateWatcher(cp, name, val);
      propagateDependencyChanges(cp, name);
      /*
      const done = [];
      // Iterate over all of the current components in cp's component map
      bbn.fn.iterate(cp.$currentMap, (node, id) => {
        // Check if this component has already been updated
        // If the component hasn't already been updated
        if (!done.includes(node)) {
          // Update the computed property in this component
          let c = node[name];
          if (c !== val) {
            // bbn.fn.log(["UPDATING COMPUTED " + name + " IN " + cp.$options.name, val, oldValue]);
            node[name] = val;
            // Add this component to the list of updated components
            done.push(node);
          }
        }
      });
      */
    }

    return true;
  }

  return false;
}
