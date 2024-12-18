import removeDOM from './removeDOM.js';

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

    let idx = bbn.fn.search(bbn.cp.queue, {element: a});
    while (idx > -1) {
      bbn.cp.queue.splice(idx, 1);
      idx = bbn.fn.search(bbn.cp.queue, {element: a});
    }
  })
};

export default function deleteNodes(cp, id, hash, full) {
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

  indexes.forEach(idx => {
    const obj = cp.$nodes[idx];
    if (hash) {
      for (let n in obj) {
        if ((n === hash) || !n.indexOf(hash + '-')) {
          checkOwnDeps(obj[n]);
          if (obj[n].element) {
            obj[n].element.removed = true;
            removeDOM(cp, obj[n].element);
          }

          delete obj[n];
        }
      }
    }
    else {
      if (obj instanceof bbnNode) {
        checkOwnDeps(obj);
        if (obj.element) {
          obj.element.removed = true;
          removeDOM(cp, obj.element);
        }

        delete cp.$nodes[idx];
      }
      else {
        for (let n in obj) {
          checkOwnDeps(obj[n]);
          if (obj[n].element) {
            obj[n].element.removed = true;
            removeDOM(cp, obj[n].element);
          }

          delete obj[n];
        }
      }
    }
  });
}
