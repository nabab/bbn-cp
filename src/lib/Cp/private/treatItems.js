import treatItem from "./treatItem.js";
import bbn from "@bbn/bbn";
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
  if (isRoot) {
    firstGo = !cp.$numBuild
    parent = firstGo ? new DocumentFragment() : cp.$el;
  }

  bbn.fn.checkType(parent, [HTMLElement, DocumentFragment], "The items's parent must be an HTML Element");

  if (data) {
    bbn.fn.checkType(data, Object);
  }
  // Initialize data and parent if they are not provided.
  else {
    data = bbn.fn.createObject();
  }

  // Iterate over each item in the items array.
  for (let i = 0; i < items.length; i++) {
    await treatItem(cp, items[i], hash, parent, data, hashList);
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
