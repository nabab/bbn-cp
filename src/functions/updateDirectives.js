/**
 * Updates the given directives to the target element
 * @param {Object} directives
 * @param {HTMLElement} target
 */
export default function updateDirectives(directives, target) {
  if (bbn.fn.isObject(directives)
    && Object.keys(directives).length
  ) {
    bbn.fn.iterate(directives, (dir, name) => {
      // Check if the "updated" function exists on this directive
      if (bbn.fn.isFunction(bbn.cp.directives[name].update)
        // Check if the value of the directive has changed
        && !bbn.fn.isSame(dir.value, dir.oldValue)
      ) {
        // Set the "lastUpdate" property
        dir.lastUpdate = bbn.fn.dateSQL();
        // Call the "updated" function of the directive
        bbn.cp.directives[name].update(target, dir);
      }
    })
  }
}
