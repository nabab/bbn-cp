import bbnCp from "../Cp.js";
import addToElements from "../private/addToElements.js";

/**
 * Creates an element in the given target
 * @param {HTMLElement} d 
 * @param {HTMLElement} target 
 * @param {HTMLElement} after 
 * @returns 
 */
bbnCp.prototype.$insertElement = function (ele, target, prevElementIndex, oldEle) {
  bbn.fn.checkType(target, HTMLElement, "The $insert function should have an HTMLElement as target");
  const node = ele.bbnSchema;
  //bbn.fn.checkType(ele, HTMLElement);
  const isParentComponent = (target !== this.$el) && bbn.cp.isComponent(target);
  let replace = false;
  const isComment = bbn.fn.isComment(ele);
  if (oldEle) {
    const isOldComment = bbn.fn.isComment(oldEle);
    if (
      (oldEle !== this.$el)
      && (
        (isOldComment !== isComment)
        || (
          !isOldComment
          && node.tag
          && !bbn.cp.isTag(node.tag, oldEle)
        )
      )
    ) {
      replace = true;
    }
    else {
      ele = oldEle;
    }
  }

  if (replace) {
    //bbn.fn.log("REPLACE", ele);
    if (isParentComponent && !ele.bbnSchema?.comment) {
      //bbn.fn.log("IN CP " + target.tagName, ele);
      const slot = ele.getAttribute("slot") || 'default';
      if (target.bbnSlots?.[slot]) {
        let search = {bbnId: oldEle.bbnId};
        if (oldEle.bbnHash) {
          search.bbnHash = oldEle.bbnHash;
        }
        let idx = bbn.fn.search(target.bbnSlots[slot], search);
        if (idx > -1) {
          /*
          const mounted = !!target.bbnSlots[slot][idx].parentNode;
          if (mounted) {
            oldEle.parentNode.replaceChild(ele, oldEle);
          }
          */

          target.bbnSlots[slot].splice(idx, 1, ele);
          if (target.bbn && target.bbn.$isMounted) {
            target.bbn.$tick();
          }
        }
      }
    }
    else {
      if (oldEle.parentNode) {
        try {
          oldEle.parentNode.replaceChild(ele, oldEle);
        }
        catch (e) {
          bbn.fn.log("ERROR IN REPLACE", e, ele, oldEle);
        }
      }
      else {
        try {
          target.appendChild(ele);
        }
        catch (e) {
          bbn.fn.log("ERROR IN APPEND", e, ele, oldEle);
        }
      }
    }

    addToElements(this, ele);
  }
  else if (oldEle !== ele) {
    //bbn.fn.log(["INSERT ", ele, oldEle]);
    if (isParentComponent) {
      const slot = ele.bbnSchema.props?.slot || 'default';
      if (target.bbnSlots?.[slot]) {
        if (!ele.bbnSchema && !bbn.fn.removeExtraSpaces(ele.textContent)) {
          return;
        }

        let search = {bbnId: ele.bbnId};
        if (ele.bbnHash) {
          search.bbnHash = ele.bbnHash;
        }

        let idx = bbn.fn.search(target.bbnSlots[slot], search);
        if (idx > -1) {
          const mounted = !!target.bbnSlots[slot][idx].parentNode;
          if (mounted) {
            target.bbnSlots[slot][idx].parentNode.replaceChild(ele, target.bbnSlots[slot][idx]);
          }

          target.bbnSlots[slot].splice(idx, 1, ele);
        }
        else {
          target.bbnSlots[slot].push(ele);
        }
        addToElements(this, ele);
      }
    }
    else {
      if (target.childNodes[prevElementIndex]) {
        target.childNodes[prevElementIndex].after(ele);
      }
      else {
        target.appendChild(ele);
      }

      addToElements(this, ele);
    }
  }
}