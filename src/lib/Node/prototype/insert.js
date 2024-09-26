import bbnNode from "../Node.js";
import addToElements from "../../Cp/private/addToElements.js";
import removeFromElements from "../../Cp/private/removeFromElements.js";
import removeDOM from "../../Cp/private/removeDOM.js";

const isBefore = (id1, id2) => {
  if (id1 === id2) {
    throw Error("Cannot compare the same ID in isBefore");
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
    //bbn.fn.log(["IN CP 2 " + cp.$options.name, slot, ele.bbnSchema?.attr?.slot?.value, ele]);
    if (parent.bbnSlots?.[slot]) {
      let search = {bbnId: ele.bbnId};
      if (ele.bbnHash) {
        search.bbnHash = ele.bbnHash;
      }

      let idx = bbn.fn.search(parent.bbnSlots[slot], search);
      if ((idx > -1) && parent.bbnSlots[slot][idx].bbnHash && !ele.bbnHash) {
        idx = -1;
      }

      if (idx > -1) {
        const mounted = !!parent.bbnSlots[slot][idx].parentNode;
        //bbn.fn.log(["REPLACE", parent.bbnSlots[slot][idx], ele, search]);
        if (mounted) {
          parent.bbnSlots[slot][idx].parentNode.replaceChild(ele, parent.bbnSlots[slot][idx]);
        }

        parent.bbnSlots[slot].splice(idx, 1, ele);
      }
      else {
        parent.bbnSlots[slot].push(ele);
      }
    }

    return true;
  }

  return false;
};

bbnNode.prototype.insert = function(ele, after) {
  //bbn.fn.log(["INSERT", this.component.$options.name, after, ele]);
  bbn.fn.checkType(ele, [Text, Comment, HTMLElement, SVGElement]);
  let replace = !!this.element;
  const parent = this.parentElement;

  const cp = this.component;
  if (!parent) {
    if (this.isCommented) {
      if (this.hash) {
        if (this.component.$elements[this.id]?.[this.hash] && (this.component.$elements[this.id]?.[this.hash] !== ele)) {
          this.component.$elements[this.id][this.hash] = ele;
        }
      }
      else if (this.component.$elements[this.id] && (this.component.$elements[this.id] !== ele)) {
        this.component.$elements[this.id] = ele;
      }

      return;
    }

    bbn.fn.log(ele, this, this.parentElement)
    throw new Error("Impossible to find the parent element");
  }

  if (insertInSlot(parent, this, ele)) {
    if (this.hash) {
      if (this.component.$elements[this.id]?.[this.hash] && (this.component.$elements[this.id]?.[this.hash] !== ele)) {
        removeDOM(this.component, this.component.$elements[this.id][this.hash], ele);
      }
    }
    else if (this.component.$elements[this.id] && (this.component.$elements[this.id] !== ele)) {
      removeDOM(this.component, this.component.$elements[this.id], ele);
    }
  }
  else if (replace && this.element) {
    //bbn.fn.log("REPLACE", this.element, ele)
    if (this.element.childNodes.length && !this.comment) {
      Array.from(this.element.childNodes).forEach(c => {
        ele.appendChild(c);
      });
      //bbn.fn.log(["APPEND CHILDREN", this.tag, ele])
    }

    removeDOM(this.component, this.element, ele);
  }
  // First time is done in a linear direction
  else if (!this.component.$numBuild) {
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

  // Register the element in the component's tracking system
  addToElements(this.component, ele);
};
