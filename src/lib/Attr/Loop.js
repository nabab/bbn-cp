import bbnAttr from "./Attr.js";
import cloneNode from "../Html/private/cloneNode.js";
import generateNode from "../Html/private/generateNode.js";
import bbnNode from "../Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnLoopAttr extends bbnAttr
{
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
    if (root && !root.parentNode) {
      //node.parentElement.appendChild(root);
      debugger;
    }

    const breakFn = node.attr['bbn-break'] ? node.component[node.attr['bbn-break'].exp] : false;
    //bbn.fn.log(["IN LOOP " + node.id, root, node, node.hash, cp.$retrieveNode(node.id, node.hash), cp.$retrieveNode(node.id, node.hash)?.element]);
    if (!root) {
      root = node.nodeBuild(null, true);
    }

    const isArray = bbn.fn.isArray(loopValue);
    // Construct a unique hash for each iteration based on loop values.
    const oHash = node.hash.length > 4 ? bbn.fn.substr(node.hash, 0, -5) + '-' : '';
    const elements = [];
    this.list.splice(0);
    let num = 0;
    let prevEle;
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
        key = bbnData.hash(loopData);
      }

      let hash = oHash + this.id + '-' + key;
      this.list.push(hash);
      let currentNode = cp.$retrieveNode(node.id, hash);
      let ele = currentNode?.element;
      if (ele && !ele.parentNode) {
        debugger;
        ele = false;
        currentNode.element = false;
      }

      if (ele) {
        if (currentNode.data[defIndex] !== j) {
          currentNode.data[defIndex] = j;
        }
      }
      else {
        const newNode = currentNode || generateNode(cloneNode(cp, node.id), cp, node.parent, node, hash, hash, loopData);
        ele = newNode.nodeInit(prevEle || root);
      }

      elements.push(ele);
      num++;
      if (breakFn && breakFn(ele, loopData, hash)) {
        this.lastBreak = j;
        break;
      }

      prevEle = ele;
    }

    bbn.cp.loopLevel--;
    const loopHash = oHash || '';
    const hashRoot = this.hash ? this.hash + '-root' : 'root';
    for (let n in cp.$nodes[node.id]) {
      const a = cp.$nodes[node.id][n];
      if ((n !== hashRoot)
        && !this.list.includes(n)
        && !n.indexOf(loopHash)
      ) {
        a.nodeClean(true);
      }
    }

    bbn.fn.each(elements, (e, i) => {
      let next = e.nextSibling;
      /*
      if (!i) {
        if (e.previousSibling !== root) {
          root.after(e);
        }
      }
      else if (e.previousSibling !== elements[i - 1]) {
        if (!e.previousSibling || e.previousSibling.bbnId.indexOf(elements[i - 1].bbnId + '-')) {
          elements[i - 1].after(e);
        }
      }*/
      if ((e instanceof Comment) && !e.bbnSchema.isCommented) {
        while (next && !next.bbnId.indexOf(e.bbnId + '-') && !next.bbnHash.indexOf(e.bbnHash)) {
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
  }
}
