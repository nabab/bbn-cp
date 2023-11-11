import bbnCp from "../Cp.js";

/**
 * Sets the props and attributes of the component element based on its combined schema
 * 
 * @returns {undefined}
 */
bbnCp.prototype.$updateFromSchema = function (props) {
  if (this.$el.bbnSchema) {
    //bbn.fn.warning("updateFromSchema " + this.$options.name);
    // The classes on the component itself are only generated once 
    // Concatenating classes from the attributes and from componentClass
    const cls = ['bbn-component'];
    if (this.componentClass) {
      cls.push(this.componentClass);
    }
    if (props?.class) {
      cls.push(props.class);
    }
    if (this.$el.bbnSchema.props?.class) {
      cls.push(this.$el.bbnSchema.props.class);
    }

    let textCls = bbn.cp.convertClasses(cls);

    if (this.$el.className !== textCls) {
      // Converting to string
      this.$el.className = textCls;
    }
    //bbn.fn.log("PUTTING CLASSES " + textCls);

    let stl = [this.$el.bbnSchema.props?.style || ''];
    stl.push(this.$attr.style || '');
    if (props?.style) {
      stl.push(props.style);
    }
    

    if ((props?.['bbn-show'] !== undefined)) {
      stl.push({display: props['bbn-show'] ? 'block' : 'none'});
    }

    stl = bbn.cp.convertStyles(stl);
    if (stl && (stl !== this.$el.style.cssText)) {
      this.$el.style.cssText = stl;
    }

    for (let n in props) {
      if (!['class', 'style'].includes(n)) {
        let value = props[n];

        if (Object.hasOwn(this.$props, n)) {
          this.$setProp(n, value);
        }

        if (bbn.fn.isPrimitive(value)) {
          let propName = n;
          if (bbn.cp.badCaseAttributes[n]) {
            propName = bbn.cp.badCaseAttributes[n];
          }

          const isAttr = (this.$el[propName] !== undefined);
          if (isAttr) {
            const attr = this.$el[propName];
            if (attr !== value) {
              if (!value) {
                this.$el.removeAttribute(n);
                // for SVG
                if ({}.toString.apply(this.$el[propName]).substr(0, 7) !== '[object') {
                  this.$el[propName] = '';
                }
              }
              else {
                this.$el.setAttribute(n, value);
                // for SVG
                if ({}.toString.apply(this.$el[propName]).substr(0, 7) !== '[object') {
                  this.$el[n] = bbn.fn.isString(value) ? value : value?.toString() || '';
                }
                else {
                  //bbn.fn.warning("SVG OBJ " +propName);
                  //bbn.fn.log(this.$el[propName]);
                }
              }
            }
          }
        }
      }
    }
    /*
    for (let n in props) {
      if (!['class', 'style'].includes(n)) {
        if (Object.hasOwn(this.$props, n)) {
          this.$setProp(n, props[n]);
        }
        else if (this.$el[n] !== undefined) {
          this.$el[n] = bbn.fn.isString(props[n]) ? props[n] : props[n]?.toString() || '';
        }
      }
    }
    */
  }
}