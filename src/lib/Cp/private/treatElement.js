import applyPropsOnElement from "./applyPropsOnElement.js";
import getExpState from "./getExpState.js";
import getExpValue from "./getExpValue.js";
import buildElement from "./buildElement.js";
import bbn from "@bbn/bbn";
import setExpResult from "./setExpResult.js";

/**
 * Processes an element in the virtual DOM of a web component.
 * It handles the creation and updating of elements, binding properties and events,
 * processing slots, text nodes, and more.
 * 
 * @param {Object} cp - The component instance containing methods and properties.
 * @param {Object} node - The virtual DOM node from the template to be processed (needs to be cloned for use).
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed element will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {HTMLElement|null} The processed element or null if no element is processed.
 */
export default async function treatElement(cp, eleNode, hash, parent, data, go = false) {
  /** @var {null, HTMLElement} ele The element  */
  let ele = null;
  // Elements must be tags
  if (eleNode.tag) {
    /** @var {String} id Type 0-1, 0-3-6-0-1 */
    const id = eleNode.id;
    /** @var {HTMLElement, null} old The existing element if it exists */
    const old = cp.$retrieveElement(id, hash);
    // For the time being ele is the old element or null
    ele = old;
    
    // Take care of the element if go is true
    if (go) {
      // Setting properties
      // Either the element exists and the object is its bbnSchema or we clone the node
      // Setting the new properties only when needed
      bbn.fn.iterate(eleNode.props, (v, n) => {
        if (n === '_default_') {
          n = old?.bbn?.$cfg?.model?.prop || 'value';
          if (!bbn.fn.isSame(eleNode.props[n], v)) {
            eleNode.props[n] = v;
          }
        }

      });

      // Updating the hash
      if (hash && (eleNode.loopHash !== hash)) {
        eleNode.loopHash = hash;
      }

      // With the custom node we update the props and model.value
      if (eleNode.model) {
        for (let n in eleNode.model) {
          if (getExpState(cp, eleNode.model[n].hash, hash) !== 'OK') {
            eleNode.model[n].value = eleNode.props[n];
          }
        }
      }

      // Updating also the directives
      if (bbn.fn.numProperties(eleNode.directives)) {
        for (let n in eleNode.directives) {
          if (eleNode.directives[n].exp) {
            eleNode.directives[n].value = getExpValue(cp, eleNode.directives[n].hash, hash);
          }
        }
      }
    
      // 'component' tag is a special case
      if (cp.$currentMap[eleNode.id].tag === 'component') {
        if (bbn.fn.isObject(eleNode.props.is)) {
          eleNode.tag = eleNode.props.name ? bbn.fn.camelToCss(eleNode.props.name) : 'bbn-anon';
          eleNode.cfg = bbn.cp.normalizeComponent(eleNode.props.is);
        }
        else {
          eleNode.tag = bbn.fn.camelToCss(eleNode.props.is);
        }
      }

    }
  }

  
  return eleNode;
}
