import bbnBuilder from "../Builder.js";
import removeDOM from "../../Cp/private/removeDOM.js";
import buildElement from "../../Cp/private/buildElement.js";

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
      _isCondTrue = setExpResult($_this, cond.condition.hash, cond.condition.type === 'else' ? 'true' : cond.condition.exp, hashName);
      if (j) {
        x.lsp();
      }
      else {
        setExpResult($_this, cond.condition.hash, false, hashName);
      }
    }
    if (getExpState($_this, cond.condition.hash, hashName) !== "OK") {
      $_go[cond.id] = true;
      let $_tmp1 = getExpValue($_this, cond.condition.hash, hashName);
      let _e;
      if (!$_tmp1) {
        if (['template', 'transition', 'slot'].includes(cond.tag)) {
          if (cond.items) {
            bbn.fn.each(cond.items, it => {
              _e = $_this.$retrieveElement(it.id, hashName);
              if (_e && !bbn.fn.isComment(_e)) {
                removeDOM($_this, _e);
              }
            });
          }
        }
        else {
          _e = $_this.$retrieveElement(cond.id, hashName);
          let schema;
          if (_e && !bbn.fn.isComment(_e)) {
            if (_e.bbnSchema) {
              schema = _e.bbnSchema;
            }
            //      bbn.fn.log("REMOVING cond.id from node2fn")
            let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
            //      bbn.fn.log("this is my moment", _e.tagName, $_this.$options.name);
            removeDOM($_this, _e);
            _e = false;
          }

          if (!_e) {
            schema = bbn.fn.clone(cond);
            schema.comment = true;
            schema.loopHash = hashName;
            $_items[cond.id] = await createElement(this.cp, schema, $_par.at(-1), $_num[$_par.at(-1).bbnId], $_this.$currentMap[node.id].loop);
          }
        }

      }
    }
  });
};
