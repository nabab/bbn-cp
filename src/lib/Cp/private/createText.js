import addToElements from './addToElements.js';
/**
 * Creates an element in the given target
 * @param {bbnCp} cp
 * @param {HTMLElement} d 
 * @param {HTMLElement} target 
 * @returns 
 */
export default function createText(cp, node, target, loopInfo) {
  const ele = document.createTextNode(node.text);
  bbn.fn.checkType(node.id, String, "The node id must be a string");
  Object.defineProperty(ele, 'bbnId', {
    value: node.id,
    writable: false,
    configurable: false
  });
  Object.defineProperty(ele, 'bbnComponentId', {
    value: cp.$cid,
    writable: false,
    configurable: false
  });

  Object.defineProperty(ele, 'bbnSchema', {
    value: node,
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

  addToElements(cp, ele);

  if (bbn.cp.isComponent(target)) {
    if (target.bbnSlots?.default?.length || bbn.fn.removeExtraSpaces(ele.textContent)) {
      target.bbnSlots.default.push(ele);
    }

    if (target.bbn && target.bbn.$isMounted) {
      target.bbn.$tick();
    }
  }
  else if (target !== cp.$el) {
    target.appendChild(ele);
  }

  return ele;
}