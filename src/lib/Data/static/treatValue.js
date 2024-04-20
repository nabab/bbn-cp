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

  if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor) && !value.__bbnNoData) {
    if (value.__bbnData) {
      const dataObj = this.retrieve(value.__bbnData);
      if (!dataObj) {
        bbn.fn.log(value);
        bbn.fn.warning(bbn._("The data inventory does not contain the data object"));
        throw Error(bbn._("The data inventory does not contain the data object"));
      }

      dataObj.addComponent(component, path, parent);

      return dataObj.value;
    }

    if (value.__bbnComponent) {
      throw Error(bbn._("The data object is a component definition"));
    }

    const dataObj = new bbnData(value, component, path, parent);

    return dataObj.value;
  }

  return value;
}
