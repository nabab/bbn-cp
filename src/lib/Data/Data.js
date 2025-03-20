/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnData/* extends EventTarget*/ {

  static isWatching = false;

  static watchStarted = false;

  static lastSequence = null;

  static watchSequence = [];
  
  static currentWatchers = [];

  static stoppers = [];

  static queue = [];

  static idx = 0;

  static isUpdating = 0;

  static updated = [];

  static toUpdate = [];

  #uid;

  #lastRequestedProp;

  path;

  /**
   * Constructor
   * @param {Object} data A regular object or array i.e. it mustn't be a class instance
   * @param {HTMLElement} component The bbn component that contains the data
   * @param {String} path The path of the data in the component
   * @param {bbnData} parent If the data is a sub-object of another bbnData object, the parent object
   */
  constructor(data, component, path, parent) {
    if (data instanceof bbnData) {
      throw new Error("bbnData cannot be initialized with a bbnData");
    }

    if (!(component instanceof HTMLElement)) {
      throw new Error("bbnData must be initialized with a bbn component");
    }

    if (!('bbnData' in component)) {
      component.bbnData = [];
    }

    component.bbnData.push(this);
    if (!data || (typeof data !== 'object') || ![undefined, Object, Array].includes(data.constructor)) {
      bbn.fn.log(data);
      throw new Error("The object given is not compatible with bbnData");
    }

    if (data?.__bbnData) {
      throw new Error("bbnData cannot be initialized multiple times");
    }

    if (parent && !(parent instanceof bbnData)) {
      throw new Error("parent must be a bbnData");
    }

    this.#uid = bbn.fn.randomString();
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
      configurable: true,
      writable: true,
      enumerable: false,
      value: this
    });

    /**
     * @var {Object|Array} targetData The original data object
     */
    Object.defineProperty(this, 'targetData', {
      get() {
        return data;
      }
    });

    /**
     * @var {String} path The original path
     */
    this.path = path;

    /**
     * @var {Proxy} value The proxy takes care of subreactivity
     */
    Object.defineProperty(this, 'value', {
      value: new Proxy(data, this.constructor.proxy(component, path, this)),
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
        path: this.path,
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

  setLastRequestedProp(prop) {
    this.#lastRequestedProp = prop;
  }

  getLastRequestedProp() {
    return this.#lastRequestedProp;
  }

  get root() {
    return this.refs[this.refs.length - 1]
  }

  get uid() {
    let path = '';
    if (this.root.component.path instanceof bbnAttr) {
      path = this.root.component.path.id;
    }
    else if (this.root.component.path) {
      path += this.root.component.path;
    }
    return this.root.component.$cid + '-' + (path ? path + '-' : '') + this.#uid;
  }
}
