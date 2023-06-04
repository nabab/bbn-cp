class bbnAnonCp extends bbnCp {
  $options = {
    name: 'bbn-anon'
  };

  constructor(ele) {
    super(ele);
    Object.defineProperty(this, '$options', {
      value: {
        name: ele.tagName.toLowerCase(),
        _componentTag: ele.tagName.toLowerCase(),
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

    this.$init();
  }

  $connectedCallback() {
    if (!this.$el.bbnTpl) {
      this.$el.bbnTpl = bbnAnon.bbnTpl;
      const tpl = this.$el.innerHTML.trim();
      if (tpl) {
        this.$el.bbnTpl.slots = tpl;
      }
    }

    //this.$el.bbnSlots = bbn.cp.retrieveSlots(bbnAnon.bbnTpl);
    //this.$el.bbnModels = bbn.cp.retrieveModels(this.$el.bbnTpl);
    const cfg = this.$cfg;
    if (cfg.components) {
      for (let n in cfg.components) {
        //bbn.fn.log("DEFINING COMPONENT", n, cfg.components[n], cfg.components[n].template);
        bbn.cp.define(cfg.componentNames[n], cfg.components[n], cfg.components[n].template);
        this.$options.components[n] = cfg.components[n];
      }
    }

    if (cfg && cfg.computed) {
      bbn.fn.iterate(cfg.computed, (computed, name) => {
        if (name.substr(0, 1) === '$') {
          throw new Error(bbn._("Properties starting with the dollar sign are reserved"));
        }

        bbn.cp.setComputed(this, name, computed.get, computed.set);
      });
    }

    if (cfg && cfg.methods) {
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
      });
    }

    bbn.fn.log("CONNCTRED CALLED IN ANON", this.$el);
    bbnCp.prototype.$connectedCallback.apply(this);
  }

  $setUpProps() {
    if (!this.$cfg.props) {
      this.$cfg.props = bbn.fn.createObject();
    }

    bbn.fn.each(this.$cfg.props, (prop, name) => {
      this.$setUpProp(name, prop);
    });
    if (!this.$cfg.props.source) {
      this.$cfg.props.source = {
        type: [String, Object, Array],
      };
    }
    this.$setUpProp("source", {
      type: [String, Object, Array],
    });
  }

  static $acceptedAttributes = ['bbn-cfg', 'bbn-tpl', 'bbn-map', 'bbn-cls', 'bbn-fn', 'is', 'source', 'ref', 'key', 'index', 'slot'];

}

