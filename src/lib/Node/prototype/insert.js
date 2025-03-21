import bbnNode from "../Node.js";
import bbnSlotNode from "../Slot.js";

const isBefore = (id1, id2) => {
  if (id1 === id2) {
    throw new Error("Cannot compare the same ID in isBefore");
  }

  const bits1 = id1.split('-');
  const bits2 = id2.split('-');
  for (let i = 0; i < bits1.length; i++) {
    if (bits1[i] !== bits2[i]) {
      return parseInt(bits1[i]) < parseInt(bits2[i]);
    }
  }

  return true;
};

const insertInSlot = function (parent, node, ele) {
  const cp = node.component;
  if ((parent.bbnCid !== cp.$cid) && cp.$isComponent(parent)) {
    const slot = ele.bbnSchema.slot?.name || ele.bbnSchema?.attr?.slot?.value || 'default';
    if (!parent.bbnTmpSlots[slot]) {
      parent.bbnTmpSlots[slot] = [];
    }

    const parentSlots = parent.bbn?.$isInit ? parent.bbnSlots : parent.bbnTmpSlots;

    if (parentSlots?.[slot]) {
      let search = {bbnId: ele.bbnId};
      if (ele.bbnHash) {
        search.bbnHash = ele.bbnHash;
      }

      let idx = bbn.fn.search(parentSlots[slot], search);
      if ((idx > -1) && parentSlots[slot][idx].bbnHash && !ele.bbnHash) {
        idx = -1;
      }

      if (idx > -1) {
        const mounted = !!parentSlots[slot][idx].parentNode;
        //bbn.fn.log(["REPLACE", parent.bbnSlots[slot][idx], ele, search]);
        if (mounted) {
          let hasClass = false;
          if (ele.isConnected && ele.classList) {
            hasClass = true;
            ele.classList.add('bbn-is-moving');
          }

          parentSlots[slot][idx].parentNode.replaceChild(ele, parentSlots[slot][idx]);
          if (hasClass) {
            ele.classList.remove('bbn-is-moving');
          }
        }

        if (ele !== parentSlots[slot][idx]) {
          parentSlots[slot].splice(idx, 1, ele);
        }
      }
      else {
        idx = parentSlots[slot].length;
        parentSlots[slot].push(ele);
        if (parent.$isCreated) {
          if (idx) {
            let prev = parentSlots[slot][idx - 1];
            if (prev.bbnId && prev.isConnected) {
              prev.after(ele);
            }
            else if (parent.$slotElements[slot]) {
              parent.$slotElements[slot].before(ele);
            }
          }
          else if (parent.$slotElements[slot]) {
            parent.$slotElements[slot].before(ele);
          }
        }
      }
    }

    return true;
  }

  return false;
};

bbnNode.prototype.nodeInsert = function(ele, after) {
  //bbn.fn.log(["INSERT", this.component.$options.name, after, ele]);
  bbn.fn.checkType(ele, [Text, Comment, HTMLElement, SVGElement]);
  let replace = !!this.oldElement;
  const parent = this.parentElement?.shadowRoot || this.parentElement;

  const cp = this.component;
  if (!parent) {
    if (this.isCommented) {
      return;
    }

    bbn.fn.log(ele, this, this.parentElement)
    throw new Error("Impossible to find the parent element");
  }

  if (insertInSlot(parent, this, ele)) {
    if (this.oldElement) {
      this.nodeRemove(this.oldElement);
      this.oldElement = null;
    }

    return;
  }
  else if (replace && this.oldElement) {
    //bbn.fn.log("REPLACE", this.oldElement, this.element)
    if (this.oldElement.childNodes.length && !this.comment) {
      Array.from(this.element.childNodes).forEach(c => {
        this.element.appendChild(c);
      });
      //bbn.fn.log(["APPEND CHILDREN", this.tag, ele])
    }

    //bbn.fn.log("REMOVE " + (bbn.fn.isComment(this.oldElement) ? 'COMMENT' : (this.tag || 'TEXT')) + ' AND REPLACE WITH '+ (bbn.fn.isComment(this.element) ? 'COMMENT' : (this.tag || 'TEXT')));
    this.oldElement.after(this.element);
  }
  // First time is done in a linear direction
  // @mirko test it!
  else if (!this.parent.num && !this.loopItem) {
    //bbn.fn.log("NUMBUILD");
    if (this.parent?.comment && this.parent.element.parentNode) {
      this.parentElement.insertBefore(ele, this.parent.element);
    }
    else {
      // Append as a new child
      parent.appendChild(ele); 
    }
    //bbn.fn.log(["COMPONENT FIRST TIME", this.tag, ele.tagName])
  }
  else if (after !== undefined) {
    if (!after && parent.childNodes.length) {
      parent.insertBefore(ele, parent.childNodes[0]);
    }
    else if (after) {
      //bbn.fn.log("AFTER", ele, after);
      after.after(ele);
    }
    else {
      parent.appendChild(ele);
    }
  }
  else if (!this.loop && this.loopItem) {
    let rootHash = this.hash.split('-').slice(0, -2).join('-');
    rootHash += rootHash ? rootHash + '-root' : 'root';
    const loopRoot = this.component.$retrieveElement(this.id, rootHash);
    if (!loopRoot) {
      //bbn.fn.log(["APPEND IN LOOP", this.tag, ele])
      parent.appendChild(ele);
    }
    else {
      const lst = loopRoot.bbnSchema.loop.list;
      const idx = lst.indexOf(this.hash);
      if (!idx) {
        loopRoot.parentNode.insertBefore(ele, loopRoot);
        //bbn.fn.log(["APPEND ON ROOT IN LOOP", this.tag, this.id, ele])
      }
      else {
        const eleBefore = idx === -1 ? null : this.component.$retrieveElement(this.id, lst[idx-1]);
        if (eleBefore) {
          eleBefore.after(ele);
        }
        else {
          loopRoot.parentNode.insertBefore(ele, loopRoot);
        }
        //bbn.fn.log(["APPEND AFTER IN LOOP", this.tag, ele])
      }
    }
  }
  else if (this.parent.comment && this.parent.element?.parentNode) {
    this.parent.element.parentNode.insertBefore(ele, this.parent.element);
  }
  else if (this.parent.comment) {
    //bbn.fn.log("COMMENT")
    // Append as a new child
    parent.appendChild(ele);
  }
  else {
    after = false;
    if (parent.childNodes.length) {
      for (let i = parent.childNodes.length - 1; i >= 0; i--) {
        if ((parent.childNodes[i].bbnId !== ele.bbnId) && isBefore(parent.childNodes[i].bbnId, ele.bbnId)) {
          after = parent.childNodes[i];
          break;
        }
      }
    }

    if (after) {
      //bbn.fn.log("AFTER");
      if (after.bbnSchema.loop) {
        after.parentNode.insertBefore(ele, after);
      }
      else {
        // Insert after a specific sibling
        //bbn.fn.log(["AFTER", this.tag, ele, after])
        after.after(ele); 
      }
    }
    else {
      //bbn.fn.log("LAST APPEND");
      //bbn.fn.log(["APPEND AGAIN", this.tag, ele])
      // Append as a new child
      parent.appendChild(ele);
    }
  }
};
