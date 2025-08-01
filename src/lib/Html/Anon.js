import bbnProtoHtml from "./Proto.js";
import bbnComputed from "../Computed.js";
import stringToTemplate from "../../internals/stringToTemplate.js";
import setUpProp from "./private/setUpProp.js";
import bbnData from "../Data.js";

const {res: cpTpl, map: cpMap} = stringToTemplate('<slot/>', true, 'bbn-anon');

export default class bbnAnonHtml extends HTMLElement
{
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

  #options;
  #bbnSlots;
  #bbnCid;
  #bbnTmpSlots;
  #isConnected = false;
  #isInit = false;
  #isDataSet = false;
  #isCreating = false;
  #isUpdating = null;
  #isCreated = false;
  #isWatched = false;
  #isDestroying = false;
  #isDestroyed = false;
  #isMounted = false;
  #tagUsed;
  #props;
  #propsCfg;
  #namespaces;
  #nodes;
  #events;
  #children;
  #components;
  #dataCfg;
  #refsElements;
  #internal;

  $lastBuild = 0;

  get _self() {
    return this;
  }

  get $el() {
    return this;
  }

  get $node() {
    return this.bbnSchema;
  }

  get $cls() {
    return this.constructor;
  }

  get $options() {
    return this.#options;
  };
  set $options(v) {
    if (!this.#options) {
      this.#options = v;
    }
  };

  get $cfg() {
    return this.bbnCfg || this.constructor.bbnCfg;
  }

  get $dataValues() {
    const obj = bbn.fn.createObject();
    bbn.fn.iterate(this.$dataCfg, (a, n) => {
      obj[n] = a.value;
    });
    return obj;
  }


  get $isConnected() {
    return this.#isConnected;
  }
  set $isConnected(v) {
    if (v && !this.#isConnected) {
      this.#isConnected = v;
    }
  };

  get $bbnCid() {
    return this.#bbnCid;
  };
  set $bbnCid(v) {
    if (!this.#bbnCid) {
      this.#bbnCid = v;
    }
  };

  get $bbnSlots() {
    return this.#bbnSlots;
  };
  set $bbnSlots(v) {
    if (!this.#bbnSlots) {
      this.#bbnSlots = v;
    }
  };

  get $bbnTmpSlots() {
    return this.#bbnTmpSlots;
  };
  set $bbnTmpSlots(v) {
    if (!this.#bbnTmpSlots) {
      this.#bbnTmpSlots = v;
    }
  };

  get $isInit() {
    return this.#isInit;
  };
  set $isInit(v) {
    if (v && !this.#isInit) {
      this.#isInit = v;
    }
  };

  get $isDataSet() {
    return this.#isDataSet;
  };
  set $isDataSet(v) {
    if (v && !this.#isDataSet) {
      this.#isDataSet = v;
    }
  };

  get $isCreating() {
    return this.#isCreating;
  };
  set $isCreating(v) {
    this.#isCreating = v;
  };

  get $isUpdating() {
    return this.#isUpdating;
  };
  set $isUpdating(v) {
    this.#isUpdating = v;
  };

  get $isCreated() {
    return this.#isCreated;
  };
  set $isCreated(v) {
    if (v && !this.#isCreated) {
      this.#isCreated = v;
    }
  };

  get $isWatched() {
    return this.#isWatched;
  };
  set $isWatched(v) {
    if (v && !this.#isWatched) {
      this.#isWatched = v;
    }
  };

  get $isDestroying() {
    return this.#isDestroying;
  };
  set $isDestroying(v) {
    this.#isDestroying = v;
  };

  get $isDestroyed() {
    return this.#isDestroyed;
  };
  set $isDestroyed(v) {
    if (v && !this.#isDestroyed) {
      this.#isDestroyed = v;
    }
  };

  get $isMounted() {
    return this.#isMounted;
  };
  set $isMounted(v) {
    if (v && !this.#isMounted) {
      this.#isMounted = v;
    }
  };

  get $tagUsed() {
    return this.#tagUsed;
  };
  set $tagUsed(v) {
    if (!this.#tagUsed) {
      this.#tagUsed = v;
    }
  };

  get $props() {
    return this.#props;
  };
  set $props(v) {
    if (!this.#props) {
      this.#props = v;
    }
  };

  get $propsCfg() {
    return this.#propsCfg;
  };
  set $propsCfg(v) {
    if (!this.#propsCfg) {
      this.#propsCfg = v;
    }
  };

  get $namespaces() {
    return this.#namespaces;
  };
  set $namespaces(v) {
    if (!this.#namespaces) {
      this.#namespaces = v;
    }
  };

  get $nodes() {
    return this.#nodes;
  };
  set $nodes(v) {
    if (!this.#nodes) {
      this.#nodes = v;
    }
  };

  get $events() {
    return this.#events;
  };
  set $events(v) {
    if (!this.#events) {
      this.#events = v;
    }
  };

  get $children() {
    return this.#children;
  };
  set $children(v) {
    if (!this.#children) {
      this.#children = v;
    }
  };

  get $components() {
    return this.#components;
  };
  set $components(v) {
    if (!this.#components) {
      this.#components = v;
    }
  };

  get $dataCfg() {
    return this.#dataCfg;
  };
  set $dataCfg(v) {
    if (!this.#dataCfg) {
      this.#dataCfg = v;
    }
  };

  get $refsElements() {
    return this.#refsElements;
  };
  set $refsElements(v) {
    if (!this.#refsElements) {
      this.#refsElements = v;
    }
  };

  get $internal() {
    return this.#internal;
  }
  set $internal(v) {
    if (!this.#internal) {
      this.#internal = v;
    }
  }

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

  findAllByKey(...args) {
    return bbnProtoHtml.findAllByKey.apply(this, args);
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

  $options = bbn.fn.createObject({
    name: 'bbn-anon'
  });


  $connected() {
    this.#options = {
      name: this.tagName.toLowerCase(),
      _componentTag: this.tagName.toLowerCase(),
      components: bbn.fn.createObject(),
      get propsData() {
        if (this.$el) {
          return this.$el.bbnSchema?.props || {};
        }

        return {};
      }
    };
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
        let tpl = cfg.components[n].template;
        if (tpl && !tpl.indexOf('#')) {
          tpl = this.$el.bbnInlineTemplates[tpl];
          cfg.components[n].template = tpl;
        }
        //bbn.fn.log("DEFINING COMPONENT", n, cfg.components[n], cfg.components[n].template);
        bbn.cp.define(cfg.componentNames[n], cfg.components[n], tpl);
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
      bbn.fn.iterate(cfg.methods, (meth, name) => {
        if (name.substr(0, 1) === '$') {
          throw new Error(bbn._("Properties starting with the dollar sign are reserved"));
        }

        if (!(name in this)) {
          Object.defineProperty(this, name, {
            writable: false,
            configurable: false,
            value: meth.fn.bind(this)
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
