const cleanUp = function (ele) {
  if (ele.bbnSchema) {
    bbn.fn.each(ele.bbnSchema.atributes, a => {
      bbn.fn.each(a.ownDeps, o => {
        if (o.data) {
          const idx = o.data.deps[o.name].indexOf(a);
          if (idx > -1) {
            o.data.deps[o.name].splice(idx, 1);
          }
        }
      })
    })
  }
  ele.childNodes.forEach(e => cleanUp(e));
  ele.remove();
}

/**
 * Remove an element from the DOM
 * @param {HTMLElement} ele
 */
export default function removeDOM(cp, ele, replacer) {
  if (ele?.parentNode) {
    if (replacer) {
      ele.parentNode.replaceChild(replacer, ele);
    }
    else {
      ele.parentNode.removeChild(ele);
    }
    new Promise(() => {
      cleanUp(ele);
    });
  }
}