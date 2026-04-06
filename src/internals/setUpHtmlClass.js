import bbnData from "../lib/Data.js";
import bbnComputed from "../lib/Computed.js";
import setUpProp from "../lib/Html/private/setUpProp.js";

/**
* Create the bbn component class based on the config object.
 * @param {String} publicClass - The name of the class.
 * @param {Object} obj - The component's configuration.
*/

/** @var {Array} possibleAttributes List of regular HTML attributes names which have a special treatment from the library */
const possibleAttributes = [
  'is',
  'source',
  'ref',
  'slot',
  'id',
  'class',
  'style',
  'key'
];
export default function setUpHtmlClass(publicClass, obj) {
  // Define accepted attributes for the component.
  const acceptedAttr = possibleAttributes
    .concat(possibleAttributes.map(a => ':' + a))
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
          window[publicClass][n] = bbn.cp.immunizeValue(v);
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
    for (let name in obj.props) {
      if (!/[A-Z]/.test(name)) {
        name = bbn.fn.camelize(name);
      }

      if (name.indexOf('data-') === 0) {
        throw new Error(bbn._("The name of the property %s in the component %s cannot start with %s", name, publicClass, 'data-'));
      }

      if (name.indexOf('aria-') === 0) {
        throw new Error(bbn._("The name of the property %s in the component %s cannot start with %s", name, publicClass, 'aria-'));
      }

      if (name in window[publicClass].prototype) {
        bbn.fn.warning(bbn._("The property name %s is already defined in the HTML prototype of the component %s", name, publicClass));
        //throw new Error(bbn._("The name of the property cannot be a native property: %s", name));
      }

      Object.defineProperty(window[publicClass].prototype, name, {
        get() {
          bbnData.addSequence(this, name);
          return this.$props[name];
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
          if (this.$isDestroyed) {
            return () => {};
          }

          return this.$methods[n].fn.bind(this);
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
