import bbnCp from "../Cp.js";

/**
 * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
 * - Updates the component element based on its own schema ($el.bbnSchema)
 * - Updates the schema
 * - Generates/update the DOM when needed
 * 
 * @param {Boolean} shadow The content will go to the shadow DOM if true
 * @returns {Promise}
 */
bbnCp.prototype.$updateElementFromProps = function (node, ele) {
  if (node.comment) {
    return;
  }

  if (node.id === '0') {
    
  }
  /** @constant {Object} props */
  const props = node.props || bbn.fn.createObject();
  /** @constant {Boolean} isComponent */
  const isComponent = this.$isComponent(node);
  /** @constant {bbnComponentObject} cpSource */
  const cpSource = this;//node.componentId ? bbn.cp.getComponent(node.componentId)?.bbn : this;
  if (!cpSource) {
    bbn.fn.log(node, bbn.cp.getComponent(node.componentId));
    bbn.fn.warning("The component source is not defined");
    return;
  }
  /** @var {Object} attr The attributes of the element to be built */
  const attr = bbn.fn.createObject();
  let isChanged = false;
  // Other normal props are prioritarian
  for (let n in props) {
    let v = props[n];
    switch (n) {
      case 'ref':
        bbn.fn.checkType(props.ref, 'string', bbn._("Refs must be strings in %s", this.$options.name));
        cpSource.$setRef(props.ref, ele);
        break;
      case 'class':
        if (!isComponent && (ele !== this.$el)) {
          if (ele.className !== v) {
            ele.className = v;
          }
        }
        break;
      case 'style':
        if (!isComponent && (ele !== this.$el)) {
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
      default:
        if (n.indexOf('bbn-') !== 0) {
          attr[n] = props[n];
        }
    }
  }

  if (node.model) {
    for (let n in node.model) {
      if (n === '_default_') {
        continue;
      }
      let isC = false;
      if (isComponent) {
        if (Object.hasOwn(ele.bbnSchema.props || {}, n) && (ele.bbnSchema.props?.[n] !== node.model[n].value)) {
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
        if (isAttr) {
          const attr = ele[propName];
          if (attr !== value) {
            if (!value) {
              ele.removeAttribute(name);
              // for SVG
              if ({}.toString.apply(ele[propName]).substr(0, 7) !== '[object') {
                ele[propName] = '';
              }
            }
            else {
              ele.setAttribute(name, value);
              // for SVG
              if ({}.toString.apply(ele[propName]).substr(0, 7) !== '[object') {
                ele[propName] = value;
              }
            }
          }
        }
      }
    }
    else if (ele.bbnSchema.props[name] !== value) {
      ele.bbnSchema.props[name] = value;
      if (ele.bbn?.$isInit) {
        ele.bbn.$setProp(name, value);
      }

      isChanged = true;
    }
  });

  if (isChanged) {
    if (isComponent && ele.bbn?.$isMounted) {
      ele.bbn.$tick();
    }
  }
}