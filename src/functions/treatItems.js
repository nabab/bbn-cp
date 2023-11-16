import bbn from "@bbn/bbn";
import sr from "../internals/sr.js";

export default async function treatItems (cp, items, hash) {
  const res = new DocumentFragment();

  const isChanged = (id, hash) => {
    return cp.$_getInternalState(id, hash) !== 'OK';
  };
  const applyCondition = async (conditionValue, node) => {
    if (conditionValue) {
      const ele = bbn.cp.treatElement(node, cp, hash, res, isChanged(node.loop.item, hash) || (node.loop.index && isChanged(node.loop.index, hash)));
      if (ele) {
        res.appendChild(ele);
      }
    }
    else {
      if (['template', 'transition', 'slot'].includes(node.tag)) {
        if (node.items) {
          bbn.fn.each(node.items, it => {
            const e = cp.$retrieveElement(it.id, hash);
            if (e && !bbn.fn.isComment(e)) {
              cp.$removeDOM(e);
            }
          });
        }
      }
      else {
        let ele = cp.$retrieveElement(node.id, hash);
        if (!bbn.fn.isComment(ele)) {
          if (ele) {
            cp.$removeDOM(ele);
          }

          ele = await cp.$createElement({
            id: cond.id,
            hash: cond.condition.hash,
            loopHash: hash,
            conditionId: cond.conditionId,
            comment: true
          }, res, data, cp.$currentMap[node.id]);
        }
      }
    }
  };

  const conditions = [];
  let conditionId = null;
  let isConditionTrue = true;
  let conditionValue = true;
  for (let i = 0; i < items.length; i++) {
    const node = items[i];
    if (node.loop?.exp) {
      let loopValue = sr(cp, node.loop, hash);
      const isNumber = bbn.fn.isNumber(loopValue);
      if (isNumber) {
        loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a=>parseInt(a));
      }
      const isArray = bbn.fn.isArray(loopValue);
      for (let j in loopValue) {
        if (isArray) {
          j = parseInt(j);
        }
        let key = j;
        if (node.attr?.key?.exp) {
          key = sr(cp, node.attr.key, hash);
        }
        const hash = (hash || '') + node.loop.id + '-' + j + '-' + key;
        sr(cp, node.loop.item, loopValue[j], hash);
        if (node.loop.index) {
          sr(cp, node.loop.index, j, hash);
        }

        if (node.condition) {
          if (node.condition.type !== 'if') {
            throw new Error("The condition in a loop can only be of type 'if'");
          }

          conditionValue = sr(node.condition, hash);
        }

        applyCondition(conditionValue, node);
      }
    }
    else {
      if (node.condition) {
        if (node.conditionId !== conditionId) {
          conditionId = node.conditionId;
          isConditionTrue = false;
          conditions = [];
          let tmp = items.filter(a => (a.conditionId === node.conditionId));
          // Checking the set of conditions (if any other) on the first condition
          for (let j = 0; j < tmp.length; j++) {
            const cond = tmp[j];
            let go = false;
            // No need to check thge first as isConditionTrue has just been defined
            const conditionValue = isConditionTrue ? false : sr(cond.condition, hash);
            if (!conditionValue) {
              cp.$_setInternalResult(cond.condition.id, false, hash);
            }
  
            if (conditionValue) {
              isConditionTrue = true;
            }
          }
        }

        if (cp.$_getInternalState(cond.condition.id, hash) !== 'OK') {
          applyCondition(cp.$_getInternalValue(cond.condition.id, hash), node);
        }
      }
      else {
        const ele = bbn.cp.treatElement(node, cp, hash, res, isChanged(node.id, hash));
        if (ele) {
          res.appendChild(ele);
        }
      }


    }
  }

  return res;
}
