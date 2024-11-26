import addNamespace from "./addNamespace.js";
import realSetProp from "./realSetProp.js";
import checkPropValue from "./checkPropValue.js";

//const globalAttributes = ["accesskey","autocapitalize","autofocus","class","contenteditable","contextmenu","dir","draggable","enterkeyhint","exportparts","hidden","id","inert","inputmode","contenteditable","is","itemid","itemprop","itemref","itemscope","itemscope","lang","nonce","part","popover","popovertarget","role","slot","name","spellcheck","style","tabindex","title","translate","Text","virtualkeyboardpolicy","contenteditable"];

export default function setUpProp(cp, name, cfg) {
  
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  if (name.indexOf('data-') === 0) {
    throw new Error(bbn._("The name of the property cannot start with %s", 'data-'));
  }

  if (name.indexOf('aria-') === 0) {
    throw new Error(bbn._("The name of the property cannot start with %s", 'aria-'));
  }

  /*
  if (globalAttributes.includes(name)) {
    throw new Error(bbn._("The name of the property cannot be a global attribute: %s", name));
  }
  */

  if (Object.hasOwn(cp.$cfg.props, name)) {
    if (!Object.hasOwn(cp.$props, name)) {
      Object.defineProperty(cp.$propsCfg, name, {
        value: bbn.fn.createObject({
          value: undefined,
          lastUpdate: 0
        }),
        writable: false,
        enumerable: true,
        configurable: false
      });
      Object.defineProperty(cp.$props, name, {
        get() {
          return cp.$propsCfg[name].value;
        },
        set(v) {
          realSetProp(cp, name, v);
        }
      });
    }

    addNamespace(cp, name, 'props');
  }

  const value = checkPropValue(cp, name, cfg);
  realSetProp(cp, name, value);
}