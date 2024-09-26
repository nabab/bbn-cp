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
    Object.defineProperty(this, 'list', {
      value: [],
      writable: false,
      configurable: false
    });
  }

  async set(init) {
    const isComment = this.node.comment === true;
    if (!this.node.comment) {
      await this.node.setComment(true);
    }

    await this.update(init);
  }

  async update(init) {
    //bbn.fn.log("UPDATE ATTR LOOP " + this.exp, this.node.tag, this.isChanged, this.getValue(true));
    if (init || (this.exp && true)) {
      const node = this.node;
      if (node.isOut) {
        return;
      }
      const cp = node.component;
      const proms = [];

      // Evaluate the loop expression and determine its type.
      let loopValue = this.getValue();

      //bbn.fn.log(["LOOP VALUE", loopValue, this.value, this.node.component.$numBuild])
      const isNumber = bbn.fn.isNumber(loopValue);

      if (isNumber) {
        // Convert number to an array of that length if loopValue is a number.
        loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a => parseInt(a));
      }

      let root = cp.$retrieveElement(node.id, node.hash);
      if (!root) {
        root = await node.build();
      }

      const isArray = bbn.fn.isArray(loopValue);
      // Construct a unique hash for each iteration based on loop values.
      const oHash = node.hash.length > 4 ? bbn.fn.substr(node.hash, 0, -5) + '-' : '';

      //bbn.fn.log("LOOP VALUE", loopValue)
      const oldList = this.list.splice(0);
      const keys = Object.keys(cp.$elements);
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
          key = node.attr.key.exec(loopData).val;
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
        let ele = cp.$retrieveElement(node.id, hash);
        if (ele) {
          if (this.index && (ele.bbnSchema.data.__bbn_data[this.index] !== j)) {
            ele.bbnSchema.data.__bbn_data[this.index] = j;
          }
          if (oldList.indexOf(hash) !== num) {
            (prevEle || root).after(ele);
          }
        }
        else {
          const newNode = ele?.bbnSchema || generateNode(cloneNode(cp, node.id), cp, node.parent, hash, loopData);
          //bbn.fn.log("INSIDE LOOP", this.node.component.$options.name, prevEle, root)
          ele = await newNode.init(prevEle || root);
        }

        prevEle = ele;
        elements.push(ele);
        num++;
      }

      const loopHash = oHash ? bbn.fn.substr(oHash, 0, -1) : '';
      bbn.fn.iterate(cp.$elements[this.node.id], (a, n) => {
        if ((n !== 'root')
          && (bbn.fn.substr(n, -5) !== '-root')
          && !this.list.includes(n)
          && (n.indexOf(loopHash) === 0)
        ) {
          //bbn.fn.log(["CLEANIONG!", a, n, JSON.stringify(this.list)]);
          if (bbn.fn.isComment(a)) {
            let k = 0;
            const elems = Array.prototype.slice.call(a.parentNode.childNodes);
            while (elems.length) {
              const elem = elems.shift();
              if (!elem.bbnId) {
                k++;
                continue;
              }
              if (!elem.bbnId.indexOf(this.node.id + '-') 
                && cp.$elements[elem.bbnId][n]
                && !elem.bbnHash.indexOf(n)
              ) {
                bbn.fn.warning("DELETING")
                removeDOM(cp, elem);
              }
              k++;
            }
          }

          bbn.fn.warning("DELETING 0")
          removeDOM(cp, a);
        }
      });

      bbn.fn.iterate(cp.$elements, (ele, idx) => {
        if (!idx.indexOf(this.node.id + '-')) {
          bbn.fn.iterate(ele, (a, n) => {
            if ((n !== 'root')
              && (bbn.fn.substr(n, -5) !== '-root')
              && !this.list.includes(n)
              && (n.indexOf(loopHash) === 0)
            ) {
              delete a[n];
            }
          });
        }
      });

      bbn.fn.each(oldList, n => {
        if (!this.list.includes(n)) {
          bbn.fn.iterate(cp.$expResults, a => {
            if (a[n]) {
              delete a[n];
            }
          });
        }
      })

    }
  }

}
