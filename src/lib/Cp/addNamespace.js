import bbnCp from "../Cp.js";

/**
 * Check if there is no conflict between attributes/methods and
 * add list all the public methods and attributes that can be used by the component
 * @param name
 * @param type
 */
bbnCp.prototype.$addNamespace = function (name, type) {
  if (!type) {
    throw new Error(bbn._("Type must be defined for %s", name));
  }

  if (bbn.var.reserved.includes(name)) {
    throw new Error(bbn._("The name %s is reserved", name));
  }

  if (this.$namespaces[name] && (this.$namespaces[name] !== type)) {
    bbn.fn.log([
      "The namespace already exists",
      "Component name: " + this.$options.name,
      "Prop name: " + name,
      this.$namespaces,
      name
    ]);
    throw new Error(bbn._("The name %s in %s is already used by %s in %s", name, type, this.$namespaces[name], this.$options.name));
  }

  this.$namespaces[name] = type;
}