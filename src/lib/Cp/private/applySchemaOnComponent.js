import bbn from "@bbn/bbn";
import setProp from "./setProp.js";

/**
 * Sets the props and attributes of the component element based on its combined schema
 * 
 * @returns {undefined}
 */
export default function applySchemaOnComponent (cp, props) {
  bbn.fn.checkType(cp, bbnCp, "No component in applySchemaOnComponent");
  if (props) {
    bbn.fn.checkType(props, "object", "Props must be an object in applySchemaOnComponent");
    if (props.bbn) {
      throw new Error("Props cannot contain a bbn property in applySchemaOnComponent");
    }
  }

  if (cp.$el.bbnSchema) {
    //bbn.fn.warning("applySchemaOnComponent " + cp.$options.name);
    // The classes on the component itself are only generated once 
    // Concatenating classes from the attributes and from componentClass
    const cls = ['bbn-component'];
    if (cp.componentClass) {
      cls.push(cp.componentClass);
    }
    if (props?.class) {
      cls.push(props.class);
    }
    if (cp.$el.bbnSchema.props?.class) {
      cls.push(cp.$el.bbnSchema.props.class);
    }

    let textCls = bbn.cp.convertClasses(cls);

    if (cp.$el.className !== textCls) {
      // Converting to string
      cp.$el.className = textCls;
    }
    //bbn.fn.log("PUTTING CLASSES " + textCls);

    let stl = [cp.$el.bbnSchema.props?.style || ''];
    stl.push(cp.$attr.style || '');
    if (props?.style) {
      stl.push(props.style);
    }
    

    if ((props?.['bbn-show'] !== undefined)) {
      stl.push({display: props['bbn-show'] ? 'block' : 'none'});
    }

    stl = bbn.cp.convertStyles(stl);
    if (stl && (stl !== cp.$el.style.cssText)) {
      cp.$el.style.cssText = stl;
    }

    for (let n in cp.$el.bbnSchema?.props || {}) {
      if (!['class', 'style'].includes(n)) {
        let value = cp.$el.bbnSchema.props[n];

        if (Object.hasOwn(cp.$props, n)) {
          setProp(cp, n, value);
        }

        if (bbn.fn.isPrimitive(value)) {
          let propName = n;
          if (bbn.cp.badCaseAttributes[n]) {
            propName = bbn.cp.badCaseAttributes[n];
          }

          const isAttr = (cp.$el[propName] !== undefined);
          if (isAttr) {
            const attr = cp.$el[propName];
            if (attr !== value) {
              if (!value) {
                cp.$el.removeAttribute(n);
                // for SVG
                if ({}.toString.apply(cp.$el[propName]).substr(0, 7) !== '[object') {
                  cp.$el[propName] = '';
                }
              }
              else {
                cp.$el.setAttribute(n, value);
                // for SVG
                if ({}.toString.apply(cp.$el[propName]).substr(0, 7) !== '[object') {
                  cp.$el[n] = bbn.fn.isString(value) ? value : value?.toString() || '';
                }
                else {
                  //bbn.fn.warning("SVG OBJ " +propName);
                  //bbn.fn.log(cp.$el[propName]);
                }
              }
            }
          }
        }
      }
    }

    for (let n in props) {
      if (!['class', 'style'].includes(n) && !Object.hasOwn(cp.$el?.bbnSchema?.props || {}, n)) {
        if (Object.hasOwn(cp.$props, n)) {
          setProp(cp, n, props[n]);
        }
        if (cp.$el[n] !== undefined) {
          if (!props[n]) {
            cp.$el.removeAttribute(n);
          }
          cp.$el[n] = bbn.fn.isString(props[n]) ? props[n] : props[n]?.toString() || '';
        }
      }
    }
  }
}