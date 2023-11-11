import bbnCp from "../Cp.js";

bbnCp.prototype.$checkPropValue = function (name, cfg, value) {
  if (!cfg) {
    throw new Error(bbn._("The property %s is not defined in component %s", name, this.$options.name));
  }

  let isDefined = Object.hasOwn(this.$options.propsData, name) && (this.$options.propsData[name] !== undefined);
  let v = undefined;
  if (value !== undefined) {
    v = value;
    isDefined = true;
  }
  else if (isDefined) {
    v = this.$options.propsData[name];
  }
  if (!this.$numBuild && !isDefined && (cfg.default !== undefined)) {
    if (bbn.fn.isObject(cfg.default) || bbn.fn.isArray(cfg.default)) {
      throw new Error(bbn._("A function must be used to return object default values in %s", name));
    }

    v = bbn.fn.isFunction(cfg.default) ? cfg.default.bind(this)() : cfg.default;
    isDefined = true;
  }

  if (cfg.required && (!isDefined || [null, undefined, ''].includes(v))) {
    throw new Error(bbn._("The property %s is required in component %s", name, this.$options.name));
  }

  if (cfg.type && isDefined && ![null, undefined, ''].includes(v)) {
    bbn.fn.checkType(v, cfg.type, bbn._("Wrong type for %s in component %s", name, this.$options.name));
  }

  if (isDefined && bbn.fn.isFunction(cfg.validator) && !cfg.validator(v)) {
    throw new Error(bbn._("The property %s is invalid", name));
  }

  return v;
}