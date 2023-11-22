import bbn from "@bbn/bbn";
import sr from "./sr.js";
import setInternalResult from "./setInternalResult.js";
import treatProperties from "./treatProperties.js";
import treatItems from "./treatItems.js";
import applyPropsOnElement from "./applyPropsOnElement.js";
import getInternalState from "./getInternalState.js";
import getInternalValue from "./getInternalValue.js";
import createElement from "./createElement.js";
import addToElements from "./addToElements.js";

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
export default async function treatElement(cp, node, hash, parent, data, go = true) {
  /** @var {null, HTMLElement} ele The element  */
  let ele = null;
  // Elements must be tags
  if (node.tag) {
    const id = node.id;
    // The existing element or null
    const old = cp.$retrieveElement(id, hash);
    // For the time being ele is the old element or null
    ele = old;

    const cpSource = ele ? bbn.cp.getComponent(ele.bbnComponentId)?.bbn || cp : cp;
    // Process properties, models and directives and determine if an update is needed.
    const properties = treatProperties(cpSource, id, hash, data, go);
    // If no element we must go on
    if (!old) {
      go = true;
    }
    // Otherwise we check what the properties say
    else if (!go) {
      go = properties.go;
    }
    
    // Take care of the element if go is true
    if (go) {
      // Setting properties
      const props = properties.props;
      if (node.tag === 'bbn-input') {
        bbn.fn.log(["GO", props]);
      }
      // Either the element exists and te object is its bbnSchema or we clone the node
      const eleNode = old ? old.bbnSchema : bbn.fn.clone(node);
      // And in this case remove its items
      if (!old) {
        delete eleNode.items;
        // And set the props on the new object
        eleNode.props = props;
        if (eleNode.model?.$_default) {
          eleNode.model[eleNode.model.modelProp || 'value'] = eleNode.model.$_default;
          delete eleNode.model.$_default;
        }
      }
      else {
        // Setting the new properties only when needed
        bbn.fn.iterate(props, (v, n) => {
          if (!bbn.fn.isSame(eleNode.props[n], v)) {
            eleNode.props[n] = v;
          }
        });
      }

      // Updating the hash
      if (hash && (eleNode.loopHash !== hash)) {
        eleNode.loopHash = hash;
      }

      // With the custom node we update the props and model.value
      if (eleNode.model) {
        for (let n in eleNode.model) {
          let v = getInternalValue(cp, eleNode.model[n].id, hash);
          if (!bbn.fn.isSame(eleNode.model[n].value, v)) {
            eleNode.model[n].value = eleNode.props[n];
          }
        }
      }

      // Updating also the directives
      if (bbn.fn.numProperties(node.directives)) {
        for (let n in node.directives) {
          if (node.directives[n].exp) {
            eleNode.directives[n].value = getInternalValue(cp, node.directives[n].id, hash);
          }
        }
      }
    
      if (node.tag === 'bbn-input') {
        bbn.fn.log(["PROPS", JSON.stringify(eleNode.props, null, 2)]);
      }
      
      // 'component' tag is a special case
      if (node.tag === 'component') {
        if (bbn.fn.isObject(props.is)) {
          eleNode.tag = props.name ? bbn.fn.camelToCss(props.name) : 'bbn-anon';
          eleNode.cfg = bbn.cp.normalizeComponent(props.is);
        }
        else {
          eleNode.tag = bbn.fn.camelToCss(props.is);
        }
      }

      /** @var {Boolean} anew If true the element needs to be created */
      let anew = false;
      // True if the element doesn't exist, is a comment, or has a different tag
      if ((ele !== cpSource.$el) && (!ele || bbn.fn.isComment(ele) || (eleNode.tag !== node.tag))) {
        anew = true;
      }
 
      // Create the element if needed
      if (anew) {
        ele = await createElement(cpSource, eleNode, parent, data);
      }
      // Or update the element
      else {
        if (bbn.fn.numProperties(node.directives)) {
          for (let n in eleNode.directives) {
            if (eleNode.directives[n].exp) {
              if (getInternalState(cp, eleNode.directives[n].id, hash) !== "OK") {
                eleNode.directives[n].value = getInternalValue(cp, eleNode.directives[n].id, hash);
                ele.bbnSchema.directives[n].value = eleNode.directives[n].value;
                bbn.cp.updateDirectives({[n]: eleNode.directives[n]}, ele);
              }
            }
          }
        }
      }

      applyPropsOnElement(cp, eleNode, ele);
    }

    // Handle 'pre' directive or process child items.
    if (node.pre) {
      if (ele) {
        let preVal = setInternalResult(cp, node.id, `${node.pre}`, hash);
        if (ele.innerHTML !== preVal) {
          ele.innerHTML = preVal;
        }
      }
    }
    else if (node.items) {
      await treatItems(cp, node.items, hash, ele || parent, data);
    }

    // Append the processed element to the parent.
    if (ele) {
      const isParentComponent = (parent !== cp.$el) && bbn.cp.isComponent(parent);
      let replace = false;
      const isComment = bbn.fn.isComment(ele);
      if (old) {
        const isOldComment = bbn.fn.isComment(old);
        if (
          (old !== cp.$el)
          && (
            (isOldComment !== isComment)
            || (
              !isOldComment
              && node.tag
              && !bbn.cp.isTag(node.tag, old)
            )
          )
        ) {
          replace = true;
        }
        else {
          ele = old;
        }
      }
    
      if (replace) {
        //bbn.fn.log("REPLACE", ele);
        if (isParentComponent && !ele.bbnSchema?.comment) {
          //bbn.fn.log("IN CP " + parent.tagName, ele);
          const slot = ele.getAttribute("slot") || 'default';
          if (parent.bbnSlots?.[slot]) {
            let search = {bbnId: old.bbnId};
            if (ele.bbnHash) {
              search.bbnHash = ele.bbnHash;
            }
            let idx = bbn.fn.search(parent.bbnSlots[slot], search);
            if (idx > -1) {
              /*
              const mounted = !!parent.bbnSlots[slot][idx].parentNode;
              if (mounted) {
                old.parentNode.replaceChild(ele, old);
              }
              */
    
              parent.bbnSlots[slot].splice(idx, 1, ele);
              if (parent.bbn && parent.bbn.$isMounted) {
                parent.bbn.$tick();
              }
            }
          }
        }
        else {
          if (old.parentNode) {
            try {
              old.parentNode.replaceChild(ele, old);
            }
            catch (e) {
              bbn.fn.log("ERROR IN REPLACE", e, ele, old);
            }
          }
          else {
            try {
              parent.appendChild(ele);
            }
            catch (e) {
              bbn.fn.log("ERROR IN APPEND", e, ele, old);
            }
          }
        }
    
        addToElements(cp, ele);
      }
      else if (old !== ele) {
        //bbn.fn.log(["INSERT ", ele, old]);
        if (isParentComponent) {
          const slot = ele.bbnSchema.props?.slot || 'default';
          if (parent.bbnSlots?.[slot]) {
            if (!ele.bbnSchema && !bbn.fn.removeExtraSpaces(ele.textContent)) {
              return;
            }
    
            let search = {bbnId: ele.bbnId};
            if (ele.bbnHash) {
              search.bbnHash = ele.bbnHash;
            }
    
            let idx = bbn.fn.search(parent.bbnSlots[slot], search);
            if (idx > -1) {
              const mounted = !!parent.bbnSlots[slot][idx].parentNode;
              if (mounted) {
                parent.bbnSlots[slot][idx].parentNode.replaceChild(ele, parent.bbnSlots[slot][idx]);
              }
    
              parent.bbnSlots[slot].splice(idx, 1, ele);
            }
            else {
              parent.bbnSlots[slot].push(ele);
            }
            addToElements(cp, ele);
          }
        }
        else {
          /*
          if (parent.childNodes[prevElementIndex]) {
            parent.childNodes[prevElementIndex].after(ele);
          }
          else {*/
            parent.appendChild(ele);
          //}
    
          addToElements(cp, ele);
        }
      }
    }
  }

  
  return ele;
}
