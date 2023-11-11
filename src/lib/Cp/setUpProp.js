import bbnCp from "../Cp.js";

bbnCp.prototype.$setUpProp = function(name, cfg){
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  if (Object.hasOwn(this.$cfg.props, name)) {
    if (!Object.hasOwn(this.$props, name)) {
      Object.defineProperty(this.$props, name, {
        value: undefined,
        writable: false,
        enumerable: true,
        configurable: true
      });
    }

    this.$addNamespace(name, 'props');
  }

  const value = this.$checkPropValue(name, cfg);
  const isDefined = value !== undefined;
  if (isDefined) {
    this.$realSetProp(name, value);
  }
}