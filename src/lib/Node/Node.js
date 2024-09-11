import bbn from "@bbn/bbn";
import removeDOM from "../Cp/private/removeDOM.js";

class bbnDataFacade {
  __bbn_node;
  __bbn_data;
  __bbn_keys;

  constructor(node, data) {
    this.__bbn_node = node;
    this.__bbn_data = bbn.fn.createObject();
    if (data) {
      this.__bbn_data = data;
      this.__bbn_keys = Object.keys(data);
    }
    else {
      this.__bbn_keys = [];
    }

    return new Proxy(this, {
      get(target, key) {
        return target.get(key);
      },
      set(target, key, value) {
        target.set(key, value);
        return true;
      },
      has(target, key) {
        return target.has(key);
      }
    });
  }


  *[Symbol.iterator]() {
    let node = this.__bbn_node;
    const done = [];
    bbn.fn.log("KEYS", keys);
    while (node) {
      if (node.hasData) {
        const keys = node.data.__bbn_keys();
        for (let i = 0; i < keys.length; i++) {
          if (done.indexOf(keys[i]) === -1) {
            done.push(keys[i]);
            yield keys[i];
          }
        }
      }

      node = node.parent;
    }
  }

  get(key) {
    if (key.indexOf('__bbn_') === 0) {
      return this[key];
    }

    let node = this.__bbn_node;
    while (node) {
      if (node.hasData && (node.data.__bbn_keys.indexOf(key) > -1)) {
        const dataObj = bbnData.getObject(node.data.__bbn_data[key]);
        if (dataObj) {
          bbnData.addSequence(node.component, '', dataObj);
        }

        return node.data.__bbn_data[key];
      }

      node = node.parent;
    }

    return undefined;
  }

  set(key, value) {
    let node = this.__bbn_node;
    let firstData;
    while (node) {
      if (!firstData && node.hasData) {
        firstData = node.data.__bbn_data;
      }

      if (node.hasData && (node.data.__bbn_keys.indexOf(key) > -1)) {
        node.data.__bbn_data[key] = value;
      }

      node = node.parent;
    }

    if (firstData) {
      firstData[key] = value;
    }
  }


  has(key) {
    if (this.__bbn_keys.indexOf(key) > -1) {
      return true;
    }

    let node = this.__bbn_node.parent;
    while (node) {
      if (node.hasData && (key in node.data)) {
        return true;
      }

      node = node.parent;
    }

    return false;
  }
}

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnNode
{
  #comment = false;
  numBuild = 0;
  /**
   * Constructor
   * @param {Object} node
   * @param {bbnCp} cp
   * @param {String} id
   * @param {String} hash
   */
  constructor(node, cp, parent, hash, data) {
    if (!bbnNode.root) {
      Object.defineProperty(bbnNode, 'root', {
        value: this,
        writable: false,
        configurable: false
      });
    }
    
    bbn.fn.checkType(cp, bbnCp);
    bbn.fn.checkType(node, Object);
    bbn.fn.checkType(hash, String);
  
    Object.defineProperty(this, 'id', {
      writable: false,
      configurable: false,
      value: node.id
    });

    Object.defineProperty(this, 'hash', {
      writable: false,
      configurable: false,
      value: hash
    });

    Object.defineProperty(this, 'attributes', {
      writable: false,
      configurable: false,
      value: []
    });

    Object.defineProperty(this, 'props', {
      writable: false,
      configurable: false,
      value: bbn.fn.createObject()
    });

    Object.defineProperty(this, 'items', {
      get() {
        return this.component.$currentMap[this.id].items
      }
    });

    Object.defineProperty(this, 'parent', {
      writable: false,
      configurable: false,
      value: parent
    });

    Object.defineProperty(this, 'component', {
      writable: false,
      configurable: false,
      value: cp
    });

    Object.defineProperty(this, 'deps', {
      writable: false,
      value: []
    });

    Object.defineProperty(this, 'hasData', {
      value: !!data,
      writable: false
    });

    if (data) {
      Object.defineProperty(this, 'data', {
        value: new bbnDataFacade(this, data),
        writable: false
      });
    }

    this.define(node);
  }

  get template() {
    return this.component.$currentMap[this.id];
  }

  get element() {
    return this.component.$retrieveElement(this.id, this.hash);
  }

  get isCommented() {
    return this.#comment;
  }

  get isOut() {
    return this.parent && !this.parentElement && !this.parent?.isComponent;
  }

  get comment() {
    if (['template', 'transition'].includes(this.tag)) {
      return true;
    }

    return this.#comment;
  }

  async setComment(v) {
    if (this.#comment !== v) {
      this.#comment = v;
      if (this.element && (bbn.fn.isComment(this.element) !== !!this.comment)) {
        if (this.parentElement) {
          await this.init();
        }
        else {
          removeDOM(this.component, this.element);
        }
      }
    }
  }




  setData(data) {
    bbn.fn.log("SET DATA COMMENTED");
    /*
    if (!this.data[this.id] || !bbn.fn.isSame(this.data[this.id], data)) {
      this.data[this.id] = data;
    }
      */
  }


  get isComponent() {
    return !this.comment && this.component && this.component.$isComponent(this);
  }


  get realTag() {
    if (this.tag) {
      // Determine the tag name, adjusting for custom components if necessary
      let tag = this.tag;
      if ((tag === this.component.$options.name) && this.component.$cfg.tag) {
        tag = this.component.$cfg.tag;
      }
      else if (this.attr?.is) {
        tag = this.attr.is.getValue();
        if (bbn.fn.isObject(tag)) {
          tag = tag.tag || tag.name || 'bbn-anon';
        }
      }
      else if (this.component.$cfg.componentNames[tag]) {
        tag = this.component.$cfg.componentNames[tag];
      }

      return tag;
    }

    return null;
  }
}
