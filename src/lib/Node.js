import bbnFacade from "./Facade.js";

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

  get uid() {
    return this.component.$rootPath + '_' + (this.hash ? this.hash + '-' : '') + this.id;
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
