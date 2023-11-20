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
 * @param {Object} node - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed element will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {HTMLElement|null} The processed element or null if no element is processed.
 */
export default async function treatElement(cp, node, hash, parent, data, go = true) {
  // Default parent to a DocumentFragment if not provided.
  let ele = null;
  if (node.tag) {
    const id = node.id;
    const old = cp.$retrieveElement(id, hash);
    ele = old;
    // Process properties and determine if an update is needed.
    const tmp = treatProperties(cp, id, hash, data, go);
    if (!go) {
      go = tmp.go;
    }

    const props = tmp.props;

    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          sr(cp, node.directives[n], hash, data);
          if (!go && (getInternalState(cp, node.directives.id, hash) !== "OK")) {
            go = true;
          }
        }
      }
    }

    // Start if ($_go)
    if (go) {
      //bbn.fn.log("IN TODO " + cp.$options.name);
      //bbn.fn.log("DOING ${node.id} ${node.tag}");
      const tmp = old ? old.bbnSchema : bbn.fn.clone(node);
      delete tmp.items;

      if (hash && (tmp.loopHash !== hash)) {
        tmp.loopHash = hash;
      }

      tmp.props = props;
      
      if (node.tag === 'component') {
        if (bbn.fn.isObject(props.is)) {
          tmp.tag = props.name ? bbn.fn.camelToCss(props.name) : 'bbn-anon';
          tmp.cfg = bbn.cp.normalizeComponent(props.is);
        }
        else {
          tmp.tag = bbn.fn.camelToCss(props.is);
        }
      }

      let anew = false;
      if ((ele !== cp.$el) && (!ele || bbn.fn.isComment(ele) || (tmp.tag !== node.tag))) {
        anew = true;
      }

      if (anew) {
        if (bbn.fn.numProperties(node.directives)) {
          for (let n in node.directives) {
            if (node.directives[n].exp) {
              tmp.directives[n].value = sr(cp, node.directives[n], hash, data);
            }
          }
        }

        ele = await createElement(cp, tmp, parent, data);
      }
      else {
        if (node.model) {
          tmp.model = ele.bbnSchema.model;
          for (let n in node.model) {
            if (n === '_default_') {
              if (cp.$isComponent(ele)) {
                let modelProp = ele.bbnCfg?.model?.prop || ele.constructor?.bbnCfg?.model?.prop || 'value';
                tmp.model[modelProp].value = tmp.props[modelProp];
              }
              else {
                tmp.model.value.value = tmp.props.value;
              }
            }
            else {
              tmp.model[n].value = tmp.props[n];
            }
          }
        }
        if (bbn.fn.numProperties(node.directives)) {
          for (let n in node.directives) {
            if (node.directives[n].exp) {
              if ($getInternalState(cp, node.directives[n].id, hash) !== "OK") {
                node.directives[n].value = getInternalValue(cp, node.directives[n].id, hash);
                ele.bbnSchema.directives[n].value = node.directives[n].value;
                bbn.cp.updateDirectives({[n]: node.directives[n]}, ele);
              }
            }
          }
        }
      }

      applyPropsOnElement(cp, tmp, ele);
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
