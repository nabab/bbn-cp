import bbnData from "../Data.js";
import bbn from "@bbn/bbn";
import propagateDependencyChanges from "../../Cp/private/propagateDependencyChanges.js";
import queueUpdate from "../../../functions/queueUpdate.js";

const getFn = function(watcher, lev, lastUpdate) {
  return async () => {
    if ((watcher.lastUpdate || 0) < lastUpdate) {
      watcher.update(false, lev);
    }
  };
};

/**
 * Update all the components linked to the data object
 * @param {Array} path
 */
bbnData.prototype.prepareUpdate = function(path) {
  const propagation = [];
  this.lastUpdate = bbn.cp.numTicks;
  const impacted = this.getImpacted(path, this.lastUpdate);
  const num = ++bbn.cp.numTicks;
  bbn.fn.each(impacted, it => {
    const id = it.component.$cid + '/' + it.path[0];
    if (!propagation.includes(id)) {
      propagation.push(id);
      if (it.component.$deps[it.path[0]]) {
        propagateDependencyChanges(it.component, it.path[0]);
      }
    }

    const bits = it.path.slice();
    let level = 0;
    while (bits.length) {
      if (it.component.$watcher[bits.join('.')]) {
        //bbn.fn.log("WATCHER FOUND ON " + bits.join('.') + " IN " + it.component.$options.name);
        queueUpdate({
          component: it.component,
          fn: getFn(it.component.$watcher[bits.join('.')], level, this.lastUpdate),
          num
        });
      }

      bits.pop();
      level++;
    }

  });

  this.deps.forEach(a => queueUpdate({element: a, num}));
};
