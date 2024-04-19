import setExpResult from "./setExpResult.js";
import cloneNode from "./cloneNode.js";
import bbn from "@bbn/bbn";
import treatCondition from "./treatCondition.js";
import getExpState from "./getExpState.js";
import removeDOM from "./removeDOM.js";
import buildElement from "./buildElement.js";

/**
 * Processes loop directives in a component's template, iterating over data and applying conditions.
 * 
 * @param {bbnCp} cp - The component instance.
 * @param {Object} node - The template node containing the loop directive.
 * @param {string} hash - A unique hash for the current scope of the component.
 * @param {HTMLElement} parent - The parent HTML element where the loop is being applied.
 * @param {Object} data - The current data scope for the component.
 * @param {Array} hashList - An array of elements done through an upper loop
 */
export default async function treatLoop(
  cp,
  node,
  hash,
  parent,
  data,
  hashList
) {
  if (node?.loop) {
    bbn.fn.checkType(cp, bbnCp);
    bbn.fn.checkType(node, Object);
    bbn.fn.checkType(hash, String);
    bbn.fn.checkType(parent, [DocumentFragment, HTMLElement], "The parent must be an HTML Element");
    bbn.fn.checkType(hashList, Array);
    if (data) {
      bbn.fn.checkType(data, Object);
    }

    // Evaluate the loop expression and determine its type.
    let loopValue = node.loop.exp ? setExpResult(cp, node.loop, hash, data) : node.loop.value;
    let conditionValue = true;
    const isNumber = bbn.fn.isNumber(loopValue);
    if (isNumber) {
      // Convert number to an array of that length if loopValue is a number.
      loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a => parseInt(a));
    }

    let loopEle = cp.$retrieveElement(node.id, hash);
    if (!loopEle) {
      const loopNode = cloneNode(cp, node.id);
      loopNode.loopHash = hash;
      loopNode.comment = true;
      loopEle = await buildElement(cp, loopNode, parent);
      Object.defineProperty(loopEle, 'bbnLoopList', {
        value: [],
        writable: false,
        configurable: false
      });
    }
    else {
      loopEle.bbnLoopList.splice(0, loopEle.bbnLoopList.length);
    }

    const hashList2 = loopEle.bbnLoopList;
    const isArray = bbn.fn.isArray(loopValue);
    // Construct a unique hash for each iteration based on loop values.
    const oHash = hash ? hash + '-' : '';


    for (let j in loopValue) {
      if (isArray) {
        j = parseInt(j);
      }
      
      const loopData = bbn.fn.createObject({}, data, {[node.loop.item]: loopValue[j]});
      if (node.loop.index) {
        loopData[node.loop.index] = j;
      }

      let key = node.attr?.key?.exp ? bbn.fn.getProperty(loopValue[j], node.attr.key.exp) || j : j;
      hash = oHash + node.loop.hash + '-' + key;

      const ele = cp.$retrieveElement(node.id, hash);
      const newNode = ele?.bbnSchema || cloneNode(cp, node.id);
      newNode.loopHash = hash;

      // Set loop item and index in the data.
      setExpResult(cp, newNode.loopItem, hash, loopData);
      if (Object.hasOwn(newNode, 'loopIndex')) {
        setExpResult(cp, newNode.loopIndex, hash, loopData);
      }

      // Evaluate the condition for the current loop iteration.
      if (newNode.condition) {
        if (newNode.condition.type !== 'if') {
          throw Error("The condition in a loop can only be of type 'if'");
        }
        conditionValue = setExpResult(cp, newNode.condition, hash, loopData);
      } else {
        conditionValue = true;
      }

      //if (conditionValue) {
        hashList.push(newNode.id + '_' + hash);
        hashList2.push(newNode.id + '_' + hash);
      //}
      // Apply the condition to the current node.
      await treatCondition(cp, conditionValue, newNode, hash, parent, loopData, hashList);
    }

  }
};
