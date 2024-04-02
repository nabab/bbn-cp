import { bbn } from "@bbn/bbn";
import setExpResult from "../Cp/private/setExpResult.js";
import getExpState from "../Cp/private/getExpState.js";
import getExpValue from "../Cp/private/getExpValue.js";


/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnBuilder/* extends EventTarget*/ {
  constructor(cp, tpl) {
    if (bbn.fn.numProperties(cp.$fns)) {
      throw Error("The component's functions have already been generated");
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
    bbn.fn.log(this.argNames);
    let current;
    const loopVars = {};
    const expToFn = (a, node) => {
      if (a.exp) {
        const deps = [];
        bbn.fn.each(this.argNames, arg => {
          if (a.exp.match(new RegExp('\\b' + bbn.fn.escapeRegExp(arg) + '\\b'))) {
            deps.push(arg);
          }
        });
        const args = deps.slice();
        bbn.fn.iterate(loopVars, (v, k) => {
          if (node.id.indexOf(k) === 0) {
            args.push(...v);
          }
        });
        a.fn = new Function(...args, 'return ' + a.exp);
        a.args = args;
        return args;
      }
    };

    bbn.fn.iterate(cp.$currentMap, node => {
      if (node.loop) {
        loopVars[node.id] = [
          ...node.loop.item ? [node.loop.item] : [],
          ...node.loop.index ? [node.loop.index] : []
        ];
      }

      node.dependencies = [];
      if (node.loop) {
        const args = expToFn(node.loop, node);
        node.dependencies.push(...args);
      }

      if (node.condition) {
        const args = expToFn(node.condition, node);
        node.dependencies.push(...args);
      }

      if (node.attr) {
        bbn.fn.iterate(node.attr, a => {
          if (a.exp) {
            const args = expToFn(a, node);
            node.dependencies.push(...args);
          }
        });
      }
      else if (node.exp) {
        const args = expToFn(node, node);
        node.dependencies.push(...args);
      }
    });

    return;


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
  
  sr(_name, _exp, _hash) {
    return setExpResult($_this, _name, _exp, _hash);
  }

  gs(_name, _hash) {
    return getExpState($_this, _name, _hash);
  }

  gv(_name, _hash) {
    let val = undefined;
    try {
      val = getExpValue($_this, _name, _hash);
    } catch (e) {
      bbn.fn.log(["THERE SHOULD BE AN ERROR", _name, _t]);
    }
    return val;
  }
}

