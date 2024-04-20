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
export default async function treatElement(cp, node, hash, parent, data, go = false) {
  /** @var {null, HTMLElement} ele The element  */
  let ele = null;
  // Elements must be tags
  if (node.tag) {
    /** @var {String} id Type 0-1, 0-3-6-0-1 */
    const id = node.id;
    /** @var {HTMLElement, null} old The existing element if it exists */
    const old = cp.$retrieveElement(id, hash);
    // For the time being ele is the old element or null
    ele = old;
    
    // Take care of the element if go is true
    if (go) {
      // Setting properties
      // Either the element exists and the object is its bbnSchema or we clone the node
      // Setting the new properties only when needed

      // Updating the hash
      if (hash && (node.loopHash !== hash)) {
        node.loopHash = hash;
      }

      // With the custom node we update the props and model.value
      if (node.model) {
        if (node.model._default_ && old?.bbn?.$cfg) {
          let n = old.bbn.$cfg.model?.prop || 'value';
          if (!bbn.fn.isSame(node.model[n], node.model._default_)) {
            node.model[n] = node.model._default_;
          }

          if (Object.hasOwn(node.props, '_default_')) {
            let n = old?.bbn?.$cfg?.model?.prop || 'value';
            if (!bbn.fn.isSame(node.props[n], node.props._default_)) {
              node.props[n] = node.props._default_;
            }
            delete node.props._default_;
          }

          delete node.model._default_;
        }

        for (let n in node.model) {
          if (getExpState(cp, node.model[n].hash, hash) !== 'OK') {
            node.model[n].value = node.props[n];
          }
        }
      }

      // Updating also the directives
      if (bbn.fn.numProperties(node.directives)) {
        for (let n in node.directives) {
          if (node.directives[n].exp) {
            node.directives[n].value = getExpValue(cp, node.directives[n].hash, hash);
          }
        }
      }
    
      // 'component' tag is a special case
      if (cp.$currentMap[node.id].tag === 'component') {
        if (bbn.fn.isObject(node.props.is)) {
          node.tag = node.props.name ? bbn.fn.camelToCss(node.props.name) : 'bbn-anon';
          node.cfg = bbn.cp.normalizeComponent(node.props.is);
        }
        else {
          node.tag = bbn.fn.camelToCss(node.props.is);
        }
      }

    }
  }

  
  return node;
}
