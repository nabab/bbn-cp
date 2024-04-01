import bbnData from "../Data.js";

/**
 * 
 * @param {bbnCp} component 
 * @returns 
 */
bbnData.prototype.hasComponent = function(component, path) {
  if (!(component instanceof bbnCp)) {
    throw Error("bbnData hasComponent must be called with a bbn component");
  }

  return !!bbn.fn.count(this.refs, {component, path});
}
