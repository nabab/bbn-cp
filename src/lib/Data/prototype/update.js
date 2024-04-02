import bbnData from "../Data.js";
import updateWatcher from "../../Cp/private/updateWatcher.js";
import bbn from "@bbn/bbn";

const recurse = (refs, exclude, res = []) => {
  bbn.fn.each(refs, rf => {
    if (rf.parent && (rf.parent !== exclude) && !res.includes(rf.parent)) {
      res.push(rf.parent);
      if (rf.parent.refs) {
        recurse(rf.parent.refs, rf.parent, res);
      }
    }
  });

  return res;
};

/**
 * Update all the components linked to the data object
 * @param {Boolean} deep 
 */
bbnData.prototype.update = function(noParent, key) {
  const impacted = this.getImpacted(key);
  const cpToUpdate = [];
  const dataToUpdate = [this];
  bbn.fn.each(impacted, it => {
    if (it.cp.$isInit) {
      let data = this;
      let bits = it.path.slice();
      let name = bits.join(".");
      let lev = 0;
      let isWatched = false;
      if (it.cp.$watcher?.[name]) {
        if (key || it.cp.$watcher[name].deep) {
          updateWatcher(it.cp, name, bbn.fn.getProperty(it.cp, name + '.' + key));
          isWatched = true;
        }
      }

      if (key) {
        bits.pop();
        name = bits.join(".");
        if (it.cp.$watcher?.[name]) {
          updateWatcher(it.cp, name, data.value);
          isWatched = true;
        }
      }

      if (!isWatched && !cpToUpdate.includes(it.cp)) {
        cpToUpdate.push(it.cp);
      }

      bits.pop();
      if (!noParent && bits.length) {
        dataToUpdate.push(...recurse(data.refs, this));
      }
    }
  });

  dataToUpdate.shift();
  dataToUpdate.forEach(d => d.update(true));
  cpToUpdate.forEach(cp => cp.$tick());
}
