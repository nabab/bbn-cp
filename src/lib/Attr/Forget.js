import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnForgetAttr extends bbnAttr
{
  async set(init) {
    if (init) {
      this.setResult();
      if (!this.node.condition || this.node.condition.value) {
        await this.node.setComment(this.value);
      }
    }
  }

  async update(init) {

    const node = this.node;

    //bbn.fn.log(["FORGET", node.element, init])
    if (!init) {
      this.getValue();
    }

    if (node.condition && !node.condition.value) {
      return;
    }

    if (!init) {
      const parent = node.parentElement;
      if (this.value) {
        if (node.element.childNodes.length) {
          // Iterate over each item in the node.
          while (node.element.childNodes.length) {
            if (!node.element.parentNode && node.parentElement.bbnSlots) {
              const idx = node.parentElement.bbnSlots[node.attr?.slot?.value || 'default'].indexOf(node.element);
              if (idx > -1) {
                node.parentElement.bbnSlots[node.attr?.slot?.value || 'default'].splice(idx, 0, node.element.childNodes[0]);
                node.element.removeChild(node.element.childNodes[0]);
              }
            }
            else {
              node.element.parentNode.insertBefore(node.element.childNodes[0], node.element);
            }
          }
        }
        else if (node.comment && node.condition) {
          await node.conceive();
        }

        if (!node.comment) {
          await node.setComment(true);
        }
      }
      else {
        if (node.comment) {
          await node.setComment(false);
        }

        if (!this.node.comment) {
          let i = 0;
          let childDone = false;
          while (parent.childNodes[i]) {
            const it = parent.childNodes[i];
            if (!it.bbnId.indexOf(this.node.id + '-')) {
              childDone = true;
              node.element.append(it);
            }
            else {
              i++;
            }
          }

          if (!childDone && this.node.condition) {
            await this.node.conceive();
          }
        }
      }
    }
  }
}