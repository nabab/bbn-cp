import disconnected from './private/disconnected.js';
import createCid from "../../internals/createCid.js";
import bbnRegistered from "../Registered.js";

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
    this.$props = bbn.fn.createObject();
    this.$propsCfg = bbn.fn.createObject();
    this.$namespaces = bbn.fn.createObject();
    this.$nodes = bbn.fn.createObject();
    this.$events = bbn.fn.createObject();
    this.$children = [];
    this.$dataCfg = bbn.fn.createObject();
    this.$refsElements = bbn.fn.createObject();
    this.$components = new bbnRegistered(this),
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
    if (!selector || (selector === '*')) {
      return this.bbnPortal || this.$parent || this.parentNode || null;
    }

    let ele = checkEle ? this : this.parentNode;
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
      if (res.includes(ele)) {
        break;
      }
      else {
        res.push(ele);
        ele = ele.closest(selector);
      }
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
}

export default bbnProtoHtml;
