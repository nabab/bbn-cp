import bbnData from "../Data.js";
import queueUpdate from "../../../functions/queueUpdate.js";

const getFn = function(watcher, lev, lastUpdate) {
  return () => {
    watcher.watcherUpdate(false, lev);
  };
};

/**
 * Update all the components linked to the data object
 * @param {Array} path
 */
bbnData.prototype.dataUpdate = function(path) {
  if (!this.value || this.root.component?.$isDestroying || this.root.component?.$isDestroyed) {
    //bbn.fn.log(["EEEEE", this]);
    return;
  }

  if (!this.refs.length) {
    //bbn.fn.log(["UNSET " + (path || 'NO PATH') + ": " + JSON.stringify(this.targetData), this]);
    this.unset();
    return;
  }

  const propagation = [];
  const toPropagate = [];
  const impacted = this.dataImpacted(path, this.lastUpdate);
  let num = bbn.cp.numTicks;
  const deps = [];
  this.lastUpdate = num;
  let root = this.root;
  while (root?.parent) {
    root.parent.lastSubUpdate = num;
    root = root.parent.refs[root.parent.refs.length-1];
  }


  if (path) {
    deps.push(...(this.deps[path] || []));
  }
  deps.push(...(this.deps.__bbnRoot || []));
  const todo = [];
  deps.forEach(a => {
    if ((a.constructor.name !== 'bbnComputed') || !this.hasParent(a.component, a.name)) {
      todo.push({component: a.component || a?.node?.component, element: a, num})
    }
  });
  impacted.forEach(it => {
    const id = it.component.$cid + '/' + it.path[0];
    if (!propagation.includes(id)) {
      propagation.push(id);
      if ((it.level <= 1) && /*(it.path.length === 1) &&*/ it.component.$deps[it.path[0]]) {
        toPropagate.push({cp: it.component, name: it.path[0]});
      }
    }
  });
  bbnData.propagate(toPropagate);

  impacted.forEach(it => {
    const bits = it.path.slice();
    let level = 0;
    while (bits.length) {
      if (it.component.$watcher[bits.join('.')]) {
        const watcher = it.component.$watcher[bits.join('.')];
        todo.push({
          component: it.component,
          element: watcher,
          level,
          num: this.lastUpdate
        });
      }
      bits.pop();
      level++;
    }

  });

  queueUpdate(...todo);
};
