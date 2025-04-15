import bbnNode from "../Node.js";

const treatStyleArguments = function (...args) {
  const final = bbn.fn.createObject();
  bbn.fn.each(args, arg => {
    if (bbn.fn.isArray(arg)) {
      bbn.fn.extend(final, treatStyleArguments(...arg));
    }
    else if (bbn.fn.isObject(arg) && bbn.fn.numProperties(arg)) {
      let st = '';
      bbn.fn.iterate(arg, (v, k) => {
        const key = bbn.fn.camelToCss(k);
        const value = [undefined, null, false, NaN].includes(v) ? '' : v;
        st += `${key}: ${value}; `;
      });
      bbn.fn.extend(final, treatStyleArguments(st));
    }
    else if (bbn.fn.isString(arg)) {
      let arr = arg.split(';').map(a => a.trim().split(':').map(b => b.trim()));
      let css = bbn.fn.createObject();
      bbn.fn.each(arr, a => {
        if (a.length === 2) {
          const o = {
            prop: a[0],
            value: a[1],
            important: ''
          };
          if (a[1].endsWith('!important')) {
            o.value = a[1].slice(0, -10).trim();
            o.important = 'important';
          }

          css[o.prop] = o;
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
    const done = [];
    const final = treatStyleArguments(args);
    const keys = [];
    bbn.fn.each(ele.style.length, i => keys.push(ele.style[i]));
    bbn.fn.each(keys, k => {
      done.push(k);
      if (final[k]?.value) {
        const elementValue = ele.style.getPropertyValue(k);
        if ((elementValue !== final[k].value) || (ele.style.getPropertyPriority(k) !== final[k].important)) {
          ele.style.setProperty(k, final[k].value, final[k].important);
        }
      }
      else {
        ele.style.removeProperty(k);
      }
    });

    bbn.fn.iterate(final, (o, k) => {
      if (done.includes(k)) {
        return;
      }

      const elementValue = ele.style.getPropertyValue(k);
      if ((elementValue !== o.value) || (ele.style.getPropertyPriority(k) !== o.important)) {
        if (o.value) {
          ele.style.setProperty(k, o.value, o.important);
        }
        else {
          ele.style.removeProperty(k);
        }
      }
    });
  }
}