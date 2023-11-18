import bbnCp from "../Cp.js";
import setProp from "./private/setProp.js";
import setUpData from "./private/setUpData.js";

/**
 * Sets the given property on the given cpect using static method
 * @param {bbnCp} cp 
 * @param {String} prop 
 * @param {*} value 
 * @param {Boolean} writable 
 * @param {Boolean} configurable 
 * @returns 
 */
bbnCp.prototype.$set = function (cp, prop, value, writable = true, configurable = true) {
  // Case where it's the prop or data of a component
  if (bbn.cp.isComponent(cp)) {
    //  It already exists
    if (cp.$namespaces[prop]) {
      // New treated value
      const dataObj = cp.$treatValue(value, prop);
      // The value is different
      if (!bbn.fn.isSame(dataObj, cp[prop])) {
        // It's a prop
        if (cp.$namespaces[prop] === 'props') {
          setProp(cp, prop, value);
        }
        // It's a data
        else {
          cp[prop] = value;
        }
      }
    }
    // Creating a new data
    else {
      setUpData(cp, prop, value);
    }
  }
  else {
    // Creating or updating if possible a property to the given cpect
    Object.defineProperty(cp, prop, {
      value,
      writable,
      configurable
    });
  }

  return this;
}