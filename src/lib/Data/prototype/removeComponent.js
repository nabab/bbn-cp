import bbnData from "../../Data.js";

/**
 * Removes a component from the data object
 * @param {bbnCp} component 
 */
bbnData.prototype.removeComponent = function(component, path) {
  //bbn.fn.log(`REMOVING ${path} FROM ${component.$options.name}`)
  if (!(component instanceof bbnCp)) {
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
      bbn.fn.warning(`The component ${component.$options.name} with path ${path} is not in the list of references`);
      //throw new Error(`The component ${component.$options.name} with path ${path} is not in the list of references`);
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
  else if (this.root === component) {
    this.unset();
  }
  else {
    const search = {component};
    let idx;
    while ((idx = bbn.fn.search(this.refs, search)) > -1) {
      this.refs.splice(idx, 1);
    }

    if (!this.refs.length)  {
      this.unset();
    }
  }
}
