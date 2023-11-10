import bbn from "@bbn/bbn";

/**
* Create the bbn component private class based on the bbnComponentPrivate
*/
export default function generateCpClass(publicClass, obj) {
  const tag = bbn.fn.camelToCss(publicClass);
  const proto = publicClass + 'Cp';
  let originalProto = 'bbnCp';
  if (obj.tag && bbn.cp.tagExtensions[obj.tag]) {
    originalProto = bbn.cp.tagExtensions[obj.tag] + 'Cp';
  }

  const acceptedAttr = bbn.cp.possibleAttributes
    .concat(bbn.cp.possibleAttributes.map(a => ':' + a))
    .concat(Object.keys(obj.props))
    .concat(Object.keys(obj.props).map(a => ':' + a));
  window[`${proto}`] = class extends bbnCp {
    constructor(ele) {
      super(ele);
      const options = bbn.fn.createObject({
        name: tag,
        _componentTag: tag,
        components: bbn.fn.createObject(),
        get propsData() {
          if (this.$el) {
            return this.$el.bbnSchema?.props || {};
          }
    
          return {};
        }
    
      });
      if (obj.tag) {
        options.tag = obj.tag;
      }
      Object.defineProperty(this, '$options', {
        value: options,
        writable: false,
        configurable: false
      });
      if (obj.computed) {
        for (let n in obj.computed) {
          bbn.cp.setComputed(this, n, obj.computed[n].get, obj.computed[n].set);
        }
      }
    
    }

    $init(el) {
      bbnCp.prototype.$init.apply(this, [el]);
      return this;
    }
  
    $setUpProps() {
      for (let n in obj.props) {
        const cfg = obj.props[n];
        this.$setUpProp(n, cfg);
      }
    }

    static $acceptedAttributes = acceptedAttr;

    static {
      let res;
      const iface = bbn.fn.isFunction(obj.iface) ? obj.iface() : obj.iface || {};
      bbn.fn.each(obj.statics, f => {
        res = f(iface);
        if (res) {
          if (!bbn.fn.isObject(res)) {
            throw new Error(bbn._("If the static method returns it must be an object"));
          }
          bbn.fn.iterate(res, (v, n) => {
            if (this[n] === undefined) {
              this[n] = bbnData.immunizeValue(v);
            }
            else {
              throw new Error(bbn._("The static method cannot override an existing property"));
            }
          });
        }
      });
    }

  };

  Object.defineProperty(window[proto].prototype, '$methods', {
    value: obj.methods,
    writable: false,
    configurable: false
  });


  if (obj.props) {
    for (let n in obj.props) {
      Object.defineProperty(window[proto].prototype, n, {
        get() {
          return this.$props[n];
        }
      });
    }
  }

  if (obj.methods) {
    for (let n in obj.methods) {
      Object.defineProperty(window[proto].prototype, n, {
        get() {
          return this.$methods[n].bind(this);
        }
      });
    }
  }

  return window[proto];
}
