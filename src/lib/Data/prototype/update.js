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
      let name = bits.join(".");
      let lev = 0;
      if (it.cp.$watcher?.[name]) {
        //bbn.fn.log(["WATCHER " + name, data, JSON.stringify({name: it.cp.$options.name, cid: it.cp.$cid, path: it.path.join('.'), num: it.cp.$numBuild})])
        if (bits.length > 1) {
          bits.shift();
          updateWatcher(it.cp, name, bbn.fn.getProperty(data.value, name));
        }
        else {
          updateWatcher(it.cp, name, data.value);
        }
      }
      else {
        if (cpToUpdate.indexOf(it.cp) === -1) {
          cpToUpdate.push(it.cp);
        }
      }

      if (noParent) {
        return false;
      }

      bits.pop();
      if (bits.length) {
        if (!key || lev) {
          bbn.fn.each(data.refs, rf => {
            if (rf.parent && (this.constructor.getObject(rf.component[rf.path]) === rf.parent)) {
              bbn.fn.log(["UPDATING PARENT", rf.parent])
              rf.parent.update()
            }
          })
        }
        name = bits.join('.');
      }
    }

  });
  cpToUpdate.forEach(cp => cp.$tick());
  //this.updateChildren();

}
