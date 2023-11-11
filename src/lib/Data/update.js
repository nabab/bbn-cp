import bbnData from "../Data.js";

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
  */
  /*
  if (data.root) {
    bbn.fn.log(["UPDATEBBNDATA", data.root, data]);
  }
  */
  const impacted = this.getImpacted(key);
  bbn.fn.each(impacted, it => {
    if (it.cp.$isInit) {
      let data = this;
      let bits = it.path.slice();
      let name = bits.join(".");
      let lev = 0;
      if (it.cp.$watcher?.[name]) {
        if (bits.length > 1) {
          bits.shift();
          //bbn.fn.log("WATCHER " + name, data.value, bits.join("."), '----')
          it.cp.$updateWatcher(name, bbn.fn.getProperty(data.value, ...bits));
        }
        else {
          //bbn.fn.log("WATCHER " + name, data.value, '----')
          it.cp.$updateWatcher(name, data.value);
        }
      }
      bits.pop();
      if (bits.length) {
        if (!key || lev) {
          bbn.fn.each(data.refs, rf => {
            if (rf.parent) {
              rf.parent.update()
            }
          })
        }
        name = bits.join('.');
      }
      it.cp.$tick()

      if (noParent) {
        return;
      }
    }

  });
  //          this.updateChildren();

}
