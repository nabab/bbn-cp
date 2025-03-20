import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnForgetAttr extends bbnAttr
{
  attrSet(init) {
    if (init) {
      this.attrSetResult();
      if (!this.node.condition || this.node.condition.value) {
        this.node.nodeSwitch(this.value);
      }
    }
  }

  attrUpdate(init) {

    const node = this.node;

    //bbn.fn.log(["FORGET", node.element, init])
    if (!init) {
      this.attrGetValue();
    }

    if (node.condition && !node.condition.value) {
      return;
    }

    //bbn.fn.log(["forget", init, this, this.value, node.element, node.component.$options.name])
    if (!init) {
      const parent = node.parentElement;
      // The element will be forgotten, i.e. passed but not its children.
      if (this.value) {
        //bbn.fn.log(["FORGET TRUE", this.node.component.$options.name, this, parent, this.node.element])
        if (node.element?.childNodes.length) {
          // Iterate over each item in the node.
          while (node.element.childNodes.length) {
            if (!node.element.parentNode && node.parentElement.bbnSlots) {
              const idx = node.parentElement.bbnSlots[node.attr?.slot?.value || 'default'].indexOf(node.element);
              if (idx > -1) {
                node.parentElement.bbnSlots[node.attr?.slot?.value || 'default'].splice(idx, 0, node.element.childNodes[0]);
                node.element.childNodes[0].bbnSchema.nodeRemove(node.element.childNodes[0].bbnSchema.element);
              }
            }
            else if (node.element.previousSibling) {
              node.element.previousSibling.after(node.element.childNodes[0]);
            }
            else {
              parent.prepend(node.element.childNodes[0]);
            }
          }
        }
        // Case where it was a condition which has just been set to true, the children must be conceived.
        else if (node.comment && node.condition) {
          node.nodeConceive();
        }

        if (!node.comment) {
          node.nodeSwitch(true);
        }
      }
      else {
        //bbn.fn.log(["FORGET false", node.component.$options.name, this, parent, node.element, node.comment, node.isCommented])

        if (node.comment) {
          node.nodeSwitch(false);
        }
        if (!node.element) {
          node.nodeInit();
        }

        if (!node.comment) {
          let i = 0;
          let childDone = false;
          let isComponent = node.isComponent;
          while (parent.childNodes[i]) {
            const it = parent.childNodes[i];
            if (!it.bbnId.indexOf(node.id + '-')) {
              let hasClass = false;
              if (it.isConnected && it.classList) {
                hasClass = true;
                it.classList.add('bbn-is-moving');
              }
              childDone = true;
              if (isComponent) {
                const idx = node.element.bbnSlots[it.bbnSchema?.attr?.slot?.value || 'default'].indexOf(it);
                if (idx === -1) {
                  const search = {id: it.bbnId};
                  if (it.bbnHash) {
                    search.bbnHash = it.bbnHash;
                  }
                  let idx2 = bbn.fn.search(node.element.bbnSlots[it.bbnSchema?.attr?.slot?.value || 'default'], search);
                  if (idx2 > -1) {
                    node.element.bbnSlots[it.bbnSchema?.attr?.slot?.value || 'default'].splice(idx2, 1, it);
                  }
                  else {
                    node.element.bbnSlots[it.bbnSchema?.attr?.slot?.value || 'default'].push(it);
                  }
                }
              }
              else {
                parent.insertBefore(it, node.element);
              }
              node.element.append(it);
              if (hasClass) {
                it.classList.remove('bbn-is-moving');
              }
            }
            else {
              i++;
            }
          }

          if (!childDone && node.condition) {
            node.nodeConceive();
          }
        }
      }
    }
  }
}