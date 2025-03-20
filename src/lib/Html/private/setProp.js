import realSetProp from "./realSetProp.js";
import checkPropValue from "./checkPropValue.js";

/**
 * Sets a property value on a given component, performing necessary checks and transformations.
 *
 * @param {Object} cp - The component on which the property is to be set.
 * @param {string} name - The name of the property. It will be camelized if not already.
 * @param {*} value - The value to be set for the property.
 * @returns {void} This function doesn't explicitly return a value but sets the property on the component.
 * @throws {Error} Throws an error if the validation in `checkPropValue` fails.
 */
export default function setProp(cp, name, value) {
  // Convert the property name to camelCase if it's not already.
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  // Retrieve the configuration for the specified property.
  const cfg = cp.$cfg.props[name];

  // Check if the property is a standard one or starts with 'bbn'. If not, issue a warning.
  if (!cp.$el.constructor.bbnFn.acceptedAttributes.includes(name) && (name.indexOf('bbn') !== 0)) {
    bbn.fn.warning(bbn._("The attribute %s in %s is not a property", name, cp.$options.name));
    return;
  }

  // Check if the property is defined in the component. If not, issue a warning.
  if (!Object.hasOwn(cp.$props, name)) {
    bbn.fn.warning(bbn._("The attribute %s in %s is not defined", name, cp.$options.name));
    return;
  }

  // Validate the property value against its configuration.
  let v = checkPropValue(cp, name, cfg, value);

  // If the validated value is the same as the current value, no further action is needed.
  if (v === cp[name]) {
    return;
  }

  //bbn.fn.log(["REAL SET PROP", v, name])

  // Set the property with the validated value.
  realSetProp(cp, name, v);
}
