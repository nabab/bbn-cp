import disconnected from "../../Html/private/disconnected.js";
import bbnNode from "../Node.js";

const removeElement = function(res, ele, node) {
  if (res) {
    if (ele.bbnComponent) {
      ele.bbnComponent.$components.remove(ele);
    }

    if (node) {
      if (!node.comment && node.element && node.events?.['hook:destroy']) {
        const destroy = new Event('hook:destroy');
        node.element.dispatchEvent(destroy);
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
  if (ele.bbnSchema?.directives?.['bbn-portal']?.value === ele.parentNode) {
    const parent = ele.parentNode;
    ele.bbnSchema.directives['bbn-portal'].attrGetValue();
    ele.bbnSchema.directives['bbn-portal'].value = null;
    ele.bbnSchema.directives['bbn-portal'].oldValue = parent;
    ele.bbnSchema.directives['bbn-portal'].lastValue = parent;
    bbn.fn.log("REMOVING PORTAL 2")
    bbn.cp.directives['bbn-portal'].update(ele, {value: null, oldValue: parent});
    if (parent !== ele.parentNode) {
      return;
    }
    else {
      debugger;
    }
  }
  if (ele?.querySelector) {
    const portals = ele.querySelectorAll('.bbn-portal-active');
    if (portals.length) {
      portals.forEach(p => {
        const parent = p.parentNode;
        p.bbnSchema.directives['bbn-portal'].attrGetValue();
        p.bbnSchema.directives['bbn-portal'].value = null;
        p.bbnSchema.directives['bbn-portal'].oldValue = parent;
        p.bbnSchema.directives['bbn-portal'].lastValue = parent;
        bbn.fn.log("REMOVING PORTAL 3")
        bbn.cp.directives['bbn-portal'].update(p, {value: null, oldValue: parent});
      });
    }
  }

  if (ele.bbnSchema?.attr?.ref) {
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
          debugger;
          element.parentNode.removeChild(element);
          bbn.fn.log("Removed", element);
        }
      }
      else {
        element.bbnSchema.nodeRemove(element);
      }
    }
  }

  if (!node?.isComponent && ele.tagName && node?.attributes.length) {
    for (let i = 0; i < node.attributes.length; i++) {
      if (node.attributes[i] instanceof bbnEventAttr) {
        ele.removeEventListener(node.attributes[i].name, node.attributes[i].handler, node.attributes[i].cfg);
      }

      if (node.attributes[i] instanceof bbnModelAttr) {
        const eventName = node.attributes[i].modifiers.includes('lazy') ? 'change' : 'input';
        ele.removeEventListener(eventName, node.attributes[i].handler);
      }
    }
  }

  removeElement(true, ele, node);
};
