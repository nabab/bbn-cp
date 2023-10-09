(() => {
  const sc = document.createElement('script');
  sc.setAttribute('type', 'text/javascript');
  sc.innerHTML = `

class bbnAnonCp extends bbnCp {
  $options = bbn.fn.createObject({
    name: 'bbn-anon'
  });

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

  async $connectedCallback() {
    //bbn.fn.log("ANON!!! ",this.$el.bbnSchema.props?.is);
    if (!this.$el.bbnTpl) {
      this.$el.bbnTpl = bbnAnon.bbnTpl;
      const tpl = this.$el.innerHTML.trim();
      if (tpl) {
        this.$el.bbnTpl.slots = tpl;
      }
    }

    const cfg = this.$cfg;
    /*
    if (cfg.components) {
      for (let n in cfg.components) {
        //bbn.fn.log("DEFINING COMPONENT", n, cfg.components[n], cfg.components[n].template);
        bbn.cp.define(cfg.componentNames[n], cfg.components[n], cfg.components[n].template);
      }
    }
    */

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

    //bbn.fn.log("CONNCTRED CALLED IN ANON", this.$el);
    await bbnCp.prototype.$connectedCallback.apply(this);
  }

  get source() {
    return this.$props["source"];
  }

  $setUpProps() {
    if (!this.$cfg.props.source) {
      this.$cfg.props.source = bbn.fn.createObject({
        type: [String, Object, Array],
      });
    }

    bbn.fn.each(this.$cfg.props, (prop, name) => {
      this.$setUpProp(name, prop);
      Object.defineProperty(this, name, {
        get() {
          return this.$props[name];
        }
      });
    });
  }

  static $acceptedAttributes = ['bbn-cfg', 'bbn-tpl', 'bbn-map', 'bbn-cls', 'bbn-fn', 'is', 'source', 'ref', 'key', 'index', 'slot'];

}

`;
window.document.head.appendChild(sc);
})();