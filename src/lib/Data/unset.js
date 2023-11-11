import bbnData from "../Data.js";

/**
 * Deletes all references to the data object and its children
 */
bbnData.prototype.unset = function(noParent) {
  //bbn.fn.log("UNSET " + this.path + " ON " + this.root.$options.name, this);
  const id = this.id;

  // Unsetting the children
  bbn.fn.each(this.children, subObj => {
    subObj.unset(true);
  });
  const done = [];
  // Unsetting the data in each component, root is last
  bbn.fn.each(this.refs, it => {
    const cp = it.component;
    if (cp) {
      let idx = cp.$values.indexOf(id);
      if (idx > -1) {
        cp.$values.splice(idx, 1);
        done.push(cp.$cid);
      }
      else if (!done.includes(cp.$cid) && cp.$isInit) {
        bbn.fn.warning(bbn._("Impossible to find the data object in the values of the component %s with CID %s", cp.bbn.$options.name, cid));
        bbn.fn.log(this, cp, path);
        throw new Error(bbn._("Impossible to find the data object in the values of the component %s with CID %s", cp.bbn.$options.name, cid));
      }
      
      if (it.parent) {
        let idx = it.parent.children.indexOf(this);
        if (idx > -1) {
          it.parent.children.splice(idx, 1);
          it.parent.update();
        }
      }

      if (!cp.$isDestroyed) {
        cp.$tick();
      }
    }
    else {
      throw new Error(bbn._("Impossible to find the component %s", cid));
    }
  });

  /*

  if (!noParent && root.parent) {
    let dataObj = this;
    while (dataObj.parent) {
      dataObj = dataObj.parent;
      bbn.fn.iterate(Object.keys(dataObj.components), cid => {
        bbn.cp.getComponent(cid).bbn.$tick();
      });
      dataObj.root.$tick();
    }
  }
  */

  bbn.cp.dataInventory.delete(id);
  delete this.data.__bbnData;
};

  