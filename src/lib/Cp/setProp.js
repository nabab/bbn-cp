import bbnCp from "../Cp.js";

bbnCp.prototype.$setProp = function (name, value) {
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }
  const cfg = this.$cfg.props[name];
  /*
  if (bbn.cp.possibleAttributes.includes(name)) {
    return;
  }
  */

  if (!this.$el.constructor.bbnFn.acceptedAttributes.includes(name) && (name.indexOf('bbn') !== 0)) {
    bbn.fn.warning(bbn._("The attribute %s in %s is not a property", name, this.$options.name));
    return;
  }

  if (!Object.hasOwn(this.$props, name)) {
    //bbn.fn.warning(bbn._("The attribute %s in %s is not defined", name, this.$options.name));
    return;
  }


  let v = this.$checkPropValue(name, cfg, value);
  if (v === this[name]) {
    return;
  }

  this.$realSetProp(name, v);
}