import realSetProp from "./realSetProp.js";
import checkPropValue from "./checkPropValue.js";

export default function setProp(cp, name, value) {
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }
  const cfg = cp.$cfg.props[name];
  /*
  if (bbn.cp.possibleAttributes.includes(name)) {
    return;
  }
  */

  if (!cp.$el.constructor.bbnFn.acceptedAttributes.includes(name) && (name.indexOf('bbn') !== 0)) {
    bbn.fn.warning(bbn._("The attribute %s in %s is not a property", name, cp.$options.name));
    return;
  }

  if (!Object.hasOwn(cp.$props, name)) {
    //bbn.fn.warning(bbn._("The attribute %s in %s is not defined", name, cp.$options.name));
    return;
  }


  let v = checkPropValue(cp, name, cfg, value);
  if (v === cp[name]) {
    return;
  }

  realSetProp(cp, name, v);
}