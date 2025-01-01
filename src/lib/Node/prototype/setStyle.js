import bbnNode from "../../Node.js";

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

bbnNode.prototype.nodeSetStyle = function() {
  if (this.element && !this.comment) {
    const ele = this.element;
    const args = [];
    bbn.fn.iterate(this.styles, obj => {
      args.push(obj);
    });

    const final = treatStyleArguments(args);
    bbn.fn.log("FINAL", final);
    bbn.fn.iterate(final, (v, k) => {
      const value = [undefined, null, false, NaN].includes(v) ? '' : v;
      if (ele.style[k] !== value) {
        ele.style[k] = value;
      }
    });
  }
}