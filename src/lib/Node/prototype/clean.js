import bbn from "@bbn/bbn";
import bbnNode from "../Node.js";
import onHook from "../../Html/private/onHook.js";
import isComponent from "../../../functions/isComponent.js";

const checkOwnDeps = node => {
  if (!node.attributes || !node.attributes.length) {
    return;
  }

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
      else if (o.component && o.name && o.component.$deps[o.name]) {
        let idx = o.component.$deps[o.name].indexOf(a);
        if (idx > -1) {
          o.component.$deps[o.name].splice(idx, 1);
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

const removeRegion = node => {
  if (node._region?.start?.isConnected) {
    if ((node instanceof bbnTextNode) || ((node.element?.previousSibling === node._region.start) && (node.element?.nextSibling === node._region.end ))) {
      node._region.start.remove();
      node._region.end.remove();
      delete node._region;
      return;
    }

    //bbn.fn.log(["Removing region ", (node.realTag || node.tag || node)]);
    const r = document.createRange();
    r.setStartAfter(node._region.start);
    r.setEndBefore(node._region.end);
    r.deleteContents();
    node._region.start.remove();
    node._region.end.remove();
  }

  if (node._region) {
    delete node._region;
  }
};

bbnNode.prototype.nodeClean = function(full) {
  const cp = this.component;
  const id = this.id;
  const hash = this.hash;
  const nodes = cp.$nodes;
  const rootNumBits = full ? id.split('-').length : id.split('-').length + 1;
  const indexes = Object.keys(nodes).filter(idx => !idx.indexOf(id + '-') || (full && (idx === id)));
  let res = 0;
  if (this.element?.querySelector) {
    const portals = this.element.querySelectorAll('.bbn-portal-active');
    if (portals.length) {
      portals.forEach(p => {
        const parent = p.parentNode;
        p.bbnNode.directives['bbn-portal'].attrGetValue();
        p.bbnNode.directives['bbn-portal'].value = null;
        p.bbnNode.directives['bbn-portal'].oldValue = parent;
        p.bbnNode.directives['bbn-portal'].lastValue = parent;
        bbn.cp.directives['bbn-portal'].update(p, {value: null, oldValue: parent});
      });
    }
  }

  if (indexes.length) {
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

    const oldIndexes = indexes.slice().reverse();
    const elementsToDo = [];
    while (oldIndexes.length) {
      const idx = oldIndexes.shift();
      const obj = nodes[idx];
      if (hash) {
        for (let n in obj) {
          if ((n === hash) || !n.indexOf(hash + '-')) {
            if (obj[n].element) {
              elementsToDo.push(obj[n].element);
            }
          }
        }
      }
      else if (obj instanceof bbnNode) {
        if (obj.element) {
          elementsToDo.push(obj.element);
        }
      }
      else {
        for (let n in obj) {
          if (obj[n].element) {
            elementsToDo.push(obj[n].element);
          }
        }
      }
    }

    elementsToDo.forEach(ele => {
      if (!(ele instanceof Comment) && isComponent(ele) && !ele.$isDestroying) {
        onHook(ele, 'beforeDestroy');
        if (ele.bbnNode.events?.['hook:beforedestroy']) {
          const beforeDestroy = new Event('hook:beforedestroy');
          ele.bbnNode.events['hook:beforedestroy'].handler.bind(ele.bbnComponent)(beforeDestroy);
        }
        bbn.fn.each(ele.$components.all, component => {
          component.bbnNode.nodeClean(true);
        })
      }
    })

    while (indexes.length) {
      const idx = indexes.shift();
      const obj = nodes[idx];
      if (hash) {
        for (let n in obj) {
          if ((n === hash) || !n.indexOf(hash + '-')) {
            checkOwnDeps(obj[n]);
            if (obj[n].element) {
              obj[n].nodeRemove(obj[n].element, true);
              res++;
            }

            if (rootNumBits === (obj[n].id.split('-').length)) {
              removeRegion(obj[n]);
            }
            delete obj[n];
          }
        }
      }
      else if (obj instanceof bbnNode) {
        checkOwnDeps(obj);
        if (obj.element) {
          obj.nodeRemove(obj.element, true);
          res++;
        }

        if (rootNumBits === (obj.id.split('-').length)) {
          removeRegion(obj);
        }
        delete nodes[idx];
      }
      else {
        for (let n in obj) {
          checkOwnDeps(obj[n]);
          if (obj[n].element) {
            obj[n].nodeRemove(obj[n].element, true);
            res++;
          }

          if (rootNumBits === (obj[n].id.split('-').length)) {
            if (indexes.length) {
              bbn.fn.log("DELETING BEFORE WITH ROOT " + id + ' / ' + obj[n].id)
            }
              bbn.fn.log("DELETING3 ON " +indexes.length)
            removeRegion(obj[n]);
          }
          delete obj[n];
        }
      }
    }
  }

  bbn.cp.queue.filter(e => e.component === cp).forEach(e => {
    if (e.element?.id && (!e.element.id.indexOf(id + '-'))) {
      e.off = true;
    }
  });

  return res;
};
