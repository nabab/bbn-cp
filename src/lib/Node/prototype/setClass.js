import bbnNode from "../Node.js";
import bbnInternalNode from "../Internal.js";

const treatClassArguments = function (...args) {
  const final = [];
  bbn.fn.each(args, arg => {
    if (bbn.fn.isArray(arg)) {
      final.push(...treatClassArguments(...arg));
    }
    else if (bbn.fn.isObject(arg) && bbn.fn.numProperties(arg)) {
      for (let n in arg) {
        if (arg[n]) {
          final.push(...n.split(' '));
        }
      }
    }
    else if (arg && bbn.fn.isString(arg)) {
      final.push(...arg.split(' '));
    }
  });

  return bbn.fn.unique(final.filter(v => !!v.trim()));
};


bbnNode.prototype.nodeSetClass = function() {
  if (this.element?.classList && !this.comment) {
    const ele = this.element;
    const args = [];
    bbn.fn.iterate(this.classes, obj => {
      args.push(obj);
    });
  
    const final = treatClassArguments(...args);
    if ((this instanceof bbnInternalNode) || this.isComponent) {
      final.unshift('bbn-component');
    }

    Array.from(ele.classList).forEach(cls => {
      if (!final.includes(cls)) {
        if (cls !== 'bbn-component-mounted') {
          ele.classList.remove(cls);
        }
      }
      else {
        final.splice(final.indexOf(cls), 1);
      }
    });
    final.forEach(cls => {
      ele.classList.add(cls.trim());
    });
  }
}