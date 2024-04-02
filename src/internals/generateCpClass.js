import setUpProp from "../lib/Cp/private/setUpProp.js";

/**
* Create the bbn component class based on the config object.
 * @param {String} publicClass - The name of the class.
 * @param {Object} obj - The component's configuration.
*/
export default function generateCpClass(publicClass, obj) {
  // Convert the class name from camel case to CSS-style (kebab-case).
  const tag = bbn.fn.camelToCss(publicClass);
  // Define the prototype name based on the public class.
  const proto = publicClass + 'Cp';
  // Default prototype is 'bbnCp'.
  let originalProto = 'bbnCp';

  // If a tag extension exists, use its prototype.
  if (obj.tag && bbn.cp.tagExtensions[obj.tag]) {
    originalProto = bbn.cp.tagExtensions[obj.tag] + 'Cp';
  }

  // Define accepted attributes for the component.
  const acceptedAttr = bbn.cp.possibleAttributes
    .concat(bbn.cp.possibleAttributes.map(a => ':' + a))
    .concat(Object.keys(obj.props))
    .concat(Object.keys(obj.props).map(a => ':' + a));

  // Define the component class.
  window[`${proto}`] = class extends bbnCp {
    constructor(ele) {
      super(ele);
      // Set up component options.
      const options = bbn.fn.createObject({
        name: tag,
        _componentTag: tag,
        components: bbn.fn.createObject(),
        // Define a getter for propsData.
        get propsData() {
          if (this.$el) {
            return this.$el.bbnSchema?.props || {};
          }
          return {};
        }
      });

      // Set the tag if specified in the object.
      if (obj.tag) {
        options.tag = obj.tag;
      }

      // Define $options property.
      Object.defineProperty(this, '$options', {
        value: options,
        writable: false,
        configurable: false
      });

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
          bbn.cp.setComputed(this, n, obj.computed[n].get, obj.computed[n].set);
        }
      }

    }

    // Set up component properties.
    $setUpProps() {
      for (let n in obj.props) {
        const cfg = obj.props[n];
        setUpProp(this, n, cfg);
      }
    }

    // Define accepted attributes for the component.
    static acceptedAttributes = acceptedAttr;

    // Define static methods and properties.
    static {
      let res;
      const iface = bbn.fn.isFunction(obj.iface) ? obj.iface() : obj.iface || {};
      bbn.fn.each(obj.statics, f => {
        res = f(iface);
        if (res) {
          if (!bbn.fn.isObject(res)) {
            throw Error(bbn._("If the static method returns it must be an object"));
          }
          bbn.fn.iterate(res, (v, n) => {
            if (this[n] === undefined) {
              this[n] = bbnData.immunizeValue(v);
            }
            else {
              throw Error(bbn._("The static method cannot override an existing property"));
            }
          });
        }
      });
    }
  };

  // Define $methods property on the prototype.
  Object.defineProperty(window[proto].prototype, '$methods', {
    value: obj.methods,
    writable: false,
    configurable: false
  });

  // Define getters for each prop on the prototype.
  if (obj.props) {
    for (let n in obj.props) {
      Object.defineProperty(window[proto].prototype, n, {
        get() {
          return this.$props[n];
        }
      });
    }
  }

  // Bind methods to the prototype.
  if (obj.methods) {
    for (let n in obj.methods) {
      Object.defineProperty(window[proto].prototype, n, {
        get() {
          return this.$methods[n].bind(this);
        }
      });
    }
  }

  // Return the newly created class.
  return window[proto];
}
