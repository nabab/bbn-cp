import addNamespace from "./addNamespace.js";
import realSetProp from "./realSetProp.js";
import checkPropValue from "./checkPropValue.js";

//const globalAttributes = ["accesskey","autocapitalize","autofocus","class","contenteditable","contextmenu","dir","draggable","enterkeyhint","exportparts","hidden","id","inert","inputmode","contenteditable","is","itemid","itemprop","itemref","itemscope","itemscope","lang","nonce","part","popover","popovertarget","role","slot","name","spellcheck","style","tabindex","title","translate","Text","virtualkeyboardpolicy","contenteditable"];

export default function setUpProp(cp, name, cfg) {
  
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  if (name.indexOf('data-') === 0) {
    throw Error(bbn._("The name of the property cannot start with %s", 'data-'));
  }

  if (name.indexOf('aria-') === 0) {
    throw Error(bbn._("The name of the property cannot start with %s", 'aria-'));
  }

  /*
  if (globalAttributes.includes(name)) {
    throw Error(bbn._("The name of the property cannot be a global attribute: %s", name));
  }
  */

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