import bbnAttr from "./Attr.js";
import bbnInternalNode from "../Node/Internal.js";


const treatClassArguments = function (...args) {
  const final = [];
  bbn.fn.each(args, arg => {
    if (bbn.fn.isArray(arg)) {
      final.push(...treatClassArguments(...arg));
    }
    else if (bbn.fn.isObject(arg) && bbn.fn.numProperties(arg)) {
      for (let n in arg) {
        if (arg[n]) {
          final.push(n);
        }
      }
    }
    else if (arg && bbn.fn.isString(arg)) {
      final.push(...arg.split(' '));
    }
  });

  return bbn.fn.unique(final);
};

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnClassAttr extends bbnAttr
{
  convert() {
    const args = [];
    if (this.node.bind?.value?.class) {
      args.push(this.node.bind.value.class);
    }

    if (this instanceof bbnClassAttr) {
      args.push(this.attrGetValue());
    }

    if (this.node instanceof bbnInternalNode) {
      args.push('bbn-component', this.node.component.$options.name);
      if (this.node.props.componentClass) {
        args.push(this.node.props.componentClass);
      }
      if (this.node.element.bbnSchema.props?.class) {
        args.push(this.node.element.bbnSchema.props.class)
      }
    }
    const cls = treatClassArguments(args);
    // Remove duplicate and empty class names, then join them into a single string.
    return bbn.fn.removeEmpty(bbn.fn.unique(cls)).join(' ');
  }

  async attrUpdate(init) {
    if (!this.node.element || this.node.comment) {
      return;
    }

    if (init || (this.exp && this.isChanged)) {
      if (this.node.isComponent && (this.node.id !== '0')) {
        let arr;
        if (this.node.element?.bbn?.$internal
          && (arr = this.node.element.bbn.$internal.attributes.filter(a => a instanceof bbnClassAttr)).length
        ) {
          const cls = this.convert();
          this.node.props.class = cls;
          await arr[0].attrUpdate(true);
        }
        else {
          const cls = this.convert();
          this.node.props.class = cls;
          this.node.element.className = cls;
        }
      }
      else {
        const cls = this.convert();
        this.node.props.class = cls;
        this.node.element.className = cls;
      }
    }
  }
}