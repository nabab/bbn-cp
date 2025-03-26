import bbnData from "../Data.js";

/**
 * Creates a new bbnData object if the given value is not primitive or already reactive, returns the value
 * @param {*} value 
 * @param {*} component 
 * @param {*} path 
 * @param {*} parent 
 * @returns {*} The original value or the reactive value
 */
bbnData.treatValue = function(value, component, path, parent) {
  if (component.$isDestroyed) {
    return value;
  }  

  const hasStarted = this.watchStarted;
  if (hasStarted) {
    this.watchStarted = false;
  }

  if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor) && !value.__bbnNoData) {
    // Will remove from the sequence the subsequent calls to the data
    let dataObj;
    if (value.__bbnData) {
      dataObj = value.__bbnData;
      dataObj.addComponent(component, path, parent);
    }
    else {
      dataObj = new bbnData(value, component, path, parent);
    }

    value = dataObj.value;
    if (value.__bbnComponent) {
      throw new Error(bbn._("The data object is a component definition"));
    }
  }

  if (hasStarted) {
    this.watchStarted = true;
  }

  return value;
}
