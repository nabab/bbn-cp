import { bbn } from "@bbn/bbn";

/**
 * Takes care of the data reactivity for non primitive values.
 */
class bbnData/* extends EventTarget*/ {

  static lastSequence = null;

  static inventory = bbn.fn.createObject();

  static watchSequence = [];

  static isWatching = false;

  static watchStarted = false;

  static stoppers = [];

  static queue = [];

  #uid;
  /**
   * Constructor
   * @param {Object} data A regular object or array i.e. it mustn't be a class instance
   * @param {bbnCp} component The bbn component that contains the data
   * @param {String} path The path of the data in the component
   * @param {bbnData} parent If the data is a sub-object of another bbnData object, the parent object
   */
  constructor(data, component, path, parent) {
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

    this.#uid = bbn.fn.randomString();
    /**
     * @var {Symbol} id The unique id of the bbnData object
     */
    const id = Symbol();
    // The object is added to the data inventory
    bbnData.inventory[id] = this;
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
     * @var {Object|Array} targetData The original data object
     */
    Object.defineProperty(this, 'targetData', {
      value: data,
      writable: false,
      configurable: true
    });

    /**
     * @var {String} path The original path
     */
    Object.defineProperty(this, 'path', {
      value: path,
      writable: false,
      configurable: false
    });

    /**
     * @var {Proxy} value The proxy takes care of subreactivity
     */
    Object.defineProperty(this, 'value', {
      value: new Proxy(this.targetData, this.constructor.proxy(component, path, this)),
      writable: false,
      configurable: true
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
    Object.defineProperty(this, 'lastUpdate', {
      value: 0,
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, 'deps', {
      value: bbn.fn.createObject({
        __bbnRoot: []
      }),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'refs', {
      value: [{
        component,
        path: typeof path !== 'string' ? path.toString() : path,
        root: true,
        parent: parent || null
      }],
      writable: false,
      configurable: false
    });

    // If the object has a parent, the current object is added to the parent's children
    if (parent) {
      //bbn.fn.log(bbn._("ADDING CHILDREN for %s : %s", path.toString ? path.toString() : path || '<unknown>', JSON.stringify(this.targetData)))
      parent.children.push(this);
    }

  }

  get root() {
    return this.refs[this.refs.length - 1]
  }

  get uid() {
    return this.root.component.$cid + '-' + this.root.component.path + '-' + this.#uid;
  }
}


export default bbnData;
