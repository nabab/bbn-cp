/**
 * Generates the code for creating the public class
 * Be careful that cpTpl, cpCfg and cpCls are defined
 *
 */
export default function generateHTMLClass(name, clsExtends = bbnHTML) {
  const eleName = bbn.fn.camelToCss(name);
  const newCpClass = class extends clsExtends {
    static get bbnTag() {
      return eleName;
    }
    static get bbnSlots() {
      return bbn.cp.statics[eleName].slots;
    }
    static get bbnTpl() {
      return bbn.cp.statics[eleName].tpl;
    }
    static get bbnCfg() {
      return bbn.cp.statics[eleName].cfg;
    }
    static get bbnCls() {
      return bbn.cp.statics[eleName].cls;
    }
    static get bbnMap() {
      return bbn.cp.statics[eleName].map;
    }
    static get bbnFn() {
      return window[name + 'Cp'];
    }
  }

  return newCpClass;
}
