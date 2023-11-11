import bbnCp from "../Cp.js";

/**
 * Creates an element in the given target
 * @param {HTMLElement} d 
 * @param {HTMLElement} target 
 * @returns 
 */
bbnCp.prototype.$createText = function (node, target, loopInfo) {
  const ele = document.createTextNode(node.text);
  bbn.fn.checkType(node.id, String, "Boo");
  Object.defineProperty(ele, 'bbnId', {
    value: node.id,
    writable: false,
    configurable: false
  });
  Object.defineProperty(ele, 'bbnComponentId', {
    value: this.$cid,
    writable: false,
    configurable: false
  });

  if (loopInfo) {
    Object.defineProperty(ele, 'bbnLoopVars', {
      value: loopInfo,
      writable: false,
      configurable: false
    });
  }

  if (node.loopHash) {
    Object.defineProperty(ele, 'bbnHash', {
      value: node.loopHash,
      writable: false,
      configurable: false
    });
    Object.defineProperty(ele, 'bbnIndex', {
      value: node.loopIndex,
      writable: false,
      configurable: false
    });
  }

  this.$addToElements(ele);

  if (bbn.cp.isComponent(target)) {
    if (target.bbnSlots?.default?.length || bbn.fn.removeExtraSpaces(ele.textContent)) {
      target.bbnSlots.default.push(ele);
    }

    if (target.bbn && target.bbn.$isMounted) {
      target.bbn.$tick();
    }
  }
  else if (target !== this.$el) {
    target.appendChild(ele);
  }

  return ele;
}