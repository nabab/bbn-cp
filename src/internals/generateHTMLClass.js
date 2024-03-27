/**
 * Generates the code for creating the public class.
 * Assumes that tpl, cfg, and others are defined in bbn.cp.statics.
 *
 * @param {String} name - The name of the class to generate.
 * @param {Function} clsExtends - The class to extend, defaults to bbnHTML.
 * @returns {Class} - The dynamically created class.
 */
export default function generateHTMLClass(name, clsExtends = bbnHTML) {
  // Convert the class name from camel case to CSS-style (kebab-case).
  const eleName = bbn.fn.camelToCss(name);

  // Define the new component class, extending from clsExtends.
  const newCpClass = class extends clsExtends {
    // Static getter for the bbnTag property.
    static get bbnTag() {
      return eleName;
    }

    // Static getter for the bbnSlots property.
    static get bbnSlots() {
      return bbn.cp.statics[eleName].slots;
    }

    // Static getter for the bbnTpl (template) property.
    static get bbnTpl() {
      return bbn.cp.statics[eleName].tpl;
    }

    // Static getter for the bbnCfg (configuration) property.
    static get bbnCfg() {
      return bbn.cp.statics[eleName].cfg;
    }

    // Static getter for the bbnCls (class) property.
    static get bbnCls() {
      return bbn.cp.statics[eleName].cls;
    }

    // Static getter for the bbnMap property.
    static get bbnMap() {
      return bbn.cp.statics[eleName].map;
    }

    // Static getter for the bbnFn (function) property.
    static get bbnFn() {
      return window[name + 'Cp'];
    }

    // Static property to track if the component is mapped.
    static bbnMapped = false;
  }

  // Return the newly created class.
  return newCpClass;
}
