import bbnNode from "../Node.js";
import bbnAttr from "../../Attr.js";
import bbnModelAttr from "../../Attr/Model.js";
import bbnEventAttr from "../../Attr/Event.js";
import bbnDirectiveAttr from "../../Attr/Directive.js";
import bbnTextAttr from "../../Attr/Text.js";
import bbnHtmlAttr from "../../Attr/Html.js";
import bbnShowAttr from "../../Attr/Show.js";
import bbnBreakAttr from "../../Attr/Break.js";
import bbnIsAttr from "../../Attr/Is.js";
import bbnClassAttr from "../../Attr/Class.js";
import bbnStyleAttr from "../../Attr/Style.js";
import bbnRefAttr from "../../Attr/Ref.js";
import bbnConditionAttr from "../../Attr/Condition.js";
import bbnForgetAttr from "../../Attr/Forget.js";
import bbnLoopAttr from "../../Attr/Loop.js";
import bbnOnceAttr from "../../Attr/Once.js";
import bbnSlotAttr from "../../Attr/Slot.js";
import bbnPreAttr from "../../Attr/Pre.js";
import bbnTransitionAttr from "../../Attr/Transition.js";
import bbnBindAttr from "../../Attr/Bind.js";

const allowed = [
  'id',
  'tag',
  'loop',
  'loopIndex',
  'loopItem',
  'conditionId',
  'condition',
  'forget',
  'args',
  'once',
  'bind',
  'transition',
  'attr',
  'dependencies',
  'directives',
  'events',
  'hash',
  'model',
  'slot',
  'pre',
  'text'
];

bbnNode.prototype.nodeDefine = function(node, data) {
  const cp = this.component;
  /*
  Object.defineProperty(this, 'parent', {
    writable: false,
    configurable: false,
    value: parentId ? (parentId === '0' ? cp.$internal : parent.bbnNode) : null
  });
  */

  Object.defineProperty(this, 'parentElement', {
    get() {
      if (this.element?.parentNode) {
        return this.element.parentNode;
      }

      if (!this.parent) {
        return null;
      }

      let parent = this.parent;
      while (parent.comment) {
        parent = parent.parent;
      }

      return parent?.element || null;
    }
  });


  // controlling a fixed order
  for (let i = 0; i < allowed.length; i++) {
    const a = allowed[i];
    if (Object.hasOwn(node, a)) {
      if (['attr', 'events', 'model', 'directives'].includes(a)) {
        Object.defineProperty(this, a, {
          writable: false,
          configurable: false,
          enumerable: true,
          value: bbn.fn.createObject()
        });

        for (let n in node[a]) {
          let v;
          let writable = (n === '_default_') && (a === 'model');
          if (a === 'model') {
            v = new bbnModelAttr(node[a][n], this, n);
          }
          else if (a === 'events') {
            v = new bbnEventAttr(node[a][n], this, n);
          }
          else if (a === 'directives') {
            v = new bbnDirectiveAttr(node[a][n], this, n);
          }
          else if (a === 'attr') {
            if (n === 'bbn-text') {
              v = new bbnTextAttr(node[a][n], this, n);
            }
            else if (n === 'bbn-html') {
              v = new bbnHtmlAttr(node[a][n], this, n);
            }
            else if (n === 'bbn-show') {
              v = new bbnShowAttr(node[a][n], this, n);
            }
            else if (n === 'bbn-break') {
              v = new bbnBreakAttr(node[a][n], this, n);
            }
            else if (n === 'is') {
              v = new bbnIsAttr(node[a][n], this, n);
            }
            else if (n === 'class') {
              v = new bbnClassAttr(node[a][n], this, n);
            }
            else if (n === 'style') {
              v = new bbnStyleAttr(node[a][n], this, n);
            }
            else if (n === 'ref') {
              v = new bbnRefAttr(node[a][n], this, n);
            }
            else {
              v = new bbnAttr(node[a][n], this, n);
            }
          }

          Object.defineProperty(this[a], n, {
            writable: writable,
            enumerable: true,
            configurable: writable,
            value: v
          });
        }
      }
      else if (['condition', 'forget', 'loop', 'once', 'pre', 'transition', 'text', 'bind', 'slot'].includes(a)) {
        let v;
        switch (a) {
          case 'condition':
            v = new bbnConditionAttr(node[a], this)
            break;
          case 'forget':
            v = new bbnForgetAttr(node[a], this)
            break;
          case 'loop':
            v = new bbnLoopAttr(node[a], this)
            break;
          case 'slot':
            v = new bbnSlotAttr(node[a], this)
            break;
          case 'once':
            v = new bbnOnceAttr(node[a], this)
            break;
          case 'pre':
            v = new bbnPreAttr(node[a], this)
            break;
          case 'transition':
            v = new bbnTransitionAttr(node[a], this);
            break;
          case 'text':
            v = new bbnTextAttr(node[a], this)
            break;
          case 'bind':
            v = new bbnBindAttr(node[a], this);
            break;
        }

        Object.defineProperty(this, a, {
          writable: false,
          configurable: false,
          value: v
        });
      }
      else if (a === 'tag') {
        Object.defineProperty(this, a, {
          writable: true,
          value: cp?.$cfg?.componentNames?.[node.tag] || node.tag
        });
      }
      else if (node.loop && ['loopItem', 'loopIndex'].includes(a)) {
        // Do nothing
      }
      else if (!Object.hasOwn(this, a)) {
        Object.defineProperty(this, a, {
          writable: true,
          configurable: false,
          value: bbn.fn.isObject(node[a]) ? bbn.fn.clone(node[a]) : node[a]
        });
      }
    }
  }

};
