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
      if (!this.refs.length) {
        this.unset();
      }
      else {
        throw Error("The component is not in the list of components");
      }
    }
    else {
      if (this.refs[idx].root) {
        this.unset();
      }
      else {
        this.refs.splice(idx, 1);
        if (!bbn.fn.count(this.refs, {component})) {
          let idx = component.$values.indexOf(this.id);
          if (idx !== -1) {
            component.$values.splice(idx, 1);
          }
        }
      }
    }

  }
  else {
    if (this.refs.length === 1) {
      this.unset();
    }
    else if (this.refs.filter(a => (a.component === component) && (a.root === true)).length) {
      this.unset();
    }
    else {
      const idx = bbn.fn.search(this.refs, {component});
      if (idx === -1) {
        throw Error("The component is not in the list of components");
      }
      else {
        this.refs.splice(idx, 1);
        if (!bbn.fn.count(this.refs, {component})) {
          let idx = component.$values.indexOf(this.id);
          if (idx === -1) {
            throw Error("Bha on remove component")
          }
          else {
            component.$values.splice(idx, 1);
          }
        }
      }
    }
  }
}
