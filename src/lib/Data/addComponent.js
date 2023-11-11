import bbnData from "../Data.js";

/**
 * Adds a component to the original bbnData object linked to it
 * @param {bbnCp} component 
 * @param {String} path 
 * @returns {Boolean}
 */
bbnData.prototype.addComponent = function(component, path, parent) {
  if (!(component instanceof bbnCp)) {
    throw new Error(bbn._("bbnData hasComponent must be called with a bbn component"));
  }

  if (!bbn.fn.count(this.refs, {component, path})) {
    this.refs.unshift({
      component,
      path,
      parent
    });
  }

  if (!component.$values.includes(this.id)) {
    component.$values.push(this.id);
  }
};
