import bbnAttr from "./Attr.js";
import bbnInternalNode from "../Node/Internal.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnClassAttr extends bbnAttr
{
  convert() {
    const args = arguments.length ? arguments : [];
    if (!arguments.length) {
      if (this.node instanceof bbnInternalNode) {
        args.push('bbn-component', this.node.component.$options.name);
        if (this.node.props.componentClass) {
          args.push(this.node.props.componentClass);
        }
      }

      if (this.node.bind?.value?.class) {
        args.push(this.node.bind.value?.class);
      }

      // In case it's called from outside the class
      if (this instanceof bbnClassAttr) {
        args.push(this.value);
      }

      if (this.node instanceof bbnInternalNode && this.node.component.$el.bbnSchema.props?.class) {
        args.push(this.node.component.$el.bbnSchema.props?.class)
      }
    }

    let arr = [];
    // Iterate over each argument provided to the function.
    for (let i = 0; i < args.length; i++) {
      let css = args[i];
      if (!css) {
        continue;
      }
  
      // Handle string format: split class names by space and add to array.
      if (bbn.fn.isString(css)) {
        arr.push(...css.split(' '));
      }
      // Handle object format: add keys as class names if their values are truthy.
      else if (bbn.fn.isObject(css)) {
        for (let n in css) {
          if (css[n]) {
            arr.push(n);
          }
        }
      }
      // Handle array format: recursively process each item in the array.
      else if (bbn.fn.isArray(css)) {
        // this can be bind
        bbn.fn.each(css, cs => arr.push(...bbnClassAttr.prototype.convert.apply(this, [cs]).split(' ')));
      }
      // If the format is not recognized, log the value and throw an error.
      else {
        bbn.fn.log(css);
        throw Error(bbn._("Can't understand classes"));
      }
    }
  
    // Remove duplicate and empty class names, then join them into a single string.
    return bbn.fn.removeEmpty(bbn.fn.unique(arr)).join(' ');
  }

  async update(init) {
    if (!this.node.element || this.node.comment) {
      return;
    }

    if (init || (this.exp && this.isChanged)) {
      this.getValue();
      const cls = this.convert();
      if (this.node.isComponent
        && (this.node.id !== '0')
      ) {
        let arr;
        const fn = async () => {
          if (this.node.element?.bbn?.$internal
            && (arr = this.node.element.bbn.$internal.attributes.filter(a => a instanceof bbnClassAttr)).length
          ) {
            //bbn.fn.warning("UPDATING INTERNAL CLASS ON " + this.node.tag);
            //bbn.cp.queueUpdate(arr[0])
            await arr[0].update(true);
          }
          else if (this.node.element) {
            //bbn.fn.warning("UPDATING CLASS ON " + this.node.tag);
            if (this.node.element.className !== cls) {
              //bbn.fn.warning("REALLY UPDATING CLASS ON " + this.node.tag);
              this.node.element.className = cls;
            }
          }
        };

        if (!this.node.element?.bbn?.$internal) {
          bbn.cp.queueUpdate({component: this.node.component, fn, num: bbn.cp.numTicks, hash: (this.node.hash || 'root') + '-' + this.id});
        }
        else  {
          await fn();
        }
      }
      else if (this.node.element.className !== cls) {
        //bbn.fn.warning("REALLY UPDATING 2 CLASS ON " + this.node.tag + ' ' + this.node.hash + ' (' + bbn.cp.numTicks +')');
        this.node.element.className = cls;
      }
    }
  }
}