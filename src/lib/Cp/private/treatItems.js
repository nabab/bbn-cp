import treatNode from "./treatNode.js";
import setExpResult from "./setExpResult.js";
import setConditionResult from "./setConditionResult.js";
import treatCondition from "./treatCondition.js";
import cloneNode from "./cloneNode.js";
import bbn from "@bbn/bbn";
import treatLoop from "./treatLoop.js";
import removeDOM from "./removeDOM.js";

/**
 * Processes a collection of items representing a virtual DOM structure and creates
 * HTML elements based on defined conditions and loops.
 * 
 * @param {bbnCp} cp - The context provider, containing methods and properties for element manipulation.
 * @param {Array} items - An array of item objects, each representing a virtual DOM node.
 * @param {string} hash - A unique identifier used in conjunction with cp.
 * @param {HTMLElement} parent - The parent element to which new elements will be appended.
 * @param {Object} data - Additional data that might be required for processing the elements.
 * @param {Array} hashList - An array of elements done through an upper loop
 * 
 * @returns {HTMLElement} The parent element with all the processed child elements appended.
 */
export default async function treatItems(
  cp,
  items,
  hash,
  parent,
  data,
  hashList = null
) {
  bbn.fn.checkType(cp, bbnCp);
  bbn.fn.checkType(items, Array);
  bbn.fn.checkType(hash, String);
  let hasAlreadyHashes = hashList !== null;
  if (hashList === null) {
    hashList = [];
  }

  bbn.fn.checkType(hashList, Array);

  let firstGo = false;
  let isRoot = !parent || (parent === cp.$el);
  if (!isRoot) {
    bbn.fn.checkType(parent, [HTMLElement, DocumentFragment], "The items's parent must be an HTML Element");
  }
  else {
    firstGo = !cp.$numBuild
    parent = firstGo ? new DocumentFragment() : cp.$el;
  }

  if (data) {
    bbn.fn.checkType(data, Object);
  }
  // Initialize data and parent if they are not provided.
  else {
    data = bbn.fn.createObject();
  }


  // Variables for handling conditions and loops.
  let conditionId = null;
  let isConditionTrue = true;

  // Iterate over each item in the items array.
  for (let i = 0; i < items.length; i++) {
    // Handle loop structures within the node.
    if (items[i].loop) {
      await treatLoop(cp, items[i], hash, parent, data, hashList);
    }
    // Handle non-loop nodes.
    else {
      const ele = cp.$retrieveElement(items[i].id, hash);
      const node = ele ? ele.bbnSchema : cloneNode(cp, items[i].id);
      node.loopHash = hash;
      hashList.push(node.id + (hash ? '_' + hash : ''));
      if (node.condition) {
        // Processing all nodes with the same conditionId
        if (node.conditionId !== conditionId) {
          conditionId = node.conditionId;
          isConditionTrue = false;
          let tmp = items.filter(a => (a.conditionId === node.conditionId));
          if (!tmp.length || !node.conditionId) {
            bbn.fn.log("FINISHING HERE ", node.conditionId, node.condition);
            return;
          }
        
          // Evaluate conditions for the current node.
          for (let j = 0; j < tmp.length; j++) {
            const ele = cp.$retrieveElement(tmp[j].id, hash);
            const node = ele ? ele.bbnSchema : cloneNode(cp, tmp[j].id);
            node.loopHash = hash;
            const conditionValue = isConditionTrue ? false : (node.condition.type === 'else' ? true : setExpResult(cp, node.condition, hash, data));
            if (conditionValue) {
              isConditionTrue = true;
              setConditionResult(cp, node.condition, true, hash, data);
            }
            else {
              //bbn.fn.warning("SHIYLD");
              setConditionResult(cp, node.condition, false, hash, data);
            }
            // Apply the condition to the current node.
            await treatCondition(cp, conditionValue, node, hash, parent, data, hashList);
          }
        }
      }
      else {
        // Process nodes without conditions.
        await treatNode(cp, node, hash, parent, data, true, hashList);
      }
    }
  }

  if (firstGo) {
    cp.$el.appendChild(parent);
  }
  else if (!hasAlreadyHashes) {
    bbn.fn.each(parent.childNodes, ele => {
      if (ele.bbnId
        && ele.tagName
        && !ele.bbnId.indexOf((isRoot ? '0' : parent.bbnId) + '-')
        && (ele.bbnComponentId === cp.$cid)
        && !hashList.includes(ele.bbnId + (ele.bbnHash ? '_' + ele.bbnHash : ''))
      ) {
        bbn.fn.log(["DELETING", ele, ele.bbnId, ele.bbnHash, JSON.stringify(hashList)]);
        removeDOM(cp, ele);
      }
    });
  }

  return parent;
}
