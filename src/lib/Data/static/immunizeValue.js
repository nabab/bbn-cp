import bbnData from "../Data.js";

/**
 * Add a special property to an object in order to prevent it from being reactive
 * @param {Object} value The value to immunize
 * @returns {Object} The immunized value
 */
bbnData.immunizeValue = function(value, deep) {
  if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor)) {
    // Removing data object if any
    if (value.__bbnData) {
      const dataObj = value.__bbnData;
      if (dataObj) {
        value = dataObj.targetData;
        dataObj.unset();
      }
    }

    // Adding the special property
    Object.defineProperty(value, '__bbnNoData', {
      value: true,
      enumerable: false,
      configurable: false,
      writable: false
    });

    if (deep) {
      bbn.fn.iterate(value, (v, i) => {
        try {
          value[i] = this.immunizeValue(v, true);
        }
        catch (e) {
          bbn.fn.warning("ERROR IN IMMUNIZE");
          bbn.fn.log(e);
        }
      });
    }
  }
    

  return value;
}
