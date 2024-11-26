import removeDOM from './removeDOM.js';

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
          bbn.fn.each(obj[n].attributes, a => {
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
          })

          if (obj[n].element) {
            removeDOM(cp, obj[n].element);
          }

          delete obj[n];
        }
      }
    }
    else {
      bbn.fn.each(cp.$nodes[idx].attributes, a => {
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
      })

      if (obj.element) {
        removeDOM(cp, obj.element);
      }

      delete cp.$nodes[idx];
    }
  });
}
