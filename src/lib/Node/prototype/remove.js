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

  if (!noTransition && node?.transition) {
    if (ele.tagName) {
      bbn.fn.log("Transition", ele)
      node.transition.prepareTransition("leave", ele);
      node.transition.prom = node.transition.executeTransition("leave", ele);
    }
  }
  else {
    removeElement(true, ele, node);
  }
};
