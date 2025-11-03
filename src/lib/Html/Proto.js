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
      if (!this.#components[i].$isDestroyed) {
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
    return !this.#components.filter(a => !a.$isDestroyed && (!a.bbn || !a.$isMounted)).length;
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

    this.bbnCid = createCid();
    this.bbnTmpSlots = bbn.fn.createObject();
    const tag = this.constructor.bbnTag;
    this.$tagUsed = [];

    this.$props = bbn.fn.createObject();
    this.$propsCfg = bbn.fn.createObject();
    this.$namespaces = bbn.fn.createObject();
    this.$nodes = bbn.fn.createObject();
    this.$events = bbn.fn.createObject();
    this.$children = [];
    this.$dataCfg = bbn.fn.createObject();
    this.$refsElements = bbn.fn.createObject();
    this.$components = new subcomponents(this),
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

    return this.$el.querySelector(selector);
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

    return Array.from(this.$el.querySelectorAll(selector));
  },

  findAllByKey(key, selector) {
    const arr = this.findAll(selector);
    return arr.filter(a => a.bbnSchema?.props?.key === key);
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
   * @method $getName
   * @memberof bbn.cp
   */
  $getName() {
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
