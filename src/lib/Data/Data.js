/**
 * Takes care of the data reactivity for non primitive values.
 */
import bbnAttr from "../Attr/Attr.js";
import bbnComputed from "../Computed.js";
import initResults from "../Html/private/initResults.js";

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

  static propagation = [];
  static propagationData = [];
  static propagationCp = [];

  static propagateDependencyChanges = function(cp, name) {
    let propagationFromHere = false;
  
    let arr = cp;
    if (arguments.length === 2) {
      arr = [{cp, name}];
    }
  
    let num = bbn.cp.numTicks;
    const todo = [];
    bbn.fn.each(arr, a => {
      let cp = a.cp;
      let name = a.name;
      if (!cp || !name) {
        throw new Error("Invalid arguments for propagateDependencyChanges");
      }
  
      if (cp.$deps[name]) {
        // The key for updating
        const dataObj = bbnData.getObject(cp[name]);
        if (dataObj) {
          if (bbnData.propagationData.includes(dataObj.uid)) {
            return;
          }
  
          bbnData.propagationData.push(dataObj.uid);
        }
  
        //bbn.fn.log("PROPAGATING DEPENDENCY CHANGES FOR " + name + " IN " + cp.$options.name + " " + cp.$cid);
        for (let i = 0; i < cp.$deps[name].length; i++) {
          const a = cp.$deps[name][i];
          if (bbnData.propagation.includes(a)) {
            continue;
          }
  
          const acp = a.component || a.node.component || cp;
          if (!bbnData.propagation.length) {
            if (!propagationFromHere) {
              bbn.cp.numTicks++;
              propagationFromHere = true;
            }
          }
  
          bbnData.propagation.push(a);
          if (!bbnData.propagationCp.includes(acp)) {
            initResults(acp);
            bbnData.propagationCp.push(acp);
          }
  
          //bbn.fn.log("PROPAGATION STARTED ON " + name, a);
          if (a instanceof bbnAttr || a instanceof bbnComputed) {
            todo.push({component: acp, element: a, num});
          }
          else {
            bbn.fn.log("UNKNOWN DEPENDENCY", a);
          }
        }
      }
    });
  
    bbn.cp.queueUpdate(...todo);
    if (propagationFromHere) {
      bbnData.propagation.splice(0);
      bbnData.propagationData.splice(0);
      bbnData.propagationCp.splice(0);
    }
    else if (!bbnData.propagation.length && bbnData.propagationData.length) {
      bbnData.propagationData.splice(0);
      bbnData.propagationCp.splice(0);
    }
  
  };

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

    component.$dataInstances.add(this);
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

    /**
     * @var {String} old The hash of the data object
     */
    Object.defineProperty(this, 'lastSubUpdate', {
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
