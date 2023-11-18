/**
 * Check if there is no conflict between attributes/methods and
 * add list all the public methods and attributes that can be used by the component
 * @param {bbnCp} cp
 * @param {string} name
 * @param {string} type
 */
export default function addNamespace(cp, name, type) {
  if (!type) {
    throw new Error(bbn._("Type must be defined for %s", name));
  }

  if (bbn.var.reserved.includes(name)) {
    throw new Error(bbn._("The name %s is reserved", name));
  }

  if (cp.$namespaces[name] && (cp.$namespaces[name] !== type)) {
    bbn.fn.log([
      "The namespace already exists",
      "Component name: " + cp.$options.name,
      "Prop name: " + name,
      cp.$namespaces,
      name
    ]);
    throw new Error(bbn._("The name %s in %s is already used by %s in %s", name, type, cp.$namespaces[name], cp.$options.name));
  }

  cp.$namespaces[name] = type;
}