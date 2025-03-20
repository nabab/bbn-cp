import disconnected from './private/disconnected.js';
import createCid from "../../internals/createCid.js";
import tryMount from "./private/tryMount.js";
import init from './private/init.js';

class subcomponents
{
  #components;

  constructor(cp) {
    Object.defineProperty(this, 'cp', {
      value: cp,
      writable: false,
      configurable: false
    });
    this.#components = [];
  }

  add(ele) {
    if (!this.#components.includes(ele)) {
      this.#components.push(ele);
      tryMount(this.cp);
    }
  }

  remove(ele) {
    let idx = this.#components.indexOf(ele);
    if (idx > -1) {
      this.#components.splice(idx, 1);
      tryMount(this.cp);
    }
  }

  removeAll() {
    this.#components.splice(0, this.#components.length);
  }

  has(ele) {
    return this.#components.includes(ele);
  }

  clean() {
    let i = 0;
    while (this.#components[i]) {
      if (!this.#components[i].isConnected) {
        this.#components.splice(i, 1);
      }
      else {
        i++;
      }
    }
  }

  find(fn) {
    return bbn.fn.getRow(this.#components, fn);
  }

  get isOk() {
    return !this.#components.filter(a => !a.isConnected && (!a.bbn || !a.$isMounted)).length;
  }

  get queue() {
    return this.#components.filter(a => !a.bbn || !a.$isMounted)
  }

  get length() {
    return this.#components.length;
  }

}

const connect = cp => {
  if (!cp.$isInit && cp.bbnId && !cp.bbn) {
    cp.bbn = cp;
    if (cp.bbnConnected) {
      cp.$connected();
    }
  }
};


/**
 * Create the bbn component class which extends the HTMLElement class
 */
const bbnProtoHtml = {
  construct() {
    /* FOR SHADOW DOM
    let shadow;
    if ((this.tagName !== 'BBN-ANON') && this.attachShadow) {
      try {
        shadow = this.attachShadow({mode: 'open'});
      }
      catch (e) {
        bbn.fn.log("NO SHADOW FOR " + this.tagName);
      }
    }

    if (shadow) {
      shadow.adoptedStyle = [bbn.cp.stylesheet]
    }
    */

    Object.defineProperty(this, 'bbnCid', {
      value: createCid(),
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, 'bbnTmpSlots', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
    const tag = this.constructor.bbnTag;
    /**
     * A reference to the component Object (cp)
     */
    Object.defineProperty(this, '_self', {
      confifurable: false,
      writable: false,
      value: this
    });


    // This will become true after all is mounted
    Object.defineProperty(this, '$isInit', {
      value: false,
      writable: false,
      configurable: true
    });

    // This will become true after the data functions are launched and the data is set
    Object.defineProperty(this, '$isDataSet', {
      value: false,
      writable: false,
      configurable: true
    });

    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$isCreating', {
      value: false,
      writable: true,
      configurable: true
    });

    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$isUpdating', {
      value: null,
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, '$isCreated', {
      value: false,
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, '$isWatched', {
      value: false,
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, '$isDestroying', {
      value: false,
      writable: false,
      configurable: true
    });

    Object.defineProperty(this, '$isDestroyed', {
      value: false,
      writable: false,
      configurable: true
    });

    Object.defineProperty(this, '$isMounted', {
      value: false,
      writable: true,
      configurable: true
    });

    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$isUpdatingComputed', {
      value: false,
      writable: true,
      configurable: true
    });
    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$tagUsed', {
      value: [],
      writable: false,
      configurable: true
    });

    Object.defineProperty(this, '$props', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, '$propsCfg', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
  
  
    /**
     * Object of all the instance properties available directly in the HTML templates.
     * Indexed by name, the value being the type (data, prop, method, computed)
     * @return {Object}
     */
    Object.defineProperty(this, '$namespaces', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
    // Setting up basic props
    Object.defineProperty(this, '$el', {
      value: this,
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, '$node', {
      get() {
        return this.bbnSchema;
      }
    });
    Object.defineProperty(this, '$nodes', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    /**
     * Object of DOM building functions indexed on the template ids
     */
    Object.defineProperty(this, '$fns', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    /**
     * The class constructor
     */
    Object.defineProperty(this, '$cls', {
      value: this.constructor,
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, '$events', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    /**
     * Array of bbnComponentObject instances direct descendants of the current one
     * @return {Array}
     */
    Object.defineProperty(this, '$children', {
      value: [],
      writable: false,
      configurable: false
    });

    /**
     * Array of bbnComponentObject instances direct created by the current one
     * @return {Array}
     */
    Object.defineProperty(this, '$components', {
      value: new subcomponents(this),
      writable: false,
      configurable: false
    });

    /** @var {Object} $dataCfg The content of the data */
    Object.defineProperty(this, '$dataCfg', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, '$refsElements', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
    /**
     * Object referencing all the elements with ref prop
     * Indexed by name, value being the bbnComponentObject if it's a component a HTMLElement otherwise
     * @return {Object}
     */
    Object.defineProperty(this, '$refs', {
      configurable: false,
      writable: false,
      value: new Proxy(this.$refsElements, {
        get(target, propName) {
          let tmp = target[propName];
          if (tmp) {
            if (bbn.fn.isArray(tmp)) {
              return tmp.filter(a => a.isConnected)
                .map(a => a.bbn || a);
            }

            return tmp.isConnected ? (tmp.bbn || tmp) : null;
          }
        }
      })
    });

    /**
     * Component configuration object
     */
    Object.defineProperty(this, '$cfg', {
      get() {
        return this.bbnCfg || this.constructor.bbnCfg;
      }
    });
  
    // Alias for accessing slots directly
    Object.defineProperty(this, '$dataValues', {
      get() {
        const obj = bbn.fn.createObject();
        bbn.fn.iterate(this.$dataCfg, (a, n) => {
          obj[n] = a.value;
        });
        return obj;
      }
    });
  },

  connectedCallback() {
    // Adding itself to the global static #components
    const tag = this.constructor.bbnTag;
    if (bbn.cp.statics[tag] || (tag === 'bbn-anon')) {
      connect(this);
    }
    else {
      const listener = document.addEventListener('bbn-loaded-' + tag, () => {
        connect(this);
      }, {once: true});
    }
  },

  disconnectedCallback() {
    return disconnected(this);
  },

  attributeChangedCallback(name, oldValue, newValue) {
    return bbn.cp.attributeChangedCallback(this, name, oldValue, newValue);
  },

  $hasSlots(name = 'default') {
    let res = false;
    if (this.$slots[name]) {
      bbn.fn.each(this.$slots[name], e => {
        if (e && !bbn.fn.isComment(e)) {
          res = true;
          return false;
        }
      });
    }

    return res;
  },

  /**
   * Return the function bbn._ for the strings' translation.
   * @method _
   * @return {Function}
   */
  _() {
    return bbn._(...arguments);
  },

  /**
  * Returns the given ref (will return $refs[name] or $refs[name][0])
  * @method getRef
  * @param {String} name
  * @fires bbn.cp.getRef
  * @return {Function}
  */
  getRef(name) {
    return bbn.fn.isArray(this.$refs[name]) ? this.$refs[name][0] : this.$refs[name];
  },

  /**
  * Returns the closest component matching the given selector
  * @method closest
  * @param {String} selector
  * @param {Boolean} checkEle
  * @return {Function}
  */
  closest(selector, checkEle) {
    let ele = checkEle ? this.$el : this.$el.parentNode;
    let letters = selector.split('');
    if (!['.', '#', '[', ':'].filter(c => letters.includes(c)).length) {
      selector += ',*[is=' + selector + ']';
    }

    while (ele instanceof HTMLElement) {
      if (ele.matches(selector)) {
        return ele.bbn || ele;
      }
      
      ele = ele.bbnPortal || ele.parentNode || null;
    }
  },

  /**
  * Returns an array of parent components until $root
  * @method ancestors
  * @param {String} selector
  * @param {Boolean} checkEle
  * @return {Function}
  */
  ancestors(selector, checkEle) {
    let res = [];
    let ele = this.closest(selector, checkEle);
    while (ele) {
      res.push(ele);
      ele = ele.closest(selector);
    }

    return res;
  },

  /**
  * Fires the function bbn.cp.find.
  * @method find
  * @param {String} selector
  * @param {Number} index
  * @return {Function}
  */
  find(selector, index) {
    const letters = selector.split('');
    if (!['.', '#', '[', ':'].filter(c => letters.includes(c)).length) {
      bbn.fn.each(selector.split(','), a => {
        selector += ',*[is=' + a + ']';
      });
    }

    if (index) {
      selector += ':nth-of-type(' + index + ')';
    }

    return this.$el.querySelector(selector)?.bbn;
  },


  /**
  * Fires the function bbn.cp.findAll.
  * @method findAll
  * @param {String} selector 
  * @param {Boolean} only_children 
  * @return {Function}
  */
  findAll(selector, only_children) {
    const letters = selector.split('');
    if (!['.', '#', '[', ':'].filter(c => letters.includes(c)).length) {
      bbn.fn.each(selector.split(','), a => {
        selector += ',*[is=' + a + ']';
      });
    }

    if (only_children) {
      let res = [];
      Array.from(this.childNodes).forEach(a => {
        if (a.tagName && a.matches(selector)) {
          res.push(a.bbn);
        }
      });
      return res;
    }

    return Array.from(this.$el.querySelectorAll(selector)).map(a => a.bbn);
  },


  /**
  * @method extend
  * @param {Boolean} selector
  * @param {Object} source The object to be extended
  * @param {Object} obj1
  * @return {Object}
  */
  extend(deep, src, obj1) {
    // to do?
  },


  /**
  * Fires the function bbn.cp.getComponents.
  * @method getComponents
  * @param {Array} ar 
  * @param {Boolean} only_children 
  * @return {Function}
  */
  getComponents(ar, only_children) {
    if (only_children) {
      return Array.from(this.childNodes).filter(a => !!a._bbn);
    }
    else {
      return this.querySelectAll('*').filter(a => !!a._bbn);
    }
  },


  /**
   * Returns a component name based on the name of the given component and a path.
   * @method getComponentName
   * @memberof bbn.cp
   */
  getComponentName() {
    return this.$options.name;
  },

  get $rootPath() {
    let st = this.bbnId;
    if (this.$origin) {
      st = this.$origin.$rootPath + '/' + st;
    }

    return st;
  }
}

export default bbnProtoHtml;
