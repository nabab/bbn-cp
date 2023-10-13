/**
 * Inserts the given directives to the target element
 * @param {Object} directives
 * @param {HTMLElement} target
 */
export default function insertDirectives(directives, target) {
  if (bbn.fn.isObject(directives)
    && Object.keys(directives).length
  ) {
    bbn.fn.iterate(directives, (dir, name) => {
      // Check if the directive has not already been initialized on target element
      if (!dir.inserted) {
        // Check if the "inserted" function exists on this directive
        if (bbn.fn.isFunction(bbn.cp.directives[name].inserted)) {
          // Set the directive as initialized
          dir.inserted = true;
          // Initialize the directive
          bbn.cp.directives[name].inserted(target, dir);
        }
      }
    });
  }
}
