const treatStyleArguments = function(...args) {
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
 * Convert styles into a string
 */
export default function convertStyles(...args) {
  let st = '';
  const css = treatStyleArguments(...args);
  if (bbn.fn.isObject(css)) {
    for (let n in css) {
      let prop = bbn.fn.camelToCss(n);
      let value = css[n];
      if (![undefined, null, ''].includes(value)) {
        if (bbn.fn.isNumber(css[n]) && bbn.fn.isPropSize(prop)) {
          value = css[n] + 'px';
        }
        else if (!bbn.fn.isString(value) && value.toString) {
          value = value.toString();
        }

        st += ` ${prop}: ${value};`;
      }
    }
  }
  else if (css) {
    bbn.fn.log("convertStyles", css);
    throw new Error(bbn._("Can't understand style"));
  }

  return st;
}
