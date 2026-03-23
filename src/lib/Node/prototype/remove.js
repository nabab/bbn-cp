import bbnNode from "../Node.js";
import onHook from "../../Html/private/onHook.js";
import isComponent from "../../../functions/isComponent.js";
import queueUpdate from "../../../functions/queueUpdate.js";

const removeElement = function(res, ele, node) {
  if (res) {

    if (node) {
      if (!(ele instanceof Comment) && isComponent(ele) && !ele.$isDestroying) {
        onHook(ele, 'beforeDestroy');
        if (ele.bbnNode.events?.['hook:beforedestroy']) {
          const beforeDestroy = new Event('hook:beforedestroy');
          ele.bbnNode.events['hook:beforedestroy'].handler.bind(ele.bbnComponent)(beforeDestroy);
        }

        if (ele.bbnComponent) {
          ele.bbnComponent.$components.remove(ele);
        }
        /*bbn.fn.each(ele.$components.all, component => {
          component.bbnNode.nodeClean(true);
        })*/
        ele.$destroy();
      }
      else if (!(ele instanceof Comment) && node.events?.['hook:destroy']) {
        const destroy = new CustomEvent('hook:destroy', bbn.fn.createObject({
          cancelable: false,
          detail: {
            __bbnEvent: true,
            __bbnCid: ele.bbnComponent?.$cid
          }
        }));
        ele.dispatchEvent(destroy);
      }


      if (!node.isComponent && ele.tagName && node.attributes?.length) {
        if (node.model) {
          for (let n in node.model) {
            const eventName = node.model[n].modifiers.includes('lazy') ? 'change' : 'input';
            ele.removeEventListener(eventName, node.model[n].handler);
          }
        }
        if (node.events) {
          for (let n in node.events) {
            ele.removeEventListener(n, node.events[n].handler, node.events[n].cfg);
          }
        }
      }
    
      if (node?.oldElement === ele) {
        node.oldElement = null;
      }

      if (ele === node.element) {
        node.element = null;
      }
    }

    ele.remove();
  }
};

bbnNode.prototype.nodeRemove = function(ele, noTransition) {
  if (ele.bbnId && !ele.bbnNode) {
    return;
  }
  if (ele.bbnIsStart || ele.bbnIsEnd) {
    return;
  }
  /*
  if (ele.bbnDirectives && (ele.bbnNode?.directives?.['bbn-portal']?.value === ele.parentNode)) {
    const parent = ele.parentNode;
    bbn.fn.log("rm PORTAL 2", ele.bbnNode.comment, ele.bbnNode.isCommented)
    debugger;
    const d = ele.bbnNode.directives['bbn-portal'];
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
        const d = p.bbnNode.directives['bbn-portal'];
        d.attrGetValue();
        d.value = null;
        d.oldValue = parent;
        d.lastValue = parent;
        bbn.cp.directives['bbn-portal'].update(p, {value: null, oldValue: parent});
      });
    }
  }

  if (ele?.bbnNode?.attr?.ref) {
    const refs = ele.bbnComponent.$refsElements[ele.bbnNode.attr.ref.value];
    if (bbn.fn.isArray(refs)) {
      const idx = refs.indexOf(ele);
      if (idx > -1) {
        refs.splice(idx, 1);
      }
    }
    else if (refs === ele) {
      ele.bbnComponent.$refsElements[ele.bbnNode.attr.ref.value] = null;
    }
  }

  const node = ele.bbnNode;
  if (node?.tag === 'slot') {
    for (let i = 0; i < node.component.$slots[node.realName].length; i++) {
      const element = node.component.$slots[node.realName][i];
      if (element.bbnId && !element.bbnNode) {
        continue;
      }
      if (!element.bbnNode) {
        if (node.parentNode) {
          node.parentNode.removeChild(element);
        }

        node.component.$slots[node.realName].splice(i, 1);
        i--;
        continue;
      }

      if (element.bbnNode.tag === 'slot') {
        element.bbnNode.nodeRemove(element);
        continue;
      }

      if (element.bbnComponent?.isConnected && element.bbnNode?.parentElement?.isConnected) {
        if (element.classList) {
          element.classList.add('bbn-is-moving');
        }

        if (element.isConnected) {
          if (node.component.bbnNode?.forget?.value) {
            node.component.bbnNode.element.parentNode.insertBefore(element, node.component.bbnNode.element);
          }
          else {
            element.parentNode.removeChild(element);
          }
        }
      }
      else {
        element.bbnNode.nodeRemove(element);
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
