import bbnNode from "../Node.js";

bbnNode.prototype.nodeMove = function(element, after) {
  let cur = element;
  if (element === this.element) {
    bbn.fn.log("Can't move to itself");
    return;
  }

  if (!element.isConnected || !cur.isConnected) {
    bbn.fn.log("Element or region not connected", element, cur);
    return;
  }

  // Making a fragment with the start comment, element, and the end comment
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

  const nodes = Array.from(frag.childNodes);
  //bbn.fn.log(["Moving node", "Element", this.element, "to", cur]);
  if (after) {
    cur.after(frag);
  }
  else {
    cur.parentNode.insertBefore(frag, cur);
  }

  nodes.forEach(n => {
    if (n instanceof HTMLElement) {
      n.classList.remove('bbn-is-moving');
    }
  });
};
