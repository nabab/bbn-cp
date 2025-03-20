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
    }

    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  }
};

bbnNode.prototype.nodeRemove = function(ele, noTransition) {
  const node = ele.bbnSchema;
  ele.childNodes.forEach(element => {
    if (element.classList && element.bbnSchema?.parent?.isComponent && !element.bbnSchema.parent.comment && (element.bbnSchema.parent !== node.component) && element.bbnSchema.parent.element?.isConnected && element.bbnComponent?.isConnected) {
      if (element.bbnComponent.isConnected) {
        element.classList.add('bbn-is-moving');
      }
  
      ele.removeChild(element);
      bbn.fn.log("Removed", element);
    }
    
  });

  if (ele.classList && node.parent?.isComponent && !node.parent.comment && (node.parent !== node.component) && node.parent.element?.isConnected) {
    if (ele.bbnComponent.isConnected && !node.isCommented) {
      ele.classList.add('bbn-is-moving');
      if (ele.parentNode) {
        ele.parentNode.removeChild(ele);
      }
      bbn.fn.log("Removed2", ele);
      return;
    }
  }

  if (!node.isComponent && ele.tagName && node.attributes.length) {
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
