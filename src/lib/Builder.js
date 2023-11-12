import { bbn } from "@bbn/bbn";


/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBuilder/* extends EventTarget*/ {
  constructor(cp, tpl) {
    if (bbn.fn.numProperties(cp.$fns)) {
      throw new Error("The component's functions have already been generated");
    }

    this.cp = cp;
    Object.defineProperty(this, 'tpl', {
      value: tpl,
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, 'argNames', {
      value: [],
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, 'argValues', {
      value: [],
      writable: false,
      configurable: false
    });
    this.environment();
    this.treat(tpl, cp.$fns);


    // If the element merges with its root, it happens here and the template will change
    const template = this.root(tpl);
  
    // Taking care of the whole template
    this.build(template);


  
    // Inserting root elements last
    bbn.fn.each($_final, a => {
      $_this.$insertElement(a.ele, $_this.$el, a.position);
    })
    return $_res;
      
    const AsyncFunction = async function () {}.constructor;
    return new AsyncFunction('$_this', x.get(true));
  
  }

  treat (nodes) {
    bbn.fn.each(nodes, (a, i) => {
      a.names = [];
      if (a.attr) {
      }
      
      if (a.items) {
        this.treat(a.items);
      }
    });
  }
  
  // _setInternalResult
  sr(_name, _exp, _hash) {
    return $_this.$_setInternalResult($_res, _name, _exp, _hash);
  }

  // _getInternalState
  gs(_name, _hash) {
    return $_this.$_getInternalState($_res, _name, _hash);
  }

  // _getInternalValue
  gv(_name, _hash) {
    let val = undefined;
    try {
      val = $_this.$_getInternalValue($_res, _name, _hash);
    } catch (e) {
      bbn.fn.log(["THERE SHOULD BE AN ERROR", _name, _t]);
    }
    return val;
  }
}

