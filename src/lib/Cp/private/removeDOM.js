import removeFromElements from "./removeFromElements.js";

/**
 * Remove an element from the DOM
 * @param {HTMLElement} ele
 */
export default function removeDOM(cp, ele) {
  //bbn.fn.log([cp, "REMOVING " + (ele.bbn ? ele.bbn.$options.name + ' ': '') + ele.bbnId]);
  if (ele.bbnId === "0-1-0-0-0") {
    bbn.fn.warning("----- removeDOM -----");
    bbn.fn.log(['removeDOM', ele, cp]);
  }

  const id = ele.bbnId;
  const hash = ele.bbnHash;
  // It won't have an ID if it's a bbn-text or bbn-html or creaated by an external component/widget
  if (id) {
    if (ele.bbnSlots) {
      for (let n in ele.bbnSlots) {
        let slot = ele.bbnSlots[n].splice(0, ele.bbnSlots[n].length);
        for (let i = 0; i < slot.length; i++) {
          let o = slot[i];
          //bbn.fn.log("REMOVE FROM SLOT", o);
          let myCp = o.bbnComponentId !== cp.$cid ? bbn.cp.getComponent(o.bbnComponentId)?.bbn || cp : cp;
          removeDOM(myCp, o);
        }
      }
    }

    if (ele.childNodes && ele.bbnSchema && !Object.hasOwn(ele.bbnSchema.props || {}, 'bbn-text') && !Object.hasOwn(ele.bbnSchema.props || {}, 'bbn-html') && (ele.bbnSchema.tag !== 'svg')) {
      while (ele.childNodes.length) {
        let node = ele.childNodes[0];
        let myCp = ele.bbnComponentId !== cp.$cid ? bbn.cp.getComponent(ele.bbnComponentId)?.bbn || cp : cp;
        removeDOM(myCp, node);
      }
    }

    if (hash) {
      if (cp.$elements[id]?.[hash] === ele) {
        removeFromElements(cp, id, hash);
      }
    }
    else if (cp.$elements[id] === ele) {
      removeFromElements(cp, id);
    }
  }

  if (ele.parentNode) {
    ele.parentNode.removeChild(ele);
  }
}