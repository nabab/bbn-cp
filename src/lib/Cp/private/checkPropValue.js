import bbn from "@bbn/bbn";

/**
 * Validates the value of a property against the provided configuration.
 * 
 * @param {Object} cp - The component instance.
 * @param {string} name - The name of the property to check.
 * @param {Object} cfg - Configuration object for the property, including type, default value, etc.
 * @param {*} value - The value to be validated against the property's configuration.
 * @returns {*} The validated value of the property.
 * @throws {Error} Throws an error if the property configuration is missing, 
 *                 if default value for an object is not returned by a function, 
 *                 if the property is required but not defined or has an invalid value, 
 *                 if the property value is of the wrong type, 
 *                 or if the property fails custom validation.
 */
export default function checkPropValue(cp, name, cfg, value) {
  // Checking if the property configuration exists.
  if (!cfg) {
    throw Error(bbn._("The property %s is not defined in component %s", name, cp.$options.name));
  }

  // Determining if the property is explicitly defined in the component's data.
  let isDefined = Object.hasOwn(cp.$options.propsData, name) && (cp.$options.propsData[name] !== undefined);
  let v = undefined;

  // If a value is provided, use it and mark the property as defined.
  if (value !== undefined) {
    v = value;
    isDefined = true;
  }
  // If not provided, use the value from the component's data if it exists.
  else if (isDefined) {
    v = cp.$options.propsData[name];
  }

  // Handling default values for properties not set and not in the building process.
  if (!cp.$numBuild && !isDefined && (cfg.default !== undefined)) {
    // Ensuring that default object values are returned by a function.
    if (bbn.fn.isObject(cfg.default) || bbn.fn.isArray(cfg.default)) {
      throw Error(bbn._("A function must be used to return object default values in %s", name));
    }

    // Assigning default value; if it's a function, execute the function to get the value.
    v = bbn.fn.isFunction(cfg.default) ? cfg.default.bind(cp)() : cfg.default;
    isDefined = true;
  }

  // Check if the property is required and not properly defined or has an empty value.
  if (cfg.required && (!isDefined || [null, undefined, ''].includes(v))) {
    throw Error(bbn._("The property %s is required in component %s", name, cp.$options.name));
  }

  // Type checking for the property value.
  if (cfg.type && isDefined && ![null, undefined, ''].includes(v)) {
    bbn.fn.checkType(v, cfg.type, bbn._("Wrong type for %s in component %s", name, cp.$options.name));
  }

  // Custom validation for the property.
  if (isDefined && bbn.fn.isFunction(cfg.validator) && !cfg.validator(v)) {
    bbn.fn.log("GIVEN VALUE", v);
    throw Error(bbn._("The property %s is invalid in component %s", name, cp.$options.name));
  }

  // Returning the validated value.
  return v;
}
