import bbnData from "../Data.js";
import bbn from "@bbn/bbn";
import propagateDependencyChanges from "../../Cp/private/propagateDependencyChanges.js";
import queueUpdate from "../../../functions/queueUpdate.js";

const getFn = function(watcher, lev, lastUpdate) {
  return async () => {
    if ((watcher.lastUpdate || 0) < lastUpdate) {
      watcher.watcherUpdate(false, lev);
    }
  };
};

/**
 * Update all the components linked to the data object
 * @param {Array} path
 */
bbnData.prototype.prepareUpdate = function(path) {
  if (!this.targetData) {
    //bbn.fn.log(["EEEEE", this]);
    return;
  }

  if (!this.refs.length) {
    bbn.fn.log(["UNSET " + (path || 'NO PATH') + ": " + JSON.stringify(this.targetData), this]);
    debugger;
    this.unset();
    return;
  }

  const propagation = [];
  const impacted = this.getImpacted(path, this.lastUpdate);
  let num = bbn.cp.numTicks;
  const deps = [];
  this.lastUpdate = num;
  let root = this.root;
  while (root.parent) {
    root.parent.lastUpdate = num;
    root = root.parent.refs[root.parent.refs.length-1];
  }
  if (path) {
    deps.push(...(this.deps[path] || []));
  }
  deps.push(...(this.deps.__bbnRoot || []));
  deps.forEach(a => {
    if (!(a instanceof bbnComputed) || !this.hasParent(a.component, a.name)) {
      queueUpdate({element: a, num})
    }
  });
  impacted.forEach(it => {
    const id = it.component.$cid + '/' + it.path[0];
    if (!propagation.includes(id)) {
      propagation.push(id);
      if ((it.level <= 1) && /*(it.path.length === 1) &&*/ it.component.$deps[it.path[0]]) {
        propagateDependencyChanges(it.component, it.path[0]);
      }
    }
  });

  impacted.forEach(it => {
    const bits = it.path.slice();
    let level = 0;
    while (bits.length) {
      if (it.component.$watcher[bits.join('.')]) {
        const watcher = it.component.$watcher[bits.join('.')];
        queueUpdate({
          component: it.component,
          fn: getFn(watcher, level, this.lastUpdate),
          num
        });
      }
      bits.pop();
      level++;
    }

  });
};
