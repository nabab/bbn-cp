import bbnData from "../Data.js";
import updateWatcher from "../../Cp/private/updateWatcher.js";
import bbn from "@bbn/bbn";

/**
 * Update all the components linked to the data object
 * @param {Boolean} deep 
 */
bbnData.prototype.update = function(noParent, key) {
  /*
  if (this.isArray) {
    bbn.fn.each(this.value, (v, i) => {
      const objData = this.constructor.getObject(v);
      if (objData && (i != objData.path)) {
        objData.path = i.toString();
      }
    });
  }
  /*
  if (data.root) {
    bbn.fn.log(["UPDATEBBNDATA", data.root, data]);
  }
  */
  const impacted = this.getImpacted(key);
  const cpToUpdate = [];
  //bbn.fn.log("IMPACTED", impacted.map((a => { return {name: a.cp.$options.name, cid: a.cp.$cid, path: a.path.join('.')} })));
  bbn.fn.each(impacted, it => {
    if (it.cp.$isInit) {
      let data = this;
      let bits = it.path.slice();
      let lev = 0;
      while (bits.length) {
        let name = bits.join(".");
        if (it.cp.$watcher?.[name]) {
          if (!lev || it.cp.$watcher[name].deep) {
            updateWatcher(it.cp, name, bbn.fn.getProperty(data.value, name));
          }
        }

        lev++;
        bits.pop();
      }

      if (cpToUpdate.indexOf(it.cp) === -1) {
        cpToUpdate.push(it.cp);
      }
    }
  });
  cpToUpdate.forEach(cp => cp.$tick());
  //this.updateChildren();

}
