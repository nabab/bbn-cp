import bbnProtoHtml from "../lib/Html/Proto.js";
import bbnHtml from "../lib/Html/Html.js";
/**
 * Generates the code for creating the public class.
 * Assumes that tpl, cfg, and others are defined in bbn.cp.statics.
 *
 * @param {String} name - The name of the class to generate.
 * @param {Function} extendedTag - The tag to extend, otherwise defaults to bbnHtml.
 * @returns {Class} - The dynamically created class.
 */
export default function generateHtmlClass(name, extendedTag) {

  if (extendedTag && !bbn.cp.htmlClasses[extendedTag]) {
    const ele = document.createElement(extendedTag.toUpperCase());
    bbn.cp.htmlClasses[extendedTag] = bbn.fn.createObject({
      name: ele.constructor.name,
      constructor: ele.constructor,
      cls: 'bbn' + (!ele.constructor.name.indexOf('HTML') ? bbn.fn.substr(ele.constructor.name, 4) : ele.constructor.name),
    });
  }

  // Convert the class name from camel case to CSS-style (kebab-case).
  const eleName = bbn.fn.camelToCss(name);
  //bbn.fn.log("GENERATE HTML CLASS", name, "FROM", clsExtends);

  const clsToExtend = bbn.cp.htmlClasses[extendedTag] ? bbn.cp.htmlClasses[extendedTag].constructor : bbnHtml;

  //bbn.fn.log(["EXTENDING " + bbn.cp.htmlClasses[extendedTag]?.name, clsToExtend, extendedTag, name])
  // Define the new component class, extending from clsExtends.
  return class extends clsToExtend {
    static name = name;
    // Static getter for the bbnTag property.
    static get bbnTag() {
      return eleName;
    }

    // Static getter for the bbnSlots property.
    static get bbnSlots() {
      return bbn.cp.statics[eleName]?.slots;
    }

    // Static getter for the bbnTpl (template) property.
    static get bbnTpl() {
      return bbn.cp.statics[eleName]?.tpl;
    }

    // Static getter for the bbnCfg (configuration) property.
    static get bbnCfg() {
      return bbn.cp.statics[eleName]?.cfg;
    }

    // Static getter for the bbnCls (class) property.
    static get bbnCls() {
      return bbn.cp.statics[eleName]?.cls;
    }

    // Static getter for the bbnMap property.
    static get bbnMap() {
      return bbn.cp.statics[eleName]?.map;
    }

    // Static getter for the bbnFn (function) property.
    static get bbnFn() {
      return window[name + 'Cp'];
    }

    // Static property to track if the component is mapped.
    static bbnMapped = false;

    constructor() {
      super();
      bbnProtoHtml.construct.call(this);
    }
  
    connectedCallback() {
      return bbnProtoHtml.connectedCallback.call(this);
    } 
  
    disconnectedCallback() {
      return bbnProtoHtml.disconnectedCallback.call(this, [this]);
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      return bbnProtoHtml.attributeChangedCallback.call(this, [this, name, oldValue, newValue]);
    }
  }
}
