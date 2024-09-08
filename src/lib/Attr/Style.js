import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import bbnShowAttr from "./Show.js";

const treatStyleArguments = function (...args) {
  const final = bbn.fn.createObject();
  bbn.fn.each(args, arg => {
    if (bbn.fn.isArray(arg)) {
      bbn.fn.extend(final, treatStyleArguments(...arg));
    }
    else if (bbn.fn.isObject(arg) && bbn.fn.numProperties(arg)) {
      bbn.fn.extend(final, arg);
    }
    else if (bbn.fn.isString(arg)) {
      let arr = arg.split(';').map(a => a.trim().split(':').map(b => b.trim()));
      let css = bbn.fn.createObject();
      bbn.fn.each(arr, a => {
        if (a[0] && (a[1] !== undefined) && (a[1] !== '')) {
          css[bbn.fn.camelize(a[0])] = a[1];
        }
      });
      bbn.fn.extend(final, css);
    }
  });

  return final;
};


/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnStyleAttr extends bbnAttr
{
  convert() {
    const args = [];
    if (this.node.bind?.value?.style) {
      args.push(this.node.bind.value.style);
    }

    if (this instanceof bbnStyleAttr) {
      args.push(this.value);
    }

    if (this.node instanceof bbnInternalNode && this.node.element.bbnSchema.props?.style) {
      args.push(this.node.component.$el.bbnSchema.props.style)
    }

    let st = '';
    // Treat the given arguments to consolidate them into a single object of style properties.
    const show = this.node.attributes.filter(a => a instanceof bbnShowAttr);
    if (show.length) {
      args.push({display: show[0].getValue() ? '' : 'none'});
    }
    else if (this.node instanceof bbnInternalNode && !this.node.component.$isRoot && this.node.element.bbnSchema.attributes.filter(a => a instanceof bbnShowAttr).length) {
      args.push({display: this.node.element.bbnSchema.attributes.filter(a => a instanceof bbnShowAttr)[0].getValue()});
    }

    const css = treatStyleArguments(...args);
  
    // Check if the consolidated styles object is valid.
    if (bbn.fn.isObject(css)) {
      // Iterate over each style property in the object.
      for (let n in css) {
        let prop = bbn.fn.camelToCss(n);  // Convert camelCase names to kebab-case for CSS.
        let value = css[n];
  
        // Process and append each style property and its value to the resulting string.
        if (![undefined, null, false, ''].includes(value)) {
          // Add 'px' to numeric values for certain properties.
          if (bbn.fn.isNumber(css[n]) && bbn.fn.isPropSize(prop)) {
            value = css[n] + 'px';
          }
          // Convert non-string values to string.
          else if (!bbn.fn.isString(value) && value.toString) {
            value = value.toString();
          }
  
          // Append the property and its value to the style string.
          st += ` ${prop}: ${value};`;
        }
      }
    }
    else if (css) {
      // If the styles object is not valid, log the object for debugging and throw an error.
      bbn.fn.log("convertStyles", css);
      throw Error(bbn._("Can't understand style"));
    }
  
    // Return the consolidated style string.
    return st;
  
  }

  async update(init) {
    if (!this.node.element || this.node.comment) {
      return;
    }
  
    if (init || (this.exp && this.isChanged)) {
      if (this.node.isComponent
        && (this.node.id !== '0')
      ) {
        let arr;
        const fn = async () => {
          if (this.node.element?.bbn?.$internal
            && (arr = this.node.element.bbn.$internal.attributes.filter(a => a instanceof bbnStyleAttr)).length
          ) {
            //bbn.fn.warning("UPDATING INTERNAL STYLE ON " + this.node.tag)
            await arr[0].update(true);
          }
          else if (this.node.element) {
            this.node.element.style.cssText = this.convert();
          }
        };

        if (!this.node.element?.bbn?.$internal) {
          bbn.cp.queueUpdate({component: this.node.component, fn});
        }
        else  {
          await fn();
        }
      }
      else {
        this.node.props[this.name] = this.convert();
        this.node.element.style.cssText = this.node.props[this.name];
      }
    }
  }

}