import removeFromElements from "./removeFromElements.js";

/**
 * Remove an element from the DOM
 * @param {HTMLElement} ele
 */
export default function removeDOM(cp, ele, replacer) {
  //bbn.fn.log(["REMOVING " + (ele.bbn ? ele.bbn.$options.name + ' ': '') + ele.bbnId, ele, cp === ele.bbnSchema.component, cp, ele.bbnSchema.component]);
  if (ele.bbnSchema?.component) {
    cp = ele.bbnSchema.component;
  }

  const id = ele.bbnId;
  const hash = ele.bbnHash;

  // It won't have an ID if it's a bbn-text or bbn-html or creaated by an external component/widget
  if (id) {
    const idsToDo = [];
    if (ele.bbnSlots) {
      for (let n in ele.bbnSlots) {
        while (ele.bbnSlots[n].length) {
          removeDOM(cp, ele.bbnSlots[n].shift());
        }
      }
    }
    else if (bbn.fn.isComment(ele)) {
      const eles = Array.prototype.slice.call(ele.parentNode.childNodes);
      while (eles.length) {
        const el = eles.shift();
        if (el.bbnId && !el.bbnId.indexOf(id + '-') && (!hash || !el.bbnHash.indexOf(hash))) {
          idsToDo.push({id: el.bbnId, hash: el.bbnHash || ''});
        }
      }
    }
    else {
      while (ele.childNodes?.length) {
        if (ele.childNodes[0].bbnId) {
          idsToDo.push({id: ele.childNodes[0].bbnId, hash: ele.childNodes[0].bbnHash || ''});
        }
  
        ele.removeChild(ele.childNodes[0]);
      }
    }

    Object.keys(cp.$elements).forEach(h => {
      bbn.fn.each(idsToDo, a => {
        if ((h === a.id) || !h.indexOf(a.id + '-')) {
          if (!a.hash) {
            if (cp.$elements[h]?.parentNode) {
              cp.$elements[h].parentNode.removeChild(cp.$elements[h]);
            }

            delete cp.$elements[h];
          }
          else {
            bbn.fn.each(Object.keys(cp.$elements[h]), hash => {
              if ((a.hash === hash) || !hash.indexOf(a.hash + '-')) {
                if (cp.$elements[h][hash]?.parentNode) {
                  cp.$elements[h][hash].parentNode.removeChild(cp.$elements[h][hash]);
                }

                delete cp.$elements[h][hash];
              }
            });
          }
        }
      })
    });

    if (replacer) {
      if (hash) {
        cp.$elements[id][hash] = replacer;
      }
      else {
        cp.$elements[id] = replacer;
      }
    }
    else {
      removeFromElements(cp, id, hash);
    }
  }

  if (ele.parentNode) {
    if (replacer) {
      ele.parentNode.replaceChild(replacer, ele);
    }
    else {
      ele.parentNode.removeChild(ele);
    }
  }
}