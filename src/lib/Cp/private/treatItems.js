import bbn from "@bbn/bbn";
import sr from "./sr.js";
import treatNode from "./treatNode.js";
import removeDOM from "./removeDOM.js";
import createElement from "./createElement.js";
import getInternalValue from "./getInternalValue.js";
import setInternalResult from "./setInternalResult.js";
import getInternalState from "./getInternalState.js";



/**
 * Applies a condition to a specific element, treating it if the condition is true,
 * and deleting it if the condition is false.
 * 
 * @param {bbnCp} cp - The context provider, containing methods and properties to manipulate elements.
 * @param {boolean} conditionValue - The condition value determining the action to be taken.
 * @param {Object} node - The node object representing the element to be treated or deleted.
 * @param {string} hash - A unique identifier for the element, used in conjunction with cp.
 * @param {HTMLElement} parent - The parent element of the node.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @returns {Object|null} The treated element if the condition is true, otherwise null.
 */
const applyCondition = async (cp, conditionValue, node, hash, parent, data) => {
  let ele = null;

  // If the condition is true, treat the element.
  if (conditionValue) {
    ele = await treatNode(cp, node, hash, parent, data, true);
  }
  // If the condition is false, delete the element if it exists.
  else {
    // Special handling for specific node tags like 'template', 'transition', 'slot'.
    if (['template', 'transition', 'slot'].includes(node.tag)) {
      if (node.items) {
        // Iterate over each item in the node.
        bbn.fn.each(node.items, it => {
          let e = cp.$retrieveElement(it.id, hash);
          // Remove the element if it exists and is not a comment.
          if (e && !bbn.fn.isComment(e)) {
            removeDOM(cp, e);
          }
        });
      }
    }
    else {
      // Retrieve the element based on node id and hash.
      let e = cp.$retrieveElement(node.id, hash);

      // Check if the element is not a comment.
      if (!bbn.fn.isComment(e)) {
        // If the element exists, remove it.
        if (e) {
          removeDOM(cp, e);
        }

        // Create a placeholder comment element in place of the removed element.
        e = await createElement(cp, {
          id: node.id,
          hash: node.condition.hash,
          loopHash: hash,
          conditionId: node.conditionId,
          comment: true
        }, parent, cp.$currentMap[node.id]);
      }
    }
  }

  return ele;
};


/**
 * Processes a collection of items representing a virtual DOM structure and creates
 * HTML elements based on defined conditions and loops.
 * 
 * @param {bbnCp} cp - The context provider, containing methods and properties for element manipulation.
 * @param {Array} items - An array of item objects, each representing a virtual DOM node.
 * @param {string} hash - A unique identifier used in conjunction with cp.
 * @param {HTMLElement} parent - The parent element to which new elements will be appended.
 * @param {Object} data - Additional data that might be required for processing the elements.
 * @returns {HTMLElement} The parent element with all the processed child elements appended.
 */
export default async function treatItems(cp, items, hash, parent, data) {
  // Initialize data and parent if they are not provided.
  if (!data) {
    data = bbn.fn.createObject();
  }

  let firstGo = false;
  if (!parent) {
    firstGo = !cp.$numBuild
    parent = firstGo ? new DocumentFragment() : cp.$el;
  }

  // Variables for handling conditions and loops.
  let conditionId = null;
  let isConditionTrue = true;
  let conditionValue = true;
  let hadLoopItemDefined;
  let hadLoopIndexDefined;
  let prevLoopItemValue;
  let prevLoopIndexValue;

  // Iterate over each item in the items array.
  for (let i = 0; i < items.length; i++) {
    const node = items[i];

    // Handle loop structures within the node.
    if (node.loop?.exp) {
      let loopValue = sr(cp, node.loop, hash, data);
      const isNumber = bbn.fn.isNumber(loopValue);
      if (isNumber) {
        loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a => parseInt(a));
      }

      const isArray = bbn.fn.isArray(loopValue);

      // Remember previous values if loop item or index already defined.
      if (node.loop.item && Object.hasOwn(data, node.loop.item)) {
        hadLoopItemDefined = true;
        prevLoopItemValue = data[node.loop.item];
      }

      if (node.loop.index && Object.hasOwn(data, node.loop.index)) {
        hadLoopIndexDefined = true;
        prevLoopIndexValue = data[node.loop.index];
      }

      // Log loop value for debugging.
      // bbn.fn.log("LOOPVALUE", loopValue, data);

      // Construct a unique hash for each loop iteration.
      const oHash = hash ? hash + '-' : '';
      for (let j in loopValue) {
        if (isArray) {
          j = parseInt(j);
        }

        
        let key = j;
        if (node.attr?.key?.exp) {
          key = sr(cp, node.attr.key, hash, bbn.fn.extend({}, data, {[node.loop.item]: loopValue[j]}));
        }

        hash = oHash + node.loop.id + '-' + j + '-' + key;

        // Set loop item and index in the data.
        data[node.loop.item] = setInternalResult(cp, node.loop.item, loopValue[j], hash);
        if (node.loop.index) {
          setInternalResult(cp, node.loop.index, j, hash);
          data[node.loop.index] = j;
        }

        // Evaluate the condition for the current loop iteration.
        if (node.condition) {
          if (node.condition.type !== 'if') {
            throw new Error("The condition in a loop can only be of type 'if'");
          }
          conditionValue = sr(cp, node.condition, hash, data);
        } else {
          conditionValue = true;
        }

        // Apply the condition to the current node.
        await applyCondition(cp, conditionValue, node, hash, parent, data);
      }

      // Restore previous loop item and index values if they were overwritten.
      if (hadLoopItemDefined) {
        data[node.loop.item] = prevLoopItemValue;
        hadLoopItemDefined = null;
      }
      else {
        delete data[node.loop.item];
      }

      if (hadLoopIndexDefined) {
        data[node.loop.index] = prevLoopIndexValue;
        hadLoopIndexDefined = null;
      }
      else if (node.loop.index) {
        delete data[node.loop.index];
      }
    }
    // Handle non-loop nodes.
    else {
      // Process nodes with conditions.
      if (node.condition) {
        if (node.conditionId !== conditionId) {
          conditionId = node.conditionId;
          isConditionTrue = false;
          let tmp = items.filter(a => (a.conditionId === node.conditionId));

          // Evaluate conditions for the current node.
          for (let j = 0; j < tmp.length; j++) {
            const cond = tmp[j];
            const conditionValue = isConditionTrue ? false : sr(cp, cond.condition, hash, data);
            if (!conditionValue) {
              //bbn.fn.warning("SHIYLD");
              setInternalResult(cp, cond.condition.id, false, hash);
            }

            if (conditionValue) {
              isConditionTrue = true;
            }
          }
        }

        // Apply the condition to the current node.
        if (getInternalState(cp, node.condition.id, hash) !== 'OK') {
          await applyCondition(cp, getInternalValue(cp, node.condition.id, hash), node, hash, parent, data);
        }
      }
      // Process nodes without conditions.
      else {
        await treatNode(cp, node, hash, parent, data);
      }
    }
  }

  if (firstGo) {
    cp.$el.appendChild(parent);
  }

  return parent;
}
