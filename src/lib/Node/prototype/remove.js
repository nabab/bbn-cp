import bbnNode from "../Node.js";
import onHook from "../../Html/private/onHook.js";
import isComponent from "../../../functions/isComponent.js";

const removeElement = function(res, ele, node) {
  if (res) {
    if (ele.bbnComponent) {
      ele.bbnComponent.$components.remove(ele);
    }

    if (!(ele instanceof Comment) && isComponent(ele) && !ele.$isDestroying) {
      onHook(ele, 'beforeDestroy');
      ele.$isDestroying = true;
      if (ele.bbnSchema.events?.['hook:beforedestroy']) {
        const beforeDestroy = new Event('hook:beforedestroy');
        ele.bbnSchema.events['hook:beforedestroy'].handler.bind(ele.bbnComponent)(beforeDestroy);
      }
    }

    if (node) {
      if (!(ele instanceof Comment) && node.events?.['hook:destroy']) {
        const destroy = new CustomEvent('hook:destroy', bbn.fn.createObject({
          cancelable: false,
          detail: {
            __bbnEvent: true,
            __bbnCid: ele.bbnComponent?.$cid
          }
        }));
        ele.dispatchEvent(destroy);
      }

      if (node?.oldElement === ele) {
        node.oldElement = null;
      }

      if (ele === node.element) {
        node.element = null;
      }
    }

    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
    else {
      ele.remove();
    }
  }
};

bbnNode.prototype.nodeRemove = function(ele, noTransition) {
  if (ele.bbnId && !ele.bbnSchema) {
    return;
  }
  /*
  if (ele.bbnDirectives && (ele.bbnSchema?.directives?.['bbn-portal']?.value === ele.parentNode)) {
    const parent = ele.parentNode;
    bbn.fn.log("rm PORTAL 2", ele.bbnSchema.comment, ele.bbnSchema.isCommented)
    debugger;
    const d = ele.bbnSchema.directives['bbn-portal'];
    d.attrGetValue();
    d.value = null;
    d.oldValue = parent;
    d.lastValue = parent;
    bbn.cp.directives['bbn-portal'].update(ele, {value: null, oldValue: parent});
    if (parent !== ele.parentNode) {
      return;
    }
  }*/
  if (ele?.querySelector) {
    const portals = ele.querySelectorAll('.bbn-portal-active');
    if (portals.length) {
      bbn.fn.each(portals, p => {
        const parent = p.parentNode;
        const d = p.bbnSchema.directives['bbn-portal'];
        d.attrGetValue();
        d.value = null;
        d.oldValue = parent;
        d.lastValue = parent;
        bbn.cp.directives['bbn-portal'].update(p, {value: null, oldValue: parent});
      });
    }
  }

  if (ele?.bbnSchema?.attr?.ref) {
    const refs = ele.bbnComponent.$refsElements[ele.bbnSchema.attr.ref.value];
    if (bbn.fn.isArray(refs)) {
      const idx = refs.indexOf(ele);
      if (idx > -1) {
        refs.splice(idx, 1);
      }
    }
    else if (refs === ele) {
      ele.bbnComponent.$refsElements[ele.bbnSchema.attr.ref.value] = null;
    }
  }

  const node = ele.bbnSchema;
  if (node?.tag === 'slot') {
    for (let i = 0; i < node.component.$slots[node.realName].length; i++) {
      const element = node.component.$slots[node.realName][i];
      if (element.bbnId && !element.bbnSchema) {
        continue;
      }
      if (!element.bbnSchema) {
        if (node.parentNode) {
          node.parentNode.removeChild(element);
        }

        node.component.$slots[node.realName].splice(i, 1);
        i--;
        continue;
      }

      if (element.bbnSchema.tag === 'slot') {
        element.bbnSchema.nodeRemove(element);
        continue;
      }

      if (element.bbnComponent?.isConnected && element.bbnSchema?.parentElement?.isConnected) {
        if (element.classList) {
          element.classList.add('bbn-is-moving');
        }

        if (element.isConnected) {
          if (node.component.bbnSchema?.forget?.value) {
            node.component.bbnSchema.element.parentNode.insertBefore(element, node.component.bbnSchema.element);
          }
          else {
            throw new Error(bbn._("sdsdsdsd"));
            debugger;
            element.parentNode.removeChild(element);
            bbn.fn.log("Removed", element);
          }
        }
      }
      else {
        element.bbnSchema.nodeRemove(element);
      }
    }
  }

  /*
  if (ele.bbnComponentSlot) {
    for (let n in ele.bbnComponentSlot.$slots) {
      let idx = ele.bbnComponentSlot.$slots[n].indexOf(ele);
      if (idx > -1) {
        ele.bbnComponentSlot.$slots[n].splice(idx, 1);
        break;
      }
    }
  }*/

  removeElement(true, ele, node);
};
