import retrieveSlots from "../../../internals/retrieveSlots.js";
import stringToTemplate from "../../../internals/stringToTemplate.js";
import templateToMap from "../../../internals/templateToMap.js";
import applyPropsOnElement from "./applyPropsOnElement.js";
import fetchComponents from "./fetchComponents.js";
import treatEvents from "./treatEvents.js";
import treatModel from "./treatModel.js";
import addToElements from "./addToElements.js";
import addUnknownComponent from "./addUnknownComponent.js";
import bbn from "@bbn/bbn";
import { Arr } from "tern";

/**
 * Creates an element in the given target
 * @param {bbnCp} cp
 * @param {Object} node 
 * @param {HTMLElement} parent
 * @param {Object} data 
 * @returns 
 */
const isBefore = (id1, id2) => {
  if (id1 === id2) {
    throw Error("Cannot compare the same ID in isBefore");
  }

  const bits1 = id1.split('-');
  const bits2 = id2.split('-');
  for (let i = 0; i < bits1.length; i++) {
    if (bits1[i] !== bits2[i]) {
      return parseInt(bits1[i]) < parseInt(bits2[i]);
    }
  }

  return true;
}

export default async function buildElement(cp, node, parent, data, before, items) {
  bbn.fn.checkType(cp, bbnCp, "No component in buildElement");
  bbn.fn.checkType(node, "object", "Props must be an object in buildElement");
  bbn.fn.checkType(parent, Element, "Parent must be a DOM element");
  if (node.bbn) {
    throw Error("Props cannot contain a bbn property in buildElement");
  }

  // Check if the node represents a component and not a comment
  let isComponent = !node.comment && cp.$isComponent(node);
  // Retrieve the source component based on node's componentId or default to cp
  // Attempt to retrieve an existing element with the same ID and loopHash
  const oldEle = cp.$retrieveElement(node.id, node.loopHash);
  // Flag to determine if the existing element should be replaced
  let replace = false;
  let ele; // Variable to hold the new or existing element
  // Determine the tag name, adjusting for custom components if necessary
  let tag = node.tag;
  let originalTag = node.tag;
  if (tag && cp.$cfg.componentNames[tag]) {
    tag = cp.$cfg.componentNames[tag];
    isComponent = true;
  }
  // Special handling for components and unknown components
  if (!node.comment && isComponent) {
    // Attempt to add unknown component for dynamic fetching if needed
    if (addUnknownComponent(cp, tag)) {
      // Fetch component definitions if the component is unknown
      await fetchComponents(cp); 
    }
    // Adjust the tag name for static components if necessary
    if (bbn.cp.statics[tag]?.tag) {
      originalTag = tag;
      tag = bbn.cp.statics[originalTag].tag;
    }
  }
  // Decide on creating a new element or reusing the old one
  if (oldEle) {
    // Mark for replacement if an old element exists
    replace = true; 
  }
  // Create the appropriate DOM element based on the node type
  if (node.comment) {
    // Create a comment node for placeholders
    ele = document.createComment(" ***_BBN_*** "); 
  } else if (tag === 'svg') {
    // Create an SVG element for vector graphics
    ele = document.createElementNS("http://www.w3.org/2000/svg", tag); 
    // Set the SVG content
    ele.innerHTML = cp.$currentMap[node.id].content; 
  } else {
    // Handle component elements or standard HTML elements
    const constructorArgs = [tag];
    if (originalTag !== tag) {
      // Handle custom elements with 'is' attribute
      constructorArgs.push({ is: originalTag }); 
    }

    // Create the element
    ele = document.createElement(...constructorArgs); 
    if (originalTag !== tag) {
      // Set the 'is' attribute for custom elements
      ele.setAttribute('is', originalTag); 
    }
    // Additional setup for anonymous components (bbn-anon)
    if (tag === 'bbn-anon' && node.cfg) {
      // Ensure basic mixin is included in configuration
      if (node.cfg.mixins && !node.cfg.mixins.includes(bbn.cp.mixins.basic)) {
        node.cfg.mixins.push(bbn.cp.mixins.basic);
      }
      const tpl = stringToTemplate(node.cfg.template, true);
      // Define properties for configuration, template, mapping, and inline templates
      Object.defineProperties(ele, {
        'bbnCfg': { value: node.cfg, writable: false, configurable: false },
        'bbnTpl': { value: tpl.res, writable: false, configurable: false },
        'bbnMap': { value: tpl.map, writable: false, configurable: false },
        'bbnInlineTemplates': { value: tpl.inlineTemplates, writable: false, configurable: false }
      });
    }
  }
  // Assign a unique ID and schema to the element for tracking and management
  Object.defineProperties(ele, {
    'bbnId': { value: node.id, writable: false, configurable: false },
    'bbnSchema': { value: node, writable: true, configurable: true },
    'bbnComponentId': { value: cp.$cid, writable: false, configurable: false }
  });
  // Additional properties for loop handling and directives
  if (node.loopHash) {
    Object.defineProperties(ele, {
      'bbnHash': { value: node.loopHash, writable: false, configurable: false },
      'bbnIndex': { value: node.loopIndex, writable: false, configurable: false }
    });
  }
  if (!node.comment && node.directives) {
    Object.defineProperty(ele, 'bbnDirectives', {
      value: bbn.fn.createObject(), writable: false, configurable: false
    });
  }
  // Set loop variables if provided
  if (data) {
    Object.defineProperty(ele, 'bbnLoopVars', {
      value: data, writable: false, configurable: false
    });
  }
  // Additional setup for components regarding slots and events
  if (isComponent) {
    let realSlots = tag === 'bbn-anon' ? retrieveSlots(ele.bbnTpl || cp.$currentMap[node.id].items) : bbn.fn.clone(ele.constructor.bbnSlots);
    if (!bbn.fn.numProperties(realSlots)) {
      // Ensure a default slot is always available
      realSlots = { default: [] }; 
    }
    if (items) {
      bbn.fn.warning("MY ITEMS ------------------");
      bbn.fn.log(items)
      bbn.fn.each(items, c => {
        realSlots.default.push(c);
      })
    }
    Object.defineProperty(ele, 'bbnRealSlots', {
      value: realSlots, writable: false, configurable: false
    });
    // Alias for accessing slots directly
    Object.defineProperty(ele, 'bbnSlots', {
      get() { return this.bbnRealSlots; }
    });
  }
  // Apply properties and configurations to the element
  applyPropsOnElement(cp, node, ele, data);
  // Handle predefined content for <pre> elements
  if (node.pre) {
    ele.innerHTML = node.pre;
  }
  if ((parent !== cp.$el) && cp.$isComponent(parent)) {
    const slot = ele.bbnSchema.props?.slot || 'default';
    if (parent.bbnSlots?.[slot]) {
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
    }
  }
  // Determine the insertion method based on the provided arguments
  else if (before) {
    // Insert before a specific sibling
    parent.insertBefore(ele, before); 
  } else if (replace && oldEle) {
    if (oldEle.childNodes.length && !node.comment) {
      Array.from(oldEle.childNodes).forEach(c => {
        ele.appendChild(c);
      });
    }
    if (oldEle.parentNode === parent) {
      // Replace an existing element
      parent.replaceChild(ele, oldEle); 
    }
    else {
      // Append as a new child
      parent.appendChild(ele); 
    }
  }
  // First time is done in a linear direction
  else if (!cp.$numBuild) {
    // Append as a new child
    parent.appendChild(ele); 
  }
  else {
    let after = false;
    for (let i = parent.childNodes.length - 1; i >= 0; i--) {
      if ((parent.childNodes[i].bbnId !== ele.bbnId) && isBefore(parent.childNodes[i].bbnId, ele.bbnId)) {
        after = parent.childNodes[i];
        break;
      }
    }

    if (after) {
      // Insert after a specific sibling
      after.after(ele); 
    }
    else {
      // Append as a new child
      parent.appendChild(ele); 
    }
  }
  // Register the element in the component's tracking system
  addToElements(cp, ele);
  // Handle directives, model bindings, and events for the new element
  if (!node.comment) {
    if (bbn.fn.numProperties(node.directives)) {
      // Apply directives
      bbn.cp.insertDirectives(ele.bbnSchema.directives, ele); 
    }
    if (node.model) {
      // Bind model data
      treatModel(cp, node, ele.bbnHash, ele, data); 
    }
    if (Object.keys(node.events || {}).length) {
      // Set up event listeners
      treatEvents(cp, ele, data); 
    }
  }

  // Return the created or modified element
  return ele; 
}
