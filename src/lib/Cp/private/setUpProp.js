import addNamespace from "./addNamespace.js";
import realSetProp from "./realSetProp.js";
import checkPropValue from "./checkPropValue.js";

export default function setUpProp(cp, name, cfg) {
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  if (Object.hasOwn(cp.$cfg.props, name)) {
    if (!Object.hasOwn(cp.$props, name)) {
      Object.defineProperty(cp.$props, name, {
        value: undefined,
        writable: false,
        enumerable: true,
        configurable: true
      });
    }

    addNamespace(cp, name, 'props');
  }

  const value = checkPropValue(cp, name, cfg);
  const isDefined = value !== undefined;
  if (isDefined) {
    realSetProp(cp, name, value);
  }
}