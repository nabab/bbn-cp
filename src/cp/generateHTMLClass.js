(() => {
  bbn.fn.autoExtend('cp', {
    /**
     * Generates the code for creating the public class
     * Be careful that cpTpl, cpCfg and cpCls are defined
     *
     */
    generateHTMLClass(name, clsExtends = 'bbnHTML') {
      const eleName = bbn.fn.camelToCss(name);
      const sc = document.createElement('script');
      sc.setAttribute('type', 'text/javascript');
      sc.setAttribute('id', name + 'Definition');
      sc.innerHTML = `class ${name} extends ${clsExtends}
{
  static get bbnTpl() {
    return bbn.cp.statics['${eleName}'].tpl;
  }
  static get bbnCfg() {
    return bbn.cp.statics['${eleName}'].cfg;
  }
  static get bbnCls() {
    return bbn.cp.statics['${eleName}'].cls;
  }
  static get bbnMap() {
    return bbn.cp.statics['${eleName}'].map;
  }
  static get bbnTag() {
    return bbn.cp.statics['${eleName}'].tag;
  }
  static get bbnModels() {
    return bbn.cp.statics['${eleName}'].models;
  }
  static get bbnSlots() {
    return bbn.cp.statics['${eleName}'].slots;
  }
  static get bbnFn() {
    return ${name}Cp;
  }

  constructor() {
    super();
  }
};`;
      window.document.head.appendChild(sc);
    }
  })
})();
