import bbnData from "../Data.js";

/**
 * Removes a component from the data object
 * @param {HTMLElement} component 
 */
bbnData.prototype.removeComponent = function(component, path) {
  if (!(component instanceof HTMLElement)) {
    throw new Error("bbnData hasComponent must be called with a bbn component");
  }

  if (typeof path === 'number') {
    path = path.toString();
  }

  if (this.revoked) {
    return;
  }

  if (path !== undefined) {
    const idx = bbn.fn.search(this.refs, {component, path});
    if (idx === -1) {
      // Normal if it happens: replaced elements are removed before replacing
      return;
    }
    else {
      if (this.refs[idx].root) {
        this.unset();
      }
      else {
        if (!idx) {
          this.unset();
        }
        else {
          this.refs.splice(idx, 1);
        }
      }
    }
  }
  else if (this.root === component) {
    this.unset();
  }
  else {
    this.refs = this.refs.filter(b => b.component !== component);
    if (!this.refs.length)  {
      this.unset();
    }
  }
}
