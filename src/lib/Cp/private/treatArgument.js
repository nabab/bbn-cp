import bbn from "@bbn/bbn";

/**
 * Processes an argument for a function call within the context of a web component.
 * It attempts to resolve the argument's value from the component's current results,
 * provided data, or the component's properties and methods.
 * 
 * @param {bbnCp} cp - The context provider (component instance) containing methods and properties.
 * @param {*} a - The argument to be processed. It can be a string identifier or any other type.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {Object} data - Additional data that might be required for processing the argument.
 * @returns {*} The resolved value of the argument.
 * @throws {Error} Throws an error if the argument cannot be resolved.
 */
export default function treatArgument(cp, a, hash, data) {
  // Check if the argument is a key in the component's current results and the hash exists.
  if (hash && bbn.fn.isObject(cp.$expResults[a]) && Object.hasOwn(cp.$expResults[a], hash)) {
    // Return the value from the component's current results.
    return cp.$expResults[a][hash].value;
  }
  // Check if the argument is a key in the provided data.
  else if (Object.hasOwn(data || {}, a)) {
    // Return the value from the provided data.
    return data[a];
  }
  // Check if the argument corresponds to a function in the component.
  else if (bbn.fn.isFunction(cp[a])) {
    // Return the function bound to the component's context.
    return cp[a].bind(cp);
  }
  // Check if the component has a property or method with the given argument name.
  else if (cp.$has(a)) {
    // Return the property or method from the component.
    return cp[a];
  }
  // If none of the above conditions are met, throw an error.
  else {
    bbn.fn.log([hash, data]);
    throw new Error(bbn._("Impossible to find the argument %s in component %s", a, cp.$options.name));
  }
}
