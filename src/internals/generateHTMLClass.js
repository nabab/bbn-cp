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
    //bbn.fn.log(" GENERATE HTML CLASS " + name + " FROM " + extendedTag);
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
      return name;
    }

    // Static getter for the bbnMap property.
    static get bbnMap() {
      return bbn.cp.statics[eleName]?.map;
    }

    // Static getter for the bbnFn (function) property.
    static get bbnFn() {
      return this;
    }

    // Static property to track if the component is mapped.
    static bbnMapped = false;

    constructor() {
      super();
      // Define $options property.
      const options = bbn.fn.createObject({
        name: eleName,
        _componentTag: eleName,
        components: bbn.fn.createObject(),
        // Define a getter for propsData.
        get propsData() {
          if (this.$el) {
            return this.$el.bbnSchema?.props || {};
          }
          return {};
        }
      });
      Object.defineProperty(this, '$options', {
        value: options,
        writable: false,
        configurable: false
      });
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

    _(...args) {
      return bbnProtoHtml._.apply(this, args);
    }
  
    getRef(...args) {
      return bbnProtoHtml.getRef.apply(this, args);
    }
  
    ancestors(...args) {
      return bbnProtoHtml.ancestors.apply(this, args);
    }

    closest(...args) {
      return bbnProtoHtml.closest.apply(this, args);
    }
  
    find(...args) {
      return bbnProtoHtml.find.apply(this, args);
    }
  
    findAll(...args) {
      return bbnProtoHtml.findAll.apply(this, args);
    }
  
    extend(...args) {
      return bbnProtoHtml.extend.apply(this, args);
    }
  
    getComponents(...args) {
      return bbnProtoHtml.getComponents.apply(this, args);
    }
  
    getComponentName(...args) {
      return bbnProtoHtml.getComponentName.apply(this, args);
    }
   
    async $connected(...args) {
      return await bbnProtoHtml.$connected.apply(this, args);;
    }

    $create(...args) {
      return bbnProtoHtml.$create.apply(this, args);
    }

    $delete(...args) {
      return bbnProtoHtml.$delete.apply(this, args);
    }

    $destroy(...args) {
      return bbnProtoHtml.$destroy.apply(this, args);
    }
      
    $emit(...args) {
      return bbnProtoHtml.$emit.apply(this, args);
    }
      
    $forceUpdate(...args) {
      return bbnProtoHtml.$forceUpdate.apply(this, args);
    }
      
    $get(...args) {
      return bbnProtoHtml.$get.apply(this, args);
    }
      
    $has(...args) {
      return bbnProtoHtml.$has.apply(this, args);
    }
      
    $hasSlots(...args) {
      return bbnProtoHtml.$hasSlots.apply(this, args);
    }
      
    $is(...args) {
      return bbnProtoHtml.$is.apply(this, args);
    }
      
    $isComponent(...args) {
      return bbnProtoHtml.$isComponent.apply(this, args);
    }

    $isPropNative(...args) {
      return bbnProtoHtml.$isPropNative.apply(this, args);
    }
      
    $nextTick(...args) {
      return bbnProtoHtml.$nextTick.apply(this, args);
    }
      
    $off(...args) {
      return bbnProtoHtml.$off.apply(this, args);
    }
      
    $on(...args) {
      return bbnProtoHtml.$on.apply(this, args);
    }
      
    $once(...args) {
      return bbnProtoHtml.$once.apply(this, args);
    }
      
    $position(...args) {
      return bbnProtoHtml.$position.apply(this, args);
    }
      
    $retrieveComponent(...args) {
      return bbnProtoHtml.$retrieveComponent.apply(this, args);
    }
      
    $retrieveElement(...args) {
      return bbnProtoHtml.$retrieveElement.apply(this, args);
    }
      
    $retrieveNode(...args) {
      return bbnProtoHtml.$retrieveNode.apply(this, args);
    }

    $retrieveSlotItems(...args) {
      return bbnProtoHtml.$retrieveSlotItems.apply(this, args);
    }
      
    $set(...args) {
      return bbnProtoHtml.$set.apply(this, args);
    }
      
    $tick(...args) {
      return bbnProtoHtml.$tick.apply(this, args);
    }
      
    $treatValue(...args) {
      return bbnProtoHtml.$treatValue.apply(this, args);
    }
      
    $watch(...args) {
      return bbnProtoHtml.$watch.apply(this, args);
    }

    get $rootPath() {
      let st = this.bbnId;
      if (this.$origin) {
        st = this.$origin.$rootPath + '/' + st;
      }
  
      return st;
    }
  
  }
}
