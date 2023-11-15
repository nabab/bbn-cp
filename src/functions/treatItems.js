import bbn from "@bbn/bbn";

const treatCondition = (cp, node, arr, hash) => {
  let tmp = arr.filter(a => (a.conditionId === node.conditionId));
  if (!tmp.length || !node.conditionId) {
    bbn.fn.log("FINISHING HERE ",node.conditionId, node.condition);
    return;
  }
  let isCondTrue = false;
  // Checking the set of conditions (if any other) on the first condition
  bbn.fn.each(tmp, (cond, j) => {
    let go = false;
    // No need to check thge first as _isCondTrue has just been defined
    if (isCondTrue) {
      cp.$_setInternalResult(cond.condition.id, false, hash);
    }
    else {
      isCondTrue = sr(cond.condition, hash);
    }
    if (cp.$_getInternalState(cond.condition.id, hash) !== 'OK') {
      go = true;
      let condValue = cp.$_getInternalValue(cond.condition.id, hash);
      if (!condValue) {
        if (['template', 'transition', 'slot'].includes(cond.tag)) {
          if (cond.items) {
            bbn.fn.each(cond.items, it => {
              let e = $_this.$retrieveElement(it.id, hash);
              if (e && !bbn.fn.isComment(_e)) {
                cp.$removeDOM(e);
              }
            });
          }
        }
      }
    }
    else {
      let e = $_this.$retrieveElement(cond.id, hash);
      if (e && !bbn.fn.isComment(_e)) {
        const origin = bbn.cp.getComponent(e.bbnComponentId)?.bbn || cp;
        
        
      //x(`      bbn.fn.log("this is my moment", _e.tagName, $_this.$options.name);`);
      x(`      $_this.$removeDOM(_e);`);
      x(`      _e = false;`);
      x(`    }`);
      x(`    if (!_e) {`);
      x(`      $_items['${cond.id}'] = await $_this.$createElement({`);
      x(`        id: "${cond.id}",`);
      x(`        hash: "${cond.condition.hash}",`);
      x(`        loopHash: ${hashName},`);
      x(`        conditionId: "${cond.conditionId}",`);
      x(`        comment: true`);
      x(`      }, $_par.at(-1), $_num[$_par.at(-1).bbnId], $_this.$currentMap['${node.id}'].loop);`);
      x(`    }`);
      }
    }

  });
};

export default async function treatItems (cp, items, hash) {
  const sr = (attr, hash) => {
    return cp.$_setInternalResult(
      attr.id,
      attr.fn.bind(cp)(...attr.args.map(a => {
        let r;
        try {
          r = bbn.cp.treatArgument(a, cp, hash)
        }
        catch(e) {
          bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, cp, hash, attr])
          throw e;
        }
        return r;
      })),
      hash
    );
  };
  const isChanged = (id, hash) => {
    return cp.$_getInternalState(id, hash) !== 'OK';
  };
  const conditions = [];
  let conditionId = null;
  const res = DocumentFragment();
  for (let i = 0; i < items.length; i++) {
    const node = items[i];
    if (node.loop?.exp) {
      let loopValue = sr(node.loop, hash);
      const isNumber = bbn.fn.isNumber(loopValue);
      if (isNumber) {
        loopValue = Object.keys((new Array(loopValue)).fill(0)).map(a=>parseInt(a));
      }
      const isArray = bbn.fn.isArray(loopValue);
      let old = false;
      for (let j in loopValue) {
        if (isArray) {
          j = parseInt(j);
        }
        let key = j;
        if (node.attr?.key?.exp) {
          key = sr(node.attr.key, hash);
        }
        const hash = (hash || '') + node.loop.id + '-' + j + '-' + key;
        sr(node.loop.item, loopValue[j], hash);
        if (node.loop.index) {
          sr(node.loop.index, j, hash);
        }

        if (node.condition) {
          if (node.condition.type !== 'if') {
            throw new Error("The condition in a loop can only be of type 'if'");
          }

          let isConditionTrue = sr(node.condition, hash);
          
        }

        const ele = bbn.cp.treatElement(node, cp, hash, res, isChanged(node.loop.item, hash) || (node.loop.index && isChanged(node.loop.index, hash)));
        if (ele) {
          res.appendChild(ele);
        }
      }
    }
    else {

    }
  }

  return res;
}
