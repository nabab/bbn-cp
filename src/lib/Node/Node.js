import bbnFacade from "../Facade.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnNode
{
  #comment = false;
  #realElement = null;
  numBuild = 0;
  oldElement = null;
  isSVG = false;
  isBuilding = false;
  /**
   * Constructor
   * @param {Object} node
   * @param {HTMLElement} cp
   * @param {String} id
   * @param {String} hash
   */
  constructor(node, cp, parent, root, rootHash, hash, data) {
    if (parent?.isSVG) {
      Object.defineProperty(this, 'isSVG', {
        writable: false,
        configurable: false,
        value: true
      });
    }

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
    
    if (!(cp instanceof HTMLElement) || !node || (typeof hash !== 'string')) {
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

    const realProps = bbn.fn.createObject();
    Object.defineProperty(this, 'props', {
      writable: false,
      configurable: false,
      value: new Proxy(realProps, {
        set: (obj, prop, val) => {
          if (obj[prop] !== val) {
            obj[prop] = val;
          }

          return true;
        },
        get: (obj, prop) => {
          bbnData.addSequence(cp, prop);
          return obj[prop];
        },
        deleteProperty: (obj, prop) => {
          if (prop in obj) {
            delete obj[prop];
          }
          return true;
        }

      })
    });

    Object.defineProperty(this, 'element', {
      get() {
        if (this.#realElement) {
          if ((this.isComponent && this.#realElement.$isDestroyed) || (this.component.$isDestroyed)) {
            this.#realElement = null;
          }
        }

        return this.#realElement;
      },
      set(v) {
        this.#realElement = v;
      }
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

    Object.defineProperty(this, 'classes', {
      writable: false,
      configurable: false,
      value: bbn.fn.createObject()
    });

    Object.defineProperty(this, 'styles', {
      writable: false,
      configurable: false,
      value: bbn.fn.createObject()
    });

    if (data) {
      Object.defineProperty(this, 'data', {
        value: new bbnFacade(this, data),
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

  get isDestroyed() {
    if (this.hash) {
      return !this.component?.$nodes?.[this.id]?.[this.hash];
    }

    return !this.component?.$nodes?.[this.id];
  }

  get isValid() {
    if (this.root === false) {
      return true;
    }

    return this.root.loop.list.includes(this.rootHash);
  }

  get comment() {
    if (['template', 'transition', 'slot'].includes(this.tag)) {
      return true;
    }

    return this.#comment;
  }

  get uid() {
    return this.component.$rootPath + '_' + (this.hash ? this.hash + '-' : '') + this.id;
  }

  nodeSwitch(v) {
    if (this.#comment !== !!v) {
      if (this.directives && v) {
        for (let n in this.directives) {
          if (this.directives[n].inserted) {
            this.directives[n].inserted = false;
          }
        }
      }
      //bbn.fn.log(["SET COMMENT", v, this.#comment, this.element, this.id, this]);
      this.#comment = !!v;
      if (this.numBuild) {
        return this.nodeInit();
      }
    }

    return false;
  }

  hasStillContent() {
    const cp = this.component;
    if (cp?.isConnected) {
      const node = this.hash ? cp.$nodes[this.id][this.hash] : cp.$nodes[this.id];
      return (node === this) && (!this.condition || !!this.condition.value);
    }

    return false;
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
        tag = this.component.$cfg.components[index]?.tag || this.component.$cfg.componentNames[index];
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

