import bbnAttr from "./Attr.js";
import cloneNode from "../Html/private/cloneNode.js";
import generateNode from "../Html/private/generateNode.js";
import bbnData from "../Data.js";
import setNodeRegion from "../../internals/setNodeRegion.js";
import data from "../../mixins/data.js";

// LIS indices on `pos` (strictly increasing)
const lisIndices = arr => {
  const n = arr.length, tails = [], prev = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    let x = arr[i], lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[tails[mid]] < x) lo = mid + 1; else hi = mid;
    }
    if (lo > 0) prev[i] = tails[lo - 1];
    tails[lo] = i;
  }
  const res = [];
  for (let k = tails.length ? tails[tails.length - 1] : -1; k !== -1; k = prev[k]) res.push(k);
  return res.reverse();
};

const getSortingMovesAnchored = function(src, dst) {
  if (src.length !== dst.length) throw new Error("Lengths must match.");
  const setDst = new Set(dst);
  if (setDst.size !== dst.length) throw new Error("dst has duplicates.");
  const setSrc = new Set(src);
  if (setSrc.size !== src.length) throw new Error("src has duplicates.");
  if (src.length !== setDst.size || Array.from(setSrc).some(v => !setDst.has(v))) {
    throw new Error("Arrays must contain the same unique values.");
  }

  const posInDst = new Map(dst.map((v, i) => [v, i]));
  const pos = src.map(v => posInDst.get(v));
  const lisIdx = lisIndices(pos);
  const keepSet = new Set(lisIdx.map(i => src[i])); // values we won't move

  // For each dst index, what's the next kept value to the right?
  const nextKeptAfterIdx = Array(dst.length).fill(-1);
  for (let i = dst.length - 2; i >= 0; i--) {
    nextKeptAfterIdx[i] = nextKeptAfterIdx[i + 1];
    if (keepSet.has(dst[i + 1])) nextKeptAfterIdx[i] = i + 1;
  }

  // Simulate to decide the correct order of operations, but emit anchors.
  const work = src.slice();
  const indexOf = new Map(work.map((v, i) => [v, i]));
  const plan = [];

  for (let i = 0; i < dst.length; i++) {
    const v = dst[i];
    if (keepSet.has(v)) continue;

    const from = indexOf.get(v);
    const j = nextKeptAfterIdx[i];
    const beforeValue = (j !== -1) ? dst[j] : null; // anchor by VALUE

    // Compute actual 'to' only to keep the simulation coherent
    const to = (j !== -1) ? indexOf.get(beforeValue) : work.length;
    const adjustedTo = from < to ? to - 1 : to;

    if (from !== adjustedTo) {
      const [moved] = work.splice(from, 1);
      work.splice(adjustedTo, 0, moved);

      plan.push({ value: v, before: beforeValue });

      // refresh indices
      indexOf.clear();
      for (let p = 0; p < work.length; p++) indexOf.set(work[p], p);
    }
  }

  return plan;
}

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

  reset() {
    this.node.nodeClean(true);
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
    const isArray = bbn.fn.isArray(loopValue);
    const numItems = isArray ? loopValue.length : Object.keys(loopValue).length;
    // Construct a unique hash for each iteration based on loop values.
    const oHash = node.hash ? node.hash + '-' : '';
    const elements = [];
    const lst = [];
    const oldList = this.list.splice(0);
    if (!root) {
      root = node.nodeBuild(null, true);
    }
    else if (!numItems && oldList.length) {
      if (this.exp === 'items') {
        debugger;
      }
      bbn.fn.log("CLEANING " + node.realTag + ' ' + node.id + ' IN ' + cp.$options.name + ' - ' + this.exp);
      const indexes = Object.keys(cp.$nodes).filter(idx => !idx.indexOf(node.id + '-'));
      const nodes = cp.$nodes;
      while (indexes.length) {
        const idx = indexes.shift();
        const obj = nodes[idx];
        const hash = node.hash;
        if (hash) {
          for (let n in obj) {
            if ((n === hash) || !n.indexOf(hash + '-')) {
              obj[n].off = true;
              delete obj[n];
            }
          }
        }
        else if (obj instanceof bbnNode) {
          nodes[idx].off = true;
          delete nodes[idx];
        }
        else {
          for (let n in obj) {
            obj[n].off = true;
            delete obj[n];
          }
        }
      }

      const r = document.createRange();
      r.setStartAfter(node._region.start);
      r.setEndBefore(node._region.end);
      r.deleteContents();
      root = node.nodeBuild(null, true);
      oldList.splice(0);
    }

    let num = 0;
    let prevElement = null;
    bbn.cp.loopLevel++;
    const defIndex = this.index || '__bbnDataIdx' + bbn.cp.loopLevel.toString();

    for (let j in loopValue) {
      if (isArray) {
        j = parseInt(j);
        if (from && (j < from)) {
          continue;
        }
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

      if (key === undefined) {
        debugger;
      }
      const hash = oHash + key;
      this.list.push(hash);
      const currentNode = cp.$retrieveNode(node.id, hash);
      let ele = currentNode?.element;
      if (ele && !ele.isConnected) {
        //bbn.fn.log(["ELEMENT NOT IN DOM", node.id, ele, hash]);
        //debugger;
        ele = false;
        currentNode.element = false;
      }

      if (currentNode) {
        if (currentNode.data[defIndex] !== j) {
          currentNode.data[defIndex] = j;
          if (prevElement) {
            currentNode.nodeMove(prevElement.bbnSchema._region.end, true);
            bbn.fn.move(oldList, oldList.indexOf(currentNode.hash), j in oldList ? j : oldList.length -1);
          }
          else {
            currentNode.nodeMove(root, true);
            bbn.fn.move(oldList, oldList.indexOf(currentNode.hash), 0);
          }
        }

        if (currentNode.data[this.item] !== loopData[this.item]) {
          currentNode.data[this.item] = loopData[this.item];
        }
      }

      if (!ele) {
        const newNode = currentNode || generateNode(cloneNode(cp, node.id), cp, node.parent, node, hash, hash, loopData);
        if (prevElement) {
          if (oldList.includes(prevElement.bbnHash)) {
            oldList.splice(oldList.indexOf(prevElement.bbnHash) + 1, 0, hash);
          }
          else {
            oldList.splice(j, 0, hash);
          }
        }
        else {
          oldList.unshift(hash);
        }

        ele = newNode.nodeInit(prevElement ? prevElement.bbnSchema._region.end : root);
        newNode.loopNode = this;
      }

      elements.push(ele);
      num++;
      if (breakFn && breakFn(ele, loopData, hash)) {
        this.lastBreak = j;
        break;
      }

      prevElement = ele;
    }


    if (oldList.length) {
      let copy = oldList.slice();
      bbn.fn.forir(oldList, (a, i) => {
        if (!a) {
          debugger;
        }
        if (this.list.indexOf(a) === -1) {
          copy.splice(i, 1);
          const itemRemoved = cp.$retrieveNode(node.id, a);
          if (itemRemoved) {
            itemRemoved.nodeClean(true);
          }
        }
      });
    }
    /*
      bbn.fn.each(this.list, a => {
        if (oldList.indexOf(a) === -1) {
          copy.push(a);
          bbn.fn.log("ADDING");
        }
      });

      if (JSON.stringify(copy) !== JSON.stringify(this.list)) {
        const moves = [...getSortingMovesAnchored(copy, this.list)];
        if (moves.length) {
          const nodeByValue = new Map(this.list.map(v => [v, cp.$retrieveElement(node.id, v)]));
          bbn.fn.log('********', moves.length, JSON.stringify(oldList, null, 2), JSON.stringify(copy, null, 2), JSON.stringify(this.list, null,2), JSON.stringify(moves, null, 2), '----------');
          moves.forEach(step => {
            const source = nodeByValue.get(step.value);
            const target = step.before ? nodeByValue.get(step.before) : null;
            if (target) {
              source.bbnSchema.nodeMove(target.bbnSchema._region.start);
            }
            else {
              source.bbnSchema.nodeMove(root.bbnSchema._region.end);
            }
          });
          //bbn.fn.log(JSON.stringify(copy), '-------------');
        }
        else {
          //what to do
          throw new Error(bbn._("Difficult to compare the arrays"));
        }
      }
    }
      */


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
