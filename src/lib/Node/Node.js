// Class representing a data facade that interacts with a node's data and allows access to it through proxy methods.
class bbnDataFacade {
  __bbn_node; // The node associated with this data facade.
  __bbn_data; // The data object stored in this facade.
  __bbn_keys; // The keys of the data object.

  // Constructor initializing the node and data. Optionally accepts data and initializes keys.
  constructor(node, data) {
    this.__bbn_node = node; // Assign the node to the class instance.
    this.__bbn_data = bbn.fn.createObject(); // Initialize data object.

    // If data is provided, assign it and set the keys from the data object.
    if (data) {
      this.__bbn_data = data;
      this.__bbn_keys = Object.keys(data);
    }
    else {
      // If no data, initialize an empty keys array.
      this.__bbn_keys = [];
    }

    // Return a Proxy to intercept get, set, and has operations on this instance.
    return new Proxy(this, {
      // Intercept get operations and call the `get` method.
      get(target, key) {
        return target.get(key);
      },
      // Intercept set operations and call the `set` method.
      set(target, key, value) {
        target.set(key, value);
        return true;
      },
      // Intercept has operations and call the `has` method.
      has(target, key) {
        return target.has(key);
      }
    });
  }

  // Retrieves the value for the given key, checking the node's data and its parents.
  get(key) {
    // If the key is a private class key, return its corresponding value directly.
    if (key.indexOf('__bbn_') === 0) {
      return this[key];
    }

    // Start from the current node and traverse up through parent nodes.
    let node = this.__bbn_node;
    while (node) {
      // If node has data and the key exists in its data, return the value.
      if (node.hasData && (node.data.__bbn_keys.indexOf(key) > -1)) {
        const dataObj = bbnData.getObject(node.data.__bbn_data[key]);
        
        // If the value is a data object, add it to the sequence for the component.
        if (dataObj) {
          bbnData.addSequence(node.component, '', dataObj);
        }

        return node.data.__bbn_data[key];
      }

      // Move to the parent node.
      node = node.parent;
    }

    // If key is not found, return undefined.
    return undefined;
  }

  // Sets the value for the given key, updating the value in the current node and its parents.
  set(key, value) {
    bbn.fn.log("SET DATA IN NODE");

    let node = this.__bbn_node;
    let firstData; // To store the first data object encountered while traversing parent nodes.

    while (node) {
      // If this is the first node with data, store its data object.
      if (!firstData && node.hasData) {
        firstData = node.data.__bbn_data;
      }

      // If the node has data and the key exists, update the value.
      if (node.hasData && (node.data.__bbn_keys.indexOf(key) > -1)) {
        node.data.__bbn_data[key] = value;
      }

      // Move to the parent node.
      node = node.parent;
    }

    // If a data object was found in the ancestors, update its value.
    if (firstData) {
      firstData[key] = value;
    }
  }

  // Checks if the given key exists in the current data or in any parent nodes.
  has(key) {
    // If the key is in the current data, return true.
    if (this.__bbn_keys.indexOf(key) > -1) {
      return true;
    }

    // Start from the parent node and traverse up through the parent nodes.
    let node = this.__bbn_node.parent;
    while (node) {
      // If the node has data and contains the key, return true.
      if (node.hasData && (key in node.data)) {
        return true;
      }

      // Move to the parent node.
      node = node.parent;
    }

    // If key is not found, return false.
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
  element = null;
  oldElement = null;
  /**
   * Constructor
   * @param {Object} node
   * @param {bbnCp} cp
   * @param {String} id
   * @param {String} hash
   */
  constructor(node, cp, parent, root, rootHash, hash, data) {
    if (!bbnNode.root) {
      // The very first node to be built is the root of the app
      Object.defineProperty(bbnNode, 'root', {
        value: this,
        writable: false,
        configurable: false
      });
      // The very first will have an individual root for loops set to false
      // So next nodes will follow until the first loop opens up
      Object.defineProperty(this, 'root', {
        writable: false,
        configurable: false,
        value: false
      });
    }
    else {
      Object.defineProperty(this, 'root', {
        writable: false,
        configurable: false,
        value: root
      });
    }
    
    Object.defineProperty(this, 'rootHash', {
      writable: false,
      configurable: false,
      value: rootHash
    });
    
    if (!(cp instanceof bbnCp) || !node || (typeof hash !== 'string')) {
      throw new Error("Invalid arguments");
    }

    if (hash) {
      if (!cp.$nodes[node.id]) {
        cp.$nodes[node.id] = bbn.fn.createObject();        
      }
      if (cp.$nodes[node.id][hash]) {
        throw new Error("Node already exists");
      }
      cp.$nodes[node.id][hash] = this;
    }
    else {
      if (cp.$nodes[node.id]) {
        throw new Error("Node already exists");
      }
      cp.$nodes[node.id] = this;
    }
  
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

    this.nodeDefine(node);
  }

  get template() {
    return this.component.$currentMap[this.id];
  }

  get isCommented() {
    return this.#comment;
  }

  get isOut() {
    return this.parent && !this.parentElement && !this.parent?.isComponent;
  }

  get isValid() {
    if (this.root === false) {
      return true;
    }

    return this.root.loop.list.includes(this.rootHash);
  }

  get comment() {
    if (['template', 'transition'].includes(this.tag)) {
      return true;
    }

    return this.#comment;
  }

  setComment(v) {
    if (this.#comment !== !!v) {
      //bbn.fn.log(["SET COMMENT", v, this.#comment, this.id, this, this.component.$options.name]);
      this.#comment = !!v;
      if (this.element && (bbn.fn.isComment(this.element) !== this.#comment)) {
        if (this.#comment) {
          for (let n in this.props) {
            delete this.props[n];
          }

          if (this.isComponent && this.component.$components.includes(this.element)) {
            this.component.$components.splice(this.component.$components.indexOf(this.element), 1);
          }
        }

        return this.nodeInit();
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
      let index = Object.values(this.component?.$cfg?.componentNames || []).indexOf(this.tag);
      // Determine the tag name, adjusting for custom components if necessary
      let tag = this.tag;
      if (bbn.cp.tagAliases[this.tag]) {
        tag = bbn.cp.tagAliases[this.tag];
      }
      else if (index > -1) {
        index = Object.keys(this.component?.$cfg?.componentNames)[index];
        tag = this.component.$cfg.components[index].tag || this.component.$cfg.componentNames[index];
      }
      else if (this.attr?.is) {
        tag = this.attr.is.attrGetValue();
        if (bbn.fn.isObject(tag)) {
          tag = tag.tag || tag.name || 'bbn-anon';
        }
      }

      return tag;
    }

    return null;
  }
}
