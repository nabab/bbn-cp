import removeDOM from './removeDOM.js';

export default function deleteNodes(cp, id, hash, full) {
  for (let idx in cp.$nodes) {
    if (!idx.indexOf(id + '-') || (full && (idx === id))) {
      const obj = cp.$nodes[idx];
      if (hash) {
        for (let n in obj) {
          if ((n === hash) || !n.indexOf(hash + '-')) {
            if (obj[n].element) {
              removeDOM(cp, obj[n].element);
            }

            delete obj[n];
          }
        }
      }
      else {
        if (obj.element) {
          removeDOM(cp, obj.element);
        }

        delete cp.$nodes[idx];
      }
    }
  }
}
