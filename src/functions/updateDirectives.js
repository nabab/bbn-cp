/**
 * Updates the given directives to the target element.
 * 
 * This function is designed to update directives on a specified target element. 
 * It iterates through each directive, checks if there's an associated update 
 * function and if the directive's value has changed since the last update, 
 * and then calls the update function. 
 * This is typically part of a reactive system where directives need to respond 
 * to changes in data or state. The function ensures that each directive is updated 
 * as needed, reflecting any changes in the state or properties it's bound to.
 * 
 * @param {Object} directives - An object containing the directives to be updated.
 * @param {HTMLElement} target - The DOM element to which the directives are applied.
 */
export default function updateDirectives(directives, target) {
  // Check if directives object is valid and has properties.
  if (bbn.fn.isObject(directives) && Object.keys(directives).length && target.parentNode) {
    // Iterate over each directive.
    bbn.fn.iterate(directives, (dir, name) => {
      // Check if an 'update' function exists for the directive and if the value has changed.
      if (bbn.fn.isFunction(bbn.cp.directives[name].update) &&
          !bbn.fn.isSame(dir.value, dir.oldValue)) {

        // Update the 'lastUpdate' property of the directive.
        dir.lastUpdate = bbn.fn.dateSQL();

        // Call the 'update' function of the directive with the target element and directive info.
        bbn.cp.directives[name].attrUpdate(target, dir);
      }
    });
  }
}
