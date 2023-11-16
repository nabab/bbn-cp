import bbn from "@bbn/bbn";
import sr from "../internals/sr.js";
import treatItems from "./treatItems.js";

export default async function treatSlot (cp, node, hash, parent) {
  if (node.tag === 'slot') {
    const res = new DocumentFragment();
    let slot = 'default';
    if (node.attr?.name) {
      slot = node.attr.name.exp ? sr(cp, node.attr.name, hash) : node.attr.name.value;
    }
    if (cp.$el.bbnSlots?.[slot]?.length) {
      // Iterating the elements going in the slot
      bbn.fn.each(cp.$el.bbnSlots[slot], a => {
        //bbn.fn.log("This is a slot element", a)`);
        let search = {bbnId: a.bbnId};
        if (a.bbnHash) {
          search.bbnHash = a.bbnHash;
        }
        // Case where the slot is inside another component
        const bits = a.bbnId.split('-');
        bits.pop();
        if ((parent !== cp.$el) && bbn.cp.isComponent(parent)) {
          let idx = bbn.fn.search(parent.bbnSlots[slot], search);
          parent.bbnSlots.default.splice(idx > -1 ? idx : parent.bbnSlots.default.length, idx > -1 ? 1 : 0, a);
        }
        // Else if only the element is not mounted (otherwise it's already there)
        else if (!a.parentNode) {
          let idx = bbn.fn.search(parent.childNodes, search);
          if (idx > -1) {
            parent.replaceChild(a, $_par.at(-1).childNodes[idx]);
          }
          else {
            parent.appendChild(a);
          }
        }
      })
    }

    const f = await treatItems(cp, node, hash);
    if (f) {
      res.append(f);
    }

    return res;
  }
}
