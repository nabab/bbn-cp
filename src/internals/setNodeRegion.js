import bbnSlotNode from "../lib/Node/Slot.js";

export default function setNodeRegion(node, after) {
  if (!node._region || !node._region.start.isConnected || !node._region.end.isConnected) {
    if (node._region?.start) {
      node._region.start.remove();
    }
    if (node._region?.end) {
      node._region.end.remove();
    }

    const hash = node.id + (node.hash ? ('|' + node.hash) : '');
    const start = document.createComment(`⟨${node.tag}:${hash}:start⟩`);
    const end   = document.createComment(`⟨${node.tag}:${hash}:end⟩`);
    start.bbnId = node.id + '-start';
    end.bbnId = node.id + '-end';
    start.bbnIsStart = true;
    end.bbnIsEnd = true;
    start.bbnNode = node;
    end.bbnNode = node;
    if (node.hash) {
      start.bbnHash = node.hash;
      end.bbnHash = node.hash;
    }
    const cp = node.component || node.parent?.component;
    let p;
    if (after?.isConnected) {
      p = after.parentNode;
      if (after.bbnNode) {
        after = after.bbnNode._region.start;
      }
      p.insertBefore(end, after);
    }
    else if (!(node instanceof bbnSlotNode) && node.parent.comment && node.parent?._region?.end?.parentNode) {
      p = node.parent._region.end.parentNode;
      p.insertBefore(end, node.parent._region.end);
    }
    else {
      p = node.parentElement || cp.$el;
      p.appendChild(end);
    }

    p.insertBefore(start, end);
    node._region = { start, end };
  }
};
