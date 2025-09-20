import bbnAttr from "./Attr.js";
import cloneNode from "../Html/private/cloneNode.js";
import generateNode from "../Html/private/generateNode.js";
import bbnData from "../Data.js";
import setNodeRegion from "../../internals/setNodeRegion.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnLoopAttr extends bbnAttr
{
  #isRunning = false;

  get isRunning() {
    return this.#isRunning;
  }
  constructor(def, node, name) {
    super(def, node, name);
    this.node.nodeSwitch(true);
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

  attrUpdate(init, from) {
    if (this.isRunning) {
      return;
    }
    //bbn.fn.log("UPDATE ATTR LOOP " + this.exp, this.node.tag, this.isChanged, this.attrGetValue(true));
    const node = this.node;
    /*
    if (!init && !this.isChanged) {
      return;
    }*/

    if (node.isOut) {
      //bbn.fn.log("NODE IS OUT");
      return;
    }

    this.#isRunning = true;
    const cp = node.component;

    // Evaluate the loop expression and determine its type.
    let loopValue = this.attrGetValue();

    //bbn.fn.log(["LOOP VALUE", loopValue, this.value, this.node.component.$numBuild])
    const isNumber = bbn.fn.isNumber(loopValue);

    if (isNumber) {
      // Convert number to an array of that length (starting at 1) if loopValue is a number.
      loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a => parseInt(a) + 1);
    }

    let root = node.element;
    if (root && !root.parentNode) {
      let num = node.nodeClean();
      bbn.fn.log(["LOOP ROOT PROBLEM", num]);
      node.nodeRemove(root);
      root = null;
      //debugger;
    }

    const breakFn = node.attr['bbn-break'] ? node.component[node.attr['bbn-break'].exp] : false;
    //bbn.fn.log(["IN LOOP " + node.id, root, node, node.hash, cp.$retrieveNode(node.id, node.hash), cp.$retrieveNode(node.id, node.hash)?.element]);
    if (!root) {
      root = node.nodeBuild(null, true);
    }

    const isArray = bbn.fn.isArray(loopValue);
    // Construct a unique hash for each iteration based on loop values.
    const oHash = node.hash ? node.hash + '-' : '';
    const elements = [];
    const oldList = this.list.splice(0);
    let num = 0;
    bbn.cp.loopLevel++;
    const defIndex = this.index || '__bbnDataIdx' + bbn.cp.loopLevel.toString();

    for (let j in loopValue) {
      if (from && (j < from)) {
        continue;
      }

      if (isArray) {
        j = parseInt(j);
      }
      
      const loopData = {[this.item]: loopValue[j], [defIndex]: j};
      let key;
      if (node.attr?.key?.exp) {
        key = node.attr.key.attrExec(loopData).val;
      }
      else if (loopValue[j]?.__bbnData) {
        key = loopValue[j].__bbnData.uid;
      }
      else {
        key = bbn.cp.hash(loopData);
      }

      let hash = oHash + key;
      this.list.push(hash);
      let currentNode = cp.$retrieveNode(node.id, hash);
      let ele = currentNode?.element;
      if (ele && !ele.parentNode) {
        //bbn.fn.log(["ELEMENT NOT IN DOM", node.id, ele, hash]);
        //debugger;
        ele = false;
        currentNode.element = false;
      }

      if (currentNode && currentNode.data[defIndex] !== j) {
        currentNode.data[defIndex] = j;
      }

      if (ele) {
        if (currentNode.data[this.item] !== loopData[this.item]) {
          const data = currentNode.data[this.item]?.__bbnData;
          currentNode.data[this.item] = loopData[this.item];
        }
      }
      else {
        const newNode = currentNode || generateNode(cloneNode(cp, node.id), cp, node.parent, node, hash, hash, loopData);
        ele = newNode.nodeInit(root.bbnSchema._region.end);
        newNode.loopNode = this;
      }

      elements.push(ele);
      num++;
      if (breakFn && breakFn(ele, loopData, hash)) {
        this.lastBreak = j;
        break;
      }
    }

    if (oldList.length) {
      let copy = oldList.slice();
      bbn.fn.forir(oldList, (a, i) => {
        if (this.list.indexOf(a) === -1) {
          copy.splice(i, 1);
          const itemRemoved = cp.$retrieveNode(node.id, a);
          if (itemRemoved) {
            itemRemoved.nodeClean(true);
          }
        }
      });
      bbn.fn.fori(this.list, (a, i) => {
        if (oldList.indexOf(a) === -1) {
          copy.splice(i, 0, a);
        }
      });
      const testArray1 = copy.slice();
      const testArray2 = this.list.slice();
      if (JSON.stringify(testArray1) !== JSON.stringify(testArray2)) {
        testArray1.sort();
        testArray2.sort();
        if (JSON.stringify(testArray1) === JSON.stringify(testArray2)) {
          const moves = [];
          moves.push(...bbn.fn.getSortingMoves(copy, this.list));
          if (moves.length) {
            bbn.fn.log("MOVES", moves);
            moves.forEach(a => {
              const source = cp.$retrieveElement(node.id, a.value);
              let target = this.list[a.to+1];
              if (target) {
                const dest = cp.$retrieveElement(node.id, target);
                source.bbnSchema.nodeMove(dest.bbnSchema._region.start);
              }
              else {
                source.bbnSchema.nodeMove(root.bbnSchema._region.end);
              }
            });
          }
        }
        else {
          //what to do
          throw new Error(bbn._("Difficult to compare the arrays"));
        }
      }
    }


    bbn.cp.loopLevel--;
    const loopHash = oHash || '';
    const hashRoot = (node.hash ? node.hash + '-' + node.id : node.id) + '-loop';
    for (let n in cp.$nodes[node.id]) {
      const a = cp.$nodes[node.id][n];
      if ((n !== hashRoot)
        && !this.list.includes(n)
        && !n.indexOf(loopHash)
      ) {
        if (a.element?.bbnComponentSlot) {
          for (let n in a.element.bbnComponentSlot.$slots) {
            let idx = a.element.bbnComponentSlot.$slots[n].indexOf(a.element);
            if (idx > -1) {
              a.element.bbnComponentSlot.$slots[n].splice(idx, 1);
            }
          }
        }

        a.nodeClean(true);
      }
    }

    let prev = root;
    /*
    bbn.fn.each(elements, (e, i) => {
      let next = e.nextSibling;
      if ((e instanceof Comment) && !e.bbnSchema.isCommented) {
        while (next && !next.bbnId.indexOf(e.bbnId + '-') && !next.bbnHash.indexOf(e.bbnHash) && (next.parentNode === e.parentNode)) {
          let oldNext = next;
          next = next.nextSibling;
          if (oldNext.classList) {
            oldNext.classList.add('bbn-is-moving');
          }

          e.after(oldNext);
          if (oldNext.classList) {
            oldNext.classList.remove('bbn-is-moving');
          }
        }
      }
    })
      */
    this.#isRunning = false;
  }
}
