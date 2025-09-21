/**
 * Takes care of the data reactivity for non primitive values.
 */
import bbnResult from '../Result.js';
export default class bbnAttr
{
  #id;
  #node;
  #name;
  #hash = '';
  #lastRequest = 0;
  #lastUpdate = 0;
  #lastChange = 0;

  setLastRequest() {
    this.#lastRequest = bbn.cp.numTicks;
  }
  
  setLastUpdate() {
    this.#lastUpdate = bbn.cp.numTicks;
  }

  setLastChange() {
    this.#lastChange = bbn.cp.numTicks;
  }

  get lastRequest() {
    return this.#lastRequest;
  }

  get lastUpdate() {
    return this.#lastUpdate;
  }

  get lastChange() {
    return this.#lastChange;
  }

  /**
   * Constructor
   * @param {Object} data A regular object or array i.e. it mustn't be a class instance
   * @param {HTMLElement} component The bbn component that contains the data
   * @param {String} path The path of the data in the component
   * @param {bbnData} parent If the data is a sub-object of another bbnData object, the parent object
   */
  constructor(def, node, name) {
    if (!def?.id || !node?.id) {
      throw new Error("bbnAttr must be initialized with an id");
    }

    this.#id = def.id;
    this.#node = node;
    this.#name = name || '_default_';

    for (let n in def) {
      if (!(n in this)) {
        this[n] = def[n];
        //bbn.fn.log(["DEFINING ATTR", n, this[n], this]);
      }
    }

    Object.defineProperty(this, 'result', {
      writable: false,
      configurable: false,
      value: new bbnResult(this.value)
    });

    Object.defineProperty(this, 'ownDeps', {
      writable: false,
      configurable: false,
      value: []
    });

    this.node.attributes.push(this);
  }

  get id() {
    return this.#id;
  }

  get node() {
    return this.#node;
  }

  get name() {
    return this.#name;
  }

  set name(v) {
    if (this.#name === '_default_') {
      this.#name = v;
    }
  }

  get hash() {
    return this.#hash;
  }

  get isLate() {
    if (!this.attrFn) {
      return false;
    }

    return !this.#lastUpdate || (this.#lastRequest > this.#lastUpdate);
  }

  get isChanged() {
    return this.attrFn && (this.attrGetState() !== 'OK');
  }

  get state() {
    return this.result?.state;
  }

  get uid() {
    return this.node.uid + '-' + this.name;
  }
}

