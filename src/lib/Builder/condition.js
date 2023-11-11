import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.condition = async function(node, arr, hashName) {
  let tmp = arr.filter(a => (a.conditionId === node.conditionId));
  if (!tmp.length || !node.conditionId) {
    bbn.fn.log("FINISHING HERE ", node.conditionId, node.condition);
    return;
  }

  _isCondTrue = false;
  // Checking the set of conditions (if any other) on the first condition
  bbn.fn.each(tmp, async (cond, j) => {
    $_go[cond.id] = false;
    // No need to check thge first as _isCondTrue has just been defined
    if (j) {
      if (!_isCondTrue) {
        x.msp();
      }
      _isCondTrue = $_sr(cond.condition.hash, cond.condition.type === 'else' ? 'true' : cond.condition.exp, hashName);
      if (j) {
        x.lsp();
      }
      else {
        $_sr(cond.condition.hash, false, hashName);
      }
    }
    if ($_gs(cond.condition.hash, hashName) !== "OK") {
      $_go[cond.id] = true;
      let $_tmp1 = $_gv(cond.condition.hash, hashName);
      let _e;
      if (!$_tmp1) {
        if (['template', 'transition', 'slot'].includes(cond.tag)) {
          if (cond.items) {
            bbn.fn.each(cond.items, it => {
              _e = $_this.$retrieveElement(it.id, hashName);
              if (_e && !bbn.fn.isComment(_e)) {
                $_this.$removeDOM(_e);
              }
            });
          }
        }
        else {
          _e = $_this.$retrieveElement(cond.id, hashName);
          if (_e && !bbn.fn.isComment(_e)) {
            //      bbn.fn.log("REMOVING cond.id from node2fn")
            let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
            //      bbn.fn.log("this is my moment", _e.tagName, $_this.$options.name);
            $_this.$removeDOM(_e);
            _e = false;
          }
          if (!_e) {
            $_items[cond.id] = await this.cp.$createElement({
              id: cond.id,
              hash: cond.condition.hash,
              loopHash: hashName,
              conditionId: cond.conditionId,
              comment: true
            }, $_par.at(-1), $_num[$_par.at(-1).bbnId], $_this.$currentMap[node.id].loop);
          }
        }

      }
    }
  });
};
