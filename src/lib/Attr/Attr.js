import { bbn } from "@bbn/bbn";
/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnAttr
{

  /**
   * Constructor
   * @param {Object} data A regular object or array i.e. it mustn't be a class instance
   * @param {bbnCp} component The bbn component that contains the data
   * @param {String} path The path of the data in the component
   * @param {bbnData} parent If the data is a sub-object of another bbnData object, the parent object
   */
  constructor(def, node, name) {
    if (!def?.id || !node?.id) {
      throw Error("bbnAttr must be initialized with an id");
    }

    Object.defineProperty(this, 'id', {
      writable: false,
      configurable: false,
      value: def.id
    });

    if (name) {
      Object.defineProperty(this, 'name', {
        writable: name === '_default_',
        configurable: name === '_default_',
        value: name
      });
    }

    Object.defineProperty(this, 'node', {
      get() {
        return node;
      }
    });

    for (let n in def) {
      if (!Object.hasOwn(this, n)) {
        this[n] = def[n];
      }
    }

    if (!Object.hasOwn(this, 'hash')) {
      Object.defineProperty(this, 'hash', {
        writable: false,
        configurable: false,
        value: ''
      });
    }

    this.node.attributes.push(this);
  }

  get result() {
    if (!this.fn || !this.node?.component) {
      return null;
    }

    return this.node.component.$expResults?.[this.id]?.[this.node.hash || '_root'] || null;
  }

  get isLate() {
    if (!this.fn) {
      return false;
    }

    const r = this.node.component.$expResults;
    const hash = this.node.hash || '_root';
    return !r[this.id]?.[hash] || (r[this.id][hash].num <= this.node.component.$numBuild);
  }

  get isChanged() {
    return this.fn && (this.attrGetState() !== 'OK');
  }

}
