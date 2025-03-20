import bbnAnonCp from "../Html/Anon.js";
import bbnProtoHtml from "./Proto.js";
import bbnComputed from "../Computed.js";
import stringToTemplate from "../../internals/stringToTemplate.js";
import setUpProp from "./private/setUpProp.js";

const {res: cpTpl, map: cpMap} = stringToTemplate('<slot/>', true, 'bbn-anon');

export default class bbnAnonHtml extends HTMLElement
{
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

  get $rootPath() {
    let st = this.bbnId;
    if (this.$origin) {
      st = this.$origin.$rootPath + '/' + st;
    }

    return st;
  }

  static bbnTag = 'bbn-anon';

  static bbnFn = bbnAnonHtml;

  static bbnCls = 'bbnAnonHtml';

  static bbnTpl = cpTpl;

  static bbnMap = cpMap;

  static bbnCfg = bbn.cp.normalizeComponent({
    mixins: [bbn.cp.mixins.basic],
    props: {
      is: {
        type: [String, Object],
        default: 'div'
      },
      source: bbn.fn.createObject()
    }
  }, 'bbnAnonHtml');

  $options = bbn.fn.createObject({
    name: 'bbn-anon'
  });


  $connected() {
    Object.defineProperty(this, '$options', {
      value: {
        name: this.tagName.toLowerCase(),
        _componentTag: this.tagName.toLowerCase(),
        components: bbn.fn.createObject(),
        get propsData() {
          if (this.$el) {
            return this.$el.bbnSchema?.props || {};
          }

          return {};
        }
      },
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, '$computed', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    //bbn.fn.log("ANON!!! ",this.$el.bbnSchema.props?.is);
    if (!this.$el.bbnTpl) {
      this.$el.bbnTpl = bbnAnonHtml.bbnTpl;
      const tpl = this.$el.innerHTML.trim();
      if (tpl) {
        this.$el.bbnTpl.slots = tpl;
      }
    }

    const cfg = this.$cfg;
    if (cfg.components) {
      for (let n in cfg.components) {
        //bbn.fn.log("DEFINING COMPONENT", n, cfg.components[n], cfg.components[n].template);
        bbn.cp.define(cfg.componentNames[n], cfg.components[n], cfg.components[n].template);
      }
    }

    if (cfg && cfg.computed) {
      bbn.fn.iterate(cfg.computed, (computed, name) => {
        if (name.substr(0, 1) === '$') {
          throw new Error(bbn._("Properties starting with the dollar sign are reserved"));
        }

        new bbnComputed(this, name, computed.get, computed.set);
      });
    }

    if (cfg && cfg.methods) {
      Object.defineProperty(this, '$methods', {
        value: cfg.methods,
        writable: false,
        configurable: false
      });
      bbn.fn.iterate(cfg.methods, (fn, name) => {
        if (name.substr(0, 1) === '$') {
          throw new Error(bbn._("Properties starting with the dollar sign are reserved"));
        }

        if (this[name] === undefined) {
          Object.defineProperty(this, name, {
            writable: false,
            configurable: false,
            value: fn
          });
        }
        else {
          bbn.fn.warning(bbn._("Can't define the method %s on %s", name, this.tagName));
        }
      });
    }

    //bbn.fn.log("CONNCTRED CALLED IN ANON", this.$el);
    bbnProtoHtml.$connected.apply(this);
  }

  get source() {
    return this.$props?.source;
  }

  $setUpProps() {
    if (!this.$cfg.props.source) {
      this.$cfg.props.source = bbn.fn.createObject({
        type: [String, Object, Array],
      });
    }

    bbn.fn.each(this.$cfg.props, (prop, name) => {
      setUpProp(this, name, prop);
      Object.defineProperty(this, name, {
        get() {
          bbnData.addSequence(this, name);
          return this.$props[name];
        }
      });
    });
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

  static acceptedAttributes = ['bbn-cfg', 'bbn-tpl', 'bbn-map', 'bbn-cls', 'bbn-fn', 'is', 'source', 'ref', 'key', 'index', 'slot'];

}
