import { bbn } from "@bbn/bbn";

/**
 * Takes care of the data reactivity for non primitive values.
 */
class bbnData/* extends EventTarget*/ {

  /**
   * Returns a unique identifier from any type of value (hashes only simple objects and arrays)
   * 
   * @param {*} v Value to hash
   * @returns {String} The hash
   */
  static hash = bbn.fn.hash;

  static inventory = new Map();

  static watchSequence = [];

  static isWatching = false;

  static watchStarted = false;

  static lastSequence = null;

  static stoppers = [];

  static startWatching() {
    const currentSequence = this.watchSequence.splice(0, this.watchSequence.length);
    this.stoppers.push(() => {
      this.watchSequence.splice(0, 0, ...currentSequence);
    });
    if (!this.isWatching) {
      this.lastSequence = null;
    this.isWatching = true;
  }
  }

  static stopWatching() {
    const res = this.watchSequence.splice(0, this.watchSequence.length);
    this.lastSequence = res.length ? res[res.length - 1] : null;
    this.stoppers.pop()();
    this.isWatching = !!this.stoppers.length;
    return res;
  }

  static getLastUsed() {
    return this.lastSequence;
  }

  static addSequence(cp, name, data) {
    if (this.watchStarted && (bbn.fn.isString(name) || bbn.fn.isInt(name))) {
      this.watchSequence.push({cp, name, data});
    }
  }


  /**
   * Constructor
   * @param {Object} data A regular object or array i.e. it mustn't be a class instance
   * @param {bbnCp} component The bbn component that contains the data
   * @param {String} path The path of the data in the component
   * @param {bbnData} parent If the data is a sub-object of another bbnData object, the parent object
   */
  constructor(data, component, path, parent) {
    //super();
    if (path === 'computed') {
      bbn.fn.log([component, path, parent, data]);
      throw Error("bbnData cannot be initialized with a computed property");
    }

    if (data instanceof bbnData) {
      throw Error("bbnData cannot be initialized with a bbnData");
    }

    if (!(component instanceof bbnCp)) {
      throw Error("bbnData must be initialized with a bbn component");
    }

    if (!data || (typeof data !== 'object') || ![undefined, Object, Array].includes(data.constructor)) {
      bbn.fn.log(data);
      throw Error("The object given is not compatible with bbnData");
    }

    if (data?.__bbnData) {
      throw Error("bbnData cannot be initialized multiple times");
    }

    if (parent && !(parent instanceof bbnData)) {
      throw Error("parent must be a bbnData");
    }

    /**
     * @var {Symbol} id The unique id of the bbnData object
     */
    const id = Symbol();
    // The object is added to the data inventory
    bbnData.inventory.set(id, this);
    Object.defineProperty(this, 'id', {
      writable: false,
      configurable: false,
      value: id
    });

    /**
     * @var {Array} children The children bbnData objects (which have this object as parent)
     */
    Object.defineProperty(this, 'children', {
      value: [],
      writable: false,
      configurable: false
    });

    /**
     * @var {Symbol} __bbnData The special property added to the data object to identify it as being part of a bbnData object
     */
    Object.defineProperty(data, '__bbnData', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: this.id
    });

    /**
     * @var {Object|Array} data The original data object
     */
    Object.defineProperty(this, 'data', {
      value: data,
      writable: false,
      configurable: true
    });

    /**
     * @var {Proxy} value The proxy takes care of subreactivity
     */
    Object.defineProperty(this, 'value', {
      value: new Proxy(this.data, this.constructor.proxy(component, path, this)),
      writable: false,
      configurable: false
    });

    /**
     * @var {Boolean} isArray If the data is an array
     */
    Object.defineProperty(this, 'isArray', {
      value: data instanceof Array,
      writable: false,
      configurable: true
    });

    /**
     * @var {String} old The hash of the data object
     */
    Object.defineProperty(this, 'old', {
      value: bbn.fn.hash(data),
      writable: true,
      configurable: true
    });

    /**
     * @var {Object} components The components that use this data object, indexed by their unique id (cid)
     */
    Object.defineProperty(this, 'components', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'deps', {
      value: [],
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'refs', {
      value: [],
      writable: false,
      configurable: false
    });

    this.refs.push({
      component,
      path,
      root: true,
      parent: parent || null
    });

    if (component.$values.indexOf(this.id) === -1) {
      component.$values.push(this.id);
    }

    // If the object has a parent, the current object is added to the parent's children
    if (parent) {
      //bbn.fn.log(bbn._("ADDING CHILDREN for %s : %s", path.toString ? path.toString() : path || '<unknown>', JSON.stringify(this.data)))
      parent.children.push(this);
    }

  }
}

export default bbnData;