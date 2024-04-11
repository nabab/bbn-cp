import bbn from "@bbn/bbn";
import setProp from "./setProp.js";
import setRef from "./setRef.js";

/**
 * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
 * - Updates the component element based on its own schema ($el.bbnSchema)
 * - Updates the schema
 * - Generates/update the DOM when needed
 * 
 * @param {Boolean} shadow The content will go to the shadow DOM if true
 * @returns {Promise}
 */
export default function applyPropsOnElement (cp, node, ele) {
  bbn.fn.checkType(cp, bbnCp, "No component in applyPropsOnElement");
  bbn.fn.checkType(node, "object", "Props must be an object in applyPropsOnElement");
  if (node.bbn) {
    throw Error("Props cannot contain a bbn property in applyPropsOnElement");
  }
  
  if (node.comment) {
    return;
  }
  
  bbn.fn.checkType(ele, [HTMLElement, SVGElement], "Elements should be HTML elements or text nodes in applyPropsOnElement");

  /** @constant {Object} props */
  const props = node.props || bbn.fn.createObject();
  /** @constant {Boolean} isComponent */
  const isComponent = cp.$isComponent(node);
  /** @var {Object} attr The attributes of the element to be built */
  const attr = bbn.fn.createObject();
  let isChanged = false;
  if (node.id !== '0') {
    // Other normal props are prioritarian
    for (let n in props) {
      let v = props[n];
      switch (n) {
        case 'ref':
          bbn.fn.checkType(props.ref, 'string', bbn._("Refs must be strings in %s", cp.$options.name));
          setRef(cp, props.ref, ele);
          break;
        case 'class':
          if (!isComponent && (ele !== cp.$el)) {
            if (ele.className !== v) {
              ele.className = v;
            }
          }
          attr.class = v;
          break;
        case 'style':
          if (!isComponent && (ele !== cp.$el)) {
            if (v !== ele.style.cssText) {
              ele.style.cssText = bbn.cp.convertStyles(v);
            }
          }
          attr.style = v;
          break;
        case 'bbn-show':
          if (v && (ele.style.display === 'none')) {
            ele.style.removeProperty('display');
          }
          else if (!v && (ele.style.display !== 'none')) {
            ele.style.display = 'none';
          }
          break;
        default:
          if (n.indexOf('bbn-') !== 0) {
            attr[n] = props[n];
          }
      }
    }
  }

  if (node.model) {
    for (let n in node.model) {
      let isC = false;
      if (isComponent) {
        if ((n !== '_default_') && ele.bbn && Object.hasOwn(ele.bbnSchema.props || {}, n) && (ele.bbnSchema.props?.[n] !== ele.bbn[n])) {
          ele.bbnSchema.props[n] = node.model[n].value;
          isChanged = true;
          isC = true;
        }
      }
      else if ((ele[n] !== undefined) && (ele[n] !== (bbn.fn.isString(node.model[n].value) ? node.model[n].value : (node.model[n].value?.toString ? node.model[n].value.toString() : '')))) {
        isChanged = true;
        isC = true;
        ele[n] = node.model[n].value;
      }
    }
  }
  else if (Object.hasOwn(props, 'bbn-html') && (ele.innerHTML !== props['bbn-html'])) {
    ele.innerHTML = props['bbn-html'];
    isChanged = true;
  }
  else if (Object.hasOwn(props, 'bbn-text') && (ele.innerText !== props['bbn-text'])) {
    ele.innerText = props['bbn-text'];
    isChanged = true;
  }

  // Setting up attributes
  bbn.fn.iterate(attr, (value, name) => {
    if (!isComponent) {
      if (bbn.fn.isPrimitive(value)) {
        let propName = name;
        if (bbn.cp.badCaseAttributes[name]) {
          propName = bbn.cp.badCaseAttributes[name];
        }

        const isAttr = (ele[propName] !== undefined);
        const current = ele[propName];
        if (isAttr) {
          if (current !== value) {
            if (!value) {
              ele.removeAttribute(name);
              // for SVG
              if ({}.toString.apply(ele[propName]).substr(0, 7) !== '[object') {
                ele[propName] = '';
              }
              isChanged = true;
            }
            else if (!node.attr[name] || node.attr[name].exp || (ele.getAttribute(name) === null)) {
              // for SVG
              const type = {}.toString.apply(ele[propName]);
              if ((type === '[object String]') || (type.substr(0, 7) !== '[object')) {
                ele[propName] = value;
              }
              ele.setAttribute(name, value);
              isChanged = true;
            }
          }
        }
      }
    }
    else if (ele.bbnSchema.props[name] !== value) {
      ele.bbnSchema.props[name] = value;
      isChanged = true;
    }
  });
  if (!isChanged && isComponent && ele.bbnSchema.props) {
    bbn.fn.iterate(ele.bbnSchema.props, (value, name) => {
      if (Object.hasOwn(ele.bbn?.$props || {}, name) && (ele.bbn[name] !== value)) {
        isChanged = true;
      }
    });
  }

  if (isChanged) {
    //bbn.fn.log(["IS CHANGED", ele, ele.bbnId, cp.$options.name]);
    if (isComponent && ele.bbn?.$isMounted) {
      ele.bbn.$tick();
    }
  }
}