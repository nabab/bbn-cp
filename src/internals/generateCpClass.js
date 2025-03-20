import bbnComputed from "../lib/Computed.js";
import setUpProp from "../lib/Html/private/setUpProp.js";

/**
* Create the bbn component class based on the config object.
 * @param {String} publicClass - The name of the class.
 * @param {Object} obj - The component's configuration.
*/
export default function generateCpClass(publicClass, obj) {
  // Define accepted attributes for the component.
  const acceptedAttr = bbn.cp.possibleAttributes
    .concat(bbn.cp.possibleAttributes.map(a => ':' + a))
    .concat(Object.keys(obj.props))
    .concat(Object.keys(obj.props).map(a => ':' + a));

  // Define the component class.
  window[publicClass].prototype.$setUpProps = function() {
    /**
     * Object of all elements with bbn-model prop.
     * Indexed by element's id with bbn-model's value as value
     */
    Object.defineProperty(this, '$computed', {
      value: bbn.fn.createObject()
    });

    // Set up computed properties.
    if (obj.computed) {
      for (let n in obj.computed) {
        new bbnComputed(this, n, obj.computed[n].get, obj.computed[n].set);
      }
    }

    for (let n in obj.props) {
      const cfg = obj.props[n];
      setUpProp(this, n, cfg);
    }
  };

  window[publicClass].acceptedAttributes = acceptedAttr;
  let res;
  const iface = bbn.fn.isFunction(obj.iface) ? obj.iface() : obj.iface || {};
  bbn.fn.each(obj.statics, f => {
    res = f(iface);
    if (res) {
      if (!bbn.fn.isObject(res)) {
        throw new Error(bbn._("If the static method returns it must be an object"));
      }
      bbn.fn.iterate(res, (v, n) => {
        if (window[publicClass][n] === undefined) {
          window[publicClass][n] = bbnData.immunizeValue(v);
        }
        else {
          throw new Error(bbn._("The static method cannot override an existing property"));
        }
      });
    }
  });

  // Define $methods property on the prototype.
  Object.defineProperty(window[publicClass].prototype, '$methods', {
    value: obj.methods,
    writable: false,
    configurable: false
  });

  // Define getters for each prop on the prototype.
  if (obj.props) {
    for (let n in obj.props) {
      Object.defineProperty(window[publicClass].prototype, n, {
        get() {
          bbnData.addSequence(this, n);
          return this.$props[n];
        }
      });
    }
  }

  // Bind methods to the prototype.
  if (obj.methods) {
    for (let n in obj.methods) {
      if (bbn.cp.globalAttributes.includes(n)) {
        bbn.fn.warning(bbn._("The method name %s in %s cannot be a global attribute", n, publicClass));
        //throw new Error(bbn._("The prop name %s cannot be a global attribute", n));
      }
      if (n in window[publicClass].prototype) {
        bbn.fn.warning(bbn._("The method name %s in %s already belongs to the prototype", n, publicClass));
        //continue;
      }

      Object.defineProperty(window[publicClass].prototype, n, {
        get() {
          if (!this.isConnected) {
            return () => {};
          }

          return this.$methods[n].bind(this);
        }
      });
    }
  }

  if (obj.computed) {
    for (let n in obj.computed) {
      if (bbn.cp.globalAttributes.includes(n)) {
        bbn.fn.warning(bbn._("The computed name %s in %s cannot be a global attribute", n, publicClass));
        //throw new Error(bbn._("The prop name %s cannot be a global attribute", n));
      }
      if (n in window[publicClass].prototype) {
        bbn.fn.warning(bbn._("The computed name %s in %s already belongs to the prototype", n, publicClass));
        //continue;
      }
    }
  }

  // Return the newly created class.
  return window[publicClass];
}
