import bbnData from "../Data.js";

/**
 * Removes a component from the data object
 * @param {bbnCp} component 
 */
bbnData.prototype.removeComponent = function(component, path) {
  if (!(component instanceof bbnCp)) {
    throw Error("bbnData hasComponent must be called with a bbn component");
  }

  if (path) {
    const idx = bbn.fn.search(this.refs, {component, path});
    if (idx === -1) {
      throw Error("The component is not in the list of components");
    }
    else {
      if (this.refs[idx].root) {
        this.unset();
      }
      else {
        this.refs.splice(idx, 1);
        if (!this.refs.length) {
          this.unset();
        }
      }
    }

  }
  else {
    if (this.refs.filter(a => (a.component === component) && (a.root === true)).length) {
      this.unset();
    }
    else {
      const search = {component};
      if (path !== undefined) {
        search.path = path;
      }

      const idx = bbn.fn.search(this.refs, search);
      if (idx === -1) {
        throw Error("The component is not in the list of components");
      }
      else {
        this.refs.splice(idx, 1);
        if (!this.refs.length)  {
          this.unset();
        }
      }
    }
  }
}
