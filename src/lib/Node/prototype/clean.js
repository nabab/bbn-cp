import bbn from "@bbn/bbn";
import bbnNode from "../Node.js";

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

bbnNode.prototype.nodeClean = function(full, noPortals) {
  //bbn.fn.log((full ? 'FULL ' : '') + "CLEANING NODE " + this.realTag + ' - ' + this.id + (this.hash ? (' / ' + this.hash) : ''));
  let res = 0;
  if (!noPortals && this.element?.querySelector) {
    noPortals = true;
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

  while (this.children.length) {
    const child = this.children.shift();
    if (!child.off) {
      checkOwnDeps(child);
      const obj = child.component.$nodes[child.id];
      if (obj) {
        if (obj instanceof bbnNode) {
          delete child.component.$nodes[child.id];
        }
        else if (obj[child.hash]) {
          delete child.component.$nodes[child.id][child.hash];
        }
        else {
          bbn.fn.log("NOTHING TO DELETE");
        }
      }
      if (child.children.length) {
        child.nodeClean(true, noPortals);
      }
      else if (child.element) {
        child.nodeRemove(child.element);
      }

      removeRegion(child);
      child.off = true;
      res++;
    }
  }

  if (full && this.element) {
    checkOwnDeps(this);
    this.nodeRemove(this.element);
    res++;
  }

  return res;
};
