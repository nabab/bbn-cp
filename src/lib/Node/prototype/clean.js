import bbnNode from "../Node.js";

const checkOwnDeps = node => {
  bbn.fn.each(node.attributes, a => {
    bbn.fn.each(a.ownDeps, o => {
      if (o.data) {
        let idx = o.data.deps[o.name].indexOf(a);
        if (idx > -1) {
          o.data.deps[o.name].splice(idx, 1);
        }

        idx = o.data.deps.__bbnRoot.indexOf(a);
        if (idx > -1) {
          o.data.deps.__bbnRoot.splice(idx, 1);
        }
      }

    })

    let idx = bbn.fn.search(bbn.cp.queue, b => b.element === a);
    while (idx > -1) {
      bbn.cp.queue.splice(idx, 1);
      idx = bbn.fn.search(bbn.cp.queue, b => b.element === a);
    }
  })
};

bbnNode.prototype.nodeClean = function(full) {
  const cp = this.component;
  const id = this.id;
  const hash = this.hash;
  const indexes = Object.keys(cp.$nodes).filter(idx => !idx.indexOf(id + '-') || (full && (idx === id)));
  indexes.sort((a, b) => {
    a = a.split('-').map(v => parseInt(v));
    b = b.split('-').map(v => parseInt(v));
    for (let i = 0; i < a.length; i++) {
      if (!Object.hasOwn(b, i)) {
        return -1;
      }

      if (a[i] !== b[i]) {
        return a[i] < b[i] ? 1 : -1;
      }
    }

    if (Object.hasOwn(b, a.length)) {
      return 1;
    }

    return 0;
  });

  while (indexes.length) {
    const idx = indexes.shift();
    const obj = cp.$nodes[idx];
    if (hash) {
      for (let n in obj) {
        if ((n === hash) || !n.indexOf(hash + '-')) {
          checkOwnDeps(obj[n]);
          if (obj[n].element) {
            obj[n].nodeRemove(obj[n].element, true);
          }

          delete obj[n];
        }
      }
    }
    else if (obj instanceof bbnNode) {
      checkOwnDeps(obj);
      if (obj.element) {
        obj.nodeRemove(obj.element, true);
      }

      delete cp.$nodes[idx];
    }
    else {
      for (let n in obj) {
        checkOwnDeps(obj[n]);
        if (obj[n].element) {
          obj[n].nodeRemove(obj[n].element, true);
        }

        delete obj[n];
      }
    }
  }
};
