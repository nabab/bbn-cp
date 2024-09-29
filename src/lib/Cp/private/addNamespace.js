/**
 * Check if there is no conflict between attributes/methods and
 * add list all the public methods and attributes that can be used by the component
 * 
 * @param {bbnCp} cp - The component instance to which the namespace is being added.
 * @param {string} name - The name of the property or method being added to the namespace.
 * @param {string} type - The type of the namespace being added (e.g., 'prop', 'method').
 */
export default function addNamespace(cp, name, type) {
  if (!(cp instanceof bbnCp)) {
    throw new Error("No component in addNamespace");
  }
  if (!name || (typeof name !== 'string')) {
    throw new Error("Incorrect name in addNamespace");
  }
  if (!type || (typeof type !== 'string')) {
    throw new Error("Incorrect type in addNamespace");
  }

  // Checks if the name is among the list of reserved names in the bbn.var.reserved array
  if (bbn.var.reserved.includes(name)) {
    throw Error(bbn._("The name %s is reserved", name));
  }

  // Checks for namespace conflicts: if the namespace already exists and is of a different type
  if (cp.$namespaces[name] && (cp.$namespaces[name] !== type)) {
    // Logs the conflict details for debugging purposes
    bbn.fn.log([
      "The namespace already exists",
      "Component name: " + cp.$options.name,
      "Prop name: " + name,
      cp.$namespaces,
      name
    ]);
    // Throws an error indicating the conflict
    throw Error(bbn._("The name %s in %s is already used by %s in %s", name, type, cp.$namespaces[name], cp.$options.name));
  }

  // If no conflicts, adds the name to the $namespaces object with its type
  cp.$namespaces[name] = type;
}
