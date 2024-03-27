import bbnCp from "../Cp.js";
import setProp from "../private/setProp.js";
import setUpData from "../private/setUpData.js";

/**
 * Sets the given property on the given object using static method
 * @param {Object} obj 
 * @param {String} prop 
 * @param {*} value 
 * @param {Boolean} writable 
 * @param {Boolean} configurable 
 * @returns 
 */
bbnCp.prototype.$set = function (obj, prop, value, writable = true, configurable = true) {
  // Case where it's the prop or data of a component
  if (bbn.cp.isComponent(obj)) {
    //  It already exists
    if (obj.$namespaces[prop]) {
      // New treated value
      const dataObj = obj.$treatValue(value, prop);
      // The value is different
      if (!bbn.fn.isSame(dataObj, obj[prop])) {
        // It's a prop
        if (obj.$namespaces[prop] === 'props') {
          setProp(obj, prop, value);
        }
        // It's a data
        else {
          obj[prop] = value;
        }
      }
    }
    // Creating a new data
    else {
      setUpData(obj, prop, value);
    }
  }
  else {
    // Creating or updating if possible a property to the given object
    Object.defineProperty(obj, prop, {
      value,
      writable,
      configurable
    });
  }

  return this;
}