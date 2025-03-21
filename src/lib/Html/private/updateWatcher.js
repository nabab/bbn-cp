import queueUpdate from "../../../functions/queueUpdate.js";

/**
 * Updates a watcher for a component property.
 * 
 * @param {HTMLElement} cp - The component object.
 * @param {string} name - The name of the property to watch.
 * @param {boolean} init - Whether this is an initial update.
 * @param {boolean} root - True for the main object.
 */
export default function updateWatcher(cp, name) {
  // If the component doesn't have a watcher, do nothing.
  if (!cp.$watcher || cp.$isDestroyed) {
    return;
  }

  let v;
  try {
    v = bbn.fn.getProperty(cp, name);
  }
  catch (e) {
    bbn.fn.log(["ERROR IN GETTING PROP IN WATCHER", cp, name, e]);
    return;
  }
  //bbn.fn.log(["INIT UPDATE WATCHER", cp.$options.name, name])
  // Initialize the level of nesting for the property name.
  let lev = 0;

  // Split the property name into its nested parts.
  const bits = name.split(".");
  // Iterate over each part of the property name.
  while (bits.length) {
    // Reconstruct the full property name from the current bits.
    let fullName = bits.join(".");
    // Log a message for debugging purposes (currently commented out).
    // bbn.fn.log("WATCHER ON " + fullName + " IN " + cp.$options.name);
    // Check if the watcher has a handler for this property.
    if (cp.$watcher[fullName]) {
      cp.$watcher[fullName].watcherUpdate(false, lev);
    }

    // Remove the last part of the property name for the next iteration.
    bits.pop();
    lev++;
  }
}