import addNamespace from "./addNamespace.js";
import realSetProp from "./realSetProp.js";
import checkPropValue from "./checkPropValue.js";

//const globalAttributes = ["accesskey","autocapitalize","autofocus","class","contenteditable","contextmenu","dir","draggable","enterkeyhint","exportparts","hidden","id","inert","inputmode","contenteditable","is","itemid","itemprop","itemref","itemscope","itemscope","lang","nonce","part","popover","popovertarget","role","slot","name","spellcheck","style","tabindex","title","translate","Text","virtualkeyboardpolicy","contenteditable"];

export default function setUpProp(cp, name, cfg) {
  
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  if (name.indexOf('data-') === 0) {
    if (cp.tagName === 'BBN-ANON') {
      bbn.fn.log(cp);
    }

    throw new Error(bbn._("The name of the property %s in the component %s cannot start with %s", name, cp.tagName, 'data-'));
  }

  if (name.indexOf('aria-') === 0) {
    if (cp.tagName === 'BBN-ANON') {
      bbn.fn.log(cp);
    }

    throw new Error(bbn._("The name of the property %s in the component %s cannot start with %s", name, cp.tagName, 'aria-'));
  }

  if (cp.$isPropNative(name)) {
    if (cp.tagName === 'BBN-ANON') {
      bbn.fn.log(cp);
    }

    bbn.fn.warning(bbn._("The property name %s is already defined in the HTML prototype of the component %s", name, cp.tagName));
    //throw new Error(bbn._("The name of the property cannot be a native property: %s", name));
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