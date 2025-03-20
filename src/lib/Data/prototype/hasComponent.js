import bbnData from "../Data.js";

/**
 * 
 * @param {HTMLElement} component 
 * @returns 
 */
bbnData.prototype.hasComponent = function(component, path) {
  if (!(component instanceof HTMLElement)) {
    throw new Error("bbnData hasComponent must be called with a bbn component");
  }

  return !!bbn.fn.count(this.refs, {component, path});
}
