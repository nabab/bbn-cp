import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import cloneNode from "../Cp/private/cloneNode.js";
import generateNode from "../Cp/private/generateNode.js";
import deleteNodes from "../Cp/private/deleteNodes.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnLoopAttr extends bbnAttr
{
  constructor(def, node, name) {
    super(def, node, name);
    this.node.setComment(true);
    Object.defineProperty(this, 'list', {
      value: [],
      writable: false,
      configurable: false
    });
  }

  attrSet(init) {
    this.attrUpdate(init);
  }

  init() {
    this.attrSet(true);
  }

  attrUpdate(init) {
    //bbn.fn.log("UPDATE ATTR LOOP " + this.exp, this.node.tag, this.isChanged, this.attrGetValue(true));
    const node = this.node;
    /*
    if (!init && !this.isChanged) {
      return;
    }*/

    if (node.isOut) {
      bbn.fn.log("NODE IS OUT");
      return;
    }
    const cp = node.component;

    // Evaluate the loop expression and determine its type.
    let loopValue = this.attrGetValue();

    //bbn.fn.log(["LOOP VALUE", loopValue, this.value, this.node.component.$numBuild])
    const isNumber = bbn.fn.isNumber(loopValue);

    if (isNumber) {
      // Convert number to an array of that length if loopValue is a number.
      loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a => parseInt(a));
    }

    let root = node.element;
    //bbn.fn.log(["IN LOOP " + node.id, root, node, node.hash, cp.$retrieveNode(node.id, node.hash), cp.$retrieveNode(node.id, node.hash)?.element]);
    if (!root) {
      root = node.nodeBuild();
    }

    const isArray = bbn.fn.isArray(loopValue);
    // Construct a unique hash for each iteration based on loop values.
    const oHash = node.hash.length > 4 ? bbn.fn.substr(node.hash, 0, -5) + '-' : '';

    //bbn.fn.log("LOOP VALUE", loopValue)
    const oldList = this.list.splice(0);
    const elements = [];

    let num = 0;
    let prevEle;

    bbn.cp.loopLevel++;
    for (let j in loopValue) {
      if (isArray) {
        j = parseInt(j);
      }
      
      const loopData = {[this.item]: loopValue[j]};
      if (this.index) {
        loopData[this.index] = j;
      }


      let key;
      if (node.attr?.key?.exp) {
        key = node.attr.key.attrExec(loopData).val;
      }
      else if (loopValue[j].__bbnData) {
        key = loopValue[j].__bbnData.uid;
      }
      else {
        key = bbnData.hash(loopData);
      }

      /*
      else {
        key = bbn.fn.randomString(10);
      }*/

      let hash = oHash + this.id + '-' + key;
      this.list.push(hash);
      let currentNode = cp.$retrieveNode(node.id, hash);
      let ele = currentNode?.element;
      if (ele) {
        if (this.index && (currentNode.data.__bbn_data[this.index] !== j)) {
          currentNode.data.__bbn_data[this.index] = j;
        }
        if (oldList.indexOf(hash) !== num) {
          (prevEle || root).after(ele);
        }
      }
      else {
        const newNode = currentNode || generateNode(cloneNode(cp, node.id), cp, node.parent, node, hash, hash, loopData);
        ele = newNode.nodeInit(prevEle || root);
      }

      prevEle = ele;
      elements.push(ele);
      num++;
    }

    bbn.cp.loopLevel--;
    const loopHash = oHash ? bbn.fn.substr(oHash, 0, -1) : '';

    for (let n in cp.$nodes[node.id]) {
      const a = cp.$nodes[node.id][n];
      if ((n !== 'root')
        && (bbn.fn.substr(n, -5) !== '-root')
        && !this.list.includes(n)
        && !n.indexOf(loopHash)
      ) {
        deleteNodes(cp, node.id, n, true); 
      }
    }
  }
}
