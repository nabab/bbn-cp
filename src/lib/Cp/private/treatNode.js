import bbn from "@bbn/bbn";
import treatProperties from "./treatProperties.js";
import treatItems from "./treatItems.js";
import treatSlot from "./treatSlot.js";
import treatText from "./treatText.js";
import treatForgotten from "./treatForgotten.js";
import treatElement from "./treatElement.js";
import buildElement from "./buildElement.js";
import setExpResult from "./setExpResult.js";
import getExpState from "./getExpState.js";
import getExpValue from "./getExpValue.js";
import applyPropsOnElement from "./applyPropsOnElement.js";

/**
 * Processes an element in the virtual DOM of a web component.
 * It handles the creation and updating of elements, binding properties and events,
 * processing slots, text nodes, and more.
 * 
 * @param {Object} cp - The component instance containing methods and properties.
 * @param {Object} node - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed element will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @param {Array} hashList - An array of elements done through an upper loop
 * @returns {HTMLElement|null} The processed element or null if no element is processed.
 */
export default async function treatNode (
  cp,
  node,
  hash,
  parent,
  data,
  go = false,
  hashList
) {
  // Default parent to a DocumentFragment if not provided.
  if (!parent) {
    parent = new DocumentFragment();
  }

  // Retrieve the existing element and its virtual DOM node.
  // Process text nodes
  if (Object.hasOwn(node, 'text')) {
    return treatText(cp, node, hash, parent, data);
  }
  // process slots content
  else if (node.tag === 'slot') {
    return treatSlot(cp, node, hash, parent, data);
  }
  else if (node.tag) {
    const old = cp.$retrieveElement(node.id, hash);
    let forgotten = null;
    let ele = old;
    let anew = false;
  
    // Handle 'forget' directive to conditionally remove elements.
    forgotten = await treatForgotten(cp, node, hash, parent, data);
    if (forgotten) {
      go = false;

    }
    // Special handling for 'transition' and 'template' tags.
    else if (!node.pre && ['transition', 'template'].includes(node.tag)) {
      go = false;
      forgotten = true;
    }

    const isOldComment = old && bbn.fn.isComment(old);
    // Determine if the element already exists or needs to be created.
    if (!go && !forgotten && (!old || isOldComment || !bbn.cp.isTag(node.tag, old))) {
      go = true;
    }

    let isComponent;
    // Only for showable elements (no template, transition, forget, etc.)
    if (go) {
      if (isOldComment && node.comment) {
        node.comment = false;
      }
  
      // Update every attributes/models/directives, and populates props accordingly (all in the node)
      go = treatProperties(cp, node, hash, data, go);
        // If no element we must go on
      if (isOldComment || !old) {
        go = true;
      }

      if (go) {
        await treatElement(cp, node, hash, parent, data, go);
        /** @var {Boolean} anew If true the element needs to be created */
        // True if the element doesn't exist, is a comment, or has a different tag
        if ((ele !== cp.$el) && (!ele || bbn.fn.isComment(ele) || !bbn.cp.isTag(node.tag, ele))) {
          anew = true;
        }
  
        // Create the element if needed
        if (anew) {
          isComponent = !node.comment && cp.$isComponent(node);
          if (node.tag && cp.$cfg.componentNames[node.tag]) {
            isComponent = true;
          }

          ele = await buildElement(cp, node, parent, data);
          if (node.forget && (getExpState(cp, node.forget.hash, hash) !== 'OK') && (!node.comment)) {
            Array.from(parent.childNodes).forEach(node => {
              if (node.bbnId.indexOf(node.id + '-') === 0) {
                ele.appendChild(node);
              }
            });
          }

          if (isComponent) {
            cp.$connectors.push(ele);
          }
        }
        // Or update the element
        else {
          if (bbn.fn.numProperties(node.directives)) {
            for (let n in node.directives) {
              if (node.directives[n].exp) {
                if (getExpState(cp, node.directives[n].hash, hash) !== "OK") {
                  node.directives[n].value = getExpValue(cp, node.directives[n].hash, hash);
                  ele.bbnSchema.directives[n].value = node.directives[n].value;
                  bbn.cp.updateDirectives({[n]: node.directives[n]}, ele);
                }
              }
            }
          }

          applyPropsOnElement(cp, node, ele, data);
        }
      }
    }

    // Handle 'pre' directive or process child items.
    if (node.pre) {
      if (ele) {
        if (ele.innerHTML !== node.pre) {
          ele.innerHTML = node.pre;
        }
      }
    }
    else if (cp.$currentMap[node.id].items?.length) {
      await treatItems(cp, cp.$currentMap[node.id].items, hash, forgotten ? parent : ele, data, forgotten ? hashList : null);
    }

    if (!ele && ['transition', 'template'].includes(node.tag)) {
      node.comment = true;
      ele = await buildElement(cp, node, parent, data);
    }


    return ele;
  }

  return null;
}
