import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import cloneNode from "../Cp/private/cloneNode.js";
import generateNode from "../Cp/private/generateNode.js";
import removeDOM from "../Cp/private/removeDOM.js";

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

  async attrSet(init) {
    await this.attrUpdate(init);
  }

  async init() {
    await this.attrSet(true);
  }

  async attrUpdate(init) {
    if (init || (this.exp && this.isChanged)) {
      //bbn.fn.log("UPDATE ATTR LOOP " + this.exp, this.node.tag, this.isChanged, this.attrGetValue(true));
      const node = this.node;
      if (node.isOut) {
        bbn.fn.log("NODE IS OUT");
        return;
      }
      const cp = node.component;
      const proms = [];

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
        root = await node.nodeBuild();
      }

      const isArray = bbn.fn.isArray(loopValue);
      // Construct a unique hash for each iteration based on loop values.
      const oHash = node.hash.length > 4 ? bbn.fn.substr(node.hash, 0, -5) + '-' : '';

      //bbn.fn.log("LOOP VALUE", loopValue)
      const oldList = this.list.splice(0);
      const elements = [];

      let num = 0;
      let prevEle;
      for (let j in loopValue) {
        if (isArray) {
          j = parseInt(j);
        }
        
        const loopData = {[this.item]: loopValue[j]};
        if (this.index) {
          loopData[this.index] = j;
        }


        let key = j;
        if (node.attr?.key?.exp) {
          key = node.attr.key.attrExec(loopData).val;
        }
        else if (node.attr?.key?.value !== undefined) {
          key = loopValue[j][node.attr.key.value];
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
          const newNode = currentNode || generateNode(cloneNode(cp, node.id), cp, node.parent, hash, loopData);

          //bbn.fn.log("INSIDE LOOP", this.node.component.$options.name, prevEle, root)
          ele = await newNode.nodeInit(prevEle || root);
        }

        prevEle = ele;
        elements.push(ele);
        num++;
      }

      const loopHash = oHash ? bbn.fn.substr(oHash, 0, -1) : '';
      for (let n in cp.$nodes[this.node.id]) {
        const a = cp.$nodes[this.node.id][n];
        if ((n !== 'root')
          && (bbn.fn.substr(n, -5) !== '-root')
          && !this.list.includes(n)
          && (n.indexOf(loopHash) === 0)
        ) {
          //bbn.fn.log(["CLEANIONG!", a, n, JSON.stringify(this.list)]);
          if (bbn.fn.isComment(a.element)) {
            let k = 0;
            const elems = a.element?.parentNode ? Array.prototype.slice.call(a.element.parentNode.childNodes) : [];
            while (elems.length) {
              const elem = elems.shift();
              if (!elem.bbnId) {
                k++;
                continue;
              }
              if (!elem.bbnId.indexOf(this.node.id + '-') 
                && cp.$nodes[elem.bbnId][n]?.element
                && !elem.bbnHash.indexOf(n)
              ) {
                //bbn.fn.warning("DELETING")
                removeDOM(cp, elem);
                delete cp.$nodes[elem.bbnId][n];
              }
              k++;
            }
          }

          //bbn.fn.warning("DELETING 0")
          removeDOM(cp, a.element);
          //delete cp.$nodes[a.id][n];
        }
      }

      for (let idx in cp.$nodes) {
        if ((idx === this.node.id) || !idx.indexOf(this.node.id + '-')) {
          const obj = cp.$nodes[idx];
          for (let n in obj) {
            bbn.fn.each(oldList, l => {
              if (((n === l) || !n.indexOf(l + '-')) && !this.list.includes(l)) {
                delete obj[n];
              }
            });
          }
        }
      }
    }
  }

}
