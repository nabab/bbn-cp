import { schemaCompletionSource } from '@codemirror/lang-sql';
import getInternalState from './getInternalState.js';
import setProp from './setProp.js';
import setRef from './setRef.js';
import bbn from '@bbn/bbn';

/**
 * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
 * - Updates the component element based on its own schema ($el.bbnSchema)
 * - Updates the schema
 * - Generates/update the DOM when needed
 * 
 * @param {Boolean} shadow The content will go to the shadow DOM if true
 * @returns {Promise}
 */
export default function applyPropsOnElement(cp, node, ele) {
  if (node.comment) {
    return;
  }

  if (node.id === '0') {
    
  }
  /** @constant {Object} props */
  const props = node.props || bbn.fn.createObject();
  /** @constant {Boolean} isComponent */
  const isComponent = cp.$isComponent(node);
  /** @constant {bbnComponentObject} cpSource */
  const cpSource = cp;//node.componentId ? bbn.cp.getComponent(node.componentId)?.bbn : cp;
  if (!cpSource) {
    bbn.fn.log(node, bbn.cp.getComponent(node.componentId));
    bbn.fn.warning("The component source is not defined");
    return;
  }
  /** @var {Object} attr The attributes of the element to be built */
  let isChanged = false;
  // Other normal props are prioritarian
  for (let n in props) {
    if (n === '$_default') {
      continue;
    }

    let isNotExp = false;
    let id;
    if (node.model?.[n]) {
      id = node.model[n].id;
    }
    else if (node.attr?.[n]) {
      id = node.attr[n].id;
      if (!node.attr[n].exp) {
        isNotExp = true;
      }
    }
    else if (node.attr['bbn-bind']) {
      id = node.attr['bbn-bind'].id;
    }
    else {
      bbn.fn.log(ele, node);
      throw new Error("Impossible to find the id of the property " + n);
    }

    let v = props[n];
    switch (n) {
      case 'ref':
        bbn.fn.checkType(props.ref, 'string', bbn._("Refs must be strings in %s", cp.$options.name));
        setRef(cpSource, props.ref, ele);
        break;
      case 'class':
        if (!isComponent && (ele !== cp.$el)) {
          if (ele.className !== v) {
            ele.className = v;
          }
        }
        break;
      case 'style':
        if (!isComponent && (ele !== cp.$el)) {
          if (v !== ele.style.cssText) {
            ele.style.cssText = bbn.cp.convertStyles(v);
          }
        }
        break;
      case 'bbn-show':
        if (v && (ele.style.display === 'none')) {
          ele.style.removeProperty('display');
        }
        else if (!v && (ele.style.display !== 'none')) {
          ele.style.display = 'none';
        }
        break;
      case 'bbn-html':
        if (ele.innerHTML !== v) {
          ele.innerHTML = v;
        }
        break;
      case 'bbn-text':
        if (ele.innerText !== v) {
          ele.innerText = v;
        }
        break;
      default:
        if (n.indexOf('bbn-') !== 0) {
          if (!isComponent) {
            if (bbn.fn.isPrimitive(v)) {
              let propName = n;
              if (bbn.cp.badCaseAttributes[n]) {
                propName = bbn.cp.badCaseAttributes[n];
              }
      
              const isAttr = (ele[propName] !== undefined);
              if (isAttr) {
                const attr = ele[propName];
                if (attr !== v) {
                  if (!v) {
                    ele.removeAttribute(n);
                    // for SVG
                    if ({}.toString.apply(ele[propName]).substr(0, 7) !== '[object') {
                      ele[propName] = '';
                    }
                  }
                  else {
                    ele.setAttribute(n, v);
                    // for SVG
                    if ({}.toString.apply(ele[propName]).substr(0, 7) !== '[object') {
                      ele[propName] = v;
                    }
                  }
                }
              }
            }
          }
          else if (!isNotExp && (getInternalState(cp, id, ele.bbnHash) !== 'OK')) {
            isChanged = true;
          }
        }

        break;
    }
  }

  if (isChanged) {
    if (isComponent && ele.bbn) {
      ele.bbn.$tick();
    }
  }
}