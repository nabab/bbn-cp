import bbnAttr from "../Attr.js";

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
bbnAttr.prototype.retrieveArgument = function(a, hash, dataArr) {
  const cp = this.node.component;
  let done = false;
  let v;
  const varName = bbn.fn.firstVarElement(a);
  // Check if the argument is a key in the provided data.

  bbn.fn.each(dataArr, data => {
    if (!done) {
      if (data && ((data[varName] !== undefined) || Object.hasOwn(data, varName))) {
        // Return the value from the provided data.
        done = true;
        v = data[varName];
      }
    }
  });
  if (done) {
    return v;
  }

  // Check if the argument corresponds to a function in the component.
  if (bbn.fn.isFunction(cp[a])) {
    // Return the function bound to the component's context.
    done = true;
    v = cp[a].bind(cp);
  }
  // Check if the component has a property or method with the given argument name.
  else if (cp.$has(a)) {
    // Return the property or method from the component.
    done = true;
    v = cp[a];
  }
  // Check if the argument is a key in the component's current results
  else {
    const row = bbn.fn.getRow(this.node.attributes, {id: a});
    if (row) {
      bbn.fn.log("FOUND")
      v = row.attrGetValue();
      done = true;
    }
  }

  // If none of the above conditions are met, throw an error.
  if (!done) {
    bbn.fn.log([hash, data]);
    throw new Error(bbn._("Impossible to find the argument %s in component %s", a, cp.$options.name));
  }

  return v;
};
