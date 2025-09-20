import bbnNode from "../Node.js";

bbnNode.prototype.nodeMove = function(element) {
  let cur = element;
  if (element?.bbnSchema) {
    cur = element.bbnSchema._region.end;
  }

  if (element === this.element) {
    bbn.fn.log("Can't move to itself");
    return;
  }

  if (!element.isConnected || !cur.isConnected) {
    bbn.fn.log("Element or region not connected", element, cur);
    return;
  }

  const frag = document.createDocumentFragment();
  let n = this._region.start;
  while (n) {
    const next = n.nextSibling;
    if (cur === next) {
      bbn.fn.log("It's already in place", next, element);
      return;
    }
    if (n instanceof HTMLElement) {
      n.classList.add('bbn-is-moving');
    }
    frag.appendChild(n);
    if (n === this._region.end) break;
    n = next;
  }
  let node = this;
  while (node.comment) {
    node = node.parent;
  }
  const nodes = Array.from(frag.childNodes);
  bbn.fn.log("IS MOVING", element, this.element)
  cur.parentNode.insertBefore(frag, cur);
  nodes.forEach(n => {
    if (n instanceof HTMLElement) {
      n.classList.remove('bbn-is-moving');
    }
  });
};
