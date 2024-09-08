import bbnData from "../Data.js";

/**
 * Deletes all references to the data object and its children
 */
const err = "Impossible to find the data object in the values of the component %s with CID %s";
bbnData.prototype.unset = function(noParent) {
  //bbn.fn.log("UNSET: " + JSON.stringify(this.targetData), this, this.deps.map(d => d.constructor.name));
  const id = this.id;

  // Unsetting the children
  bbn.fn.each(this.children, subObj => {
    subObj.unset(true);
  });
  const done = [];
  // Unsetting the data in each component, root is last
  for (let i = 0; i < this.refs.length; i++) {
    const it = this.refs[i];
    const cp = it.component;
    if (cp) {
      let idx = cp.$values.indexOf(id);
      if (idx > -1) {
        cp.$values.splice(idx, 1);
        done.push(cp.$cid);
      }
      else if (!done.includes(cp.$cid)) {
        this.refs.splice(i, 1);
        i--;
      }
      
      if (!noParent && it.parent) {
        let idx = it.parent.children.indexOf(this);
        if (idx > -1) {
          //bbn.fn.log(["UPDATE ON UNSET", this, it.parent, cp, it]);
          it.parent.children.splice(idx, 1);
          it.parent.prepareUpdate();
        }
      }
    }
    else {
      throw Error(bbn._("Impossible to find the component %s", cp.$cid));
    }
  }

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

  bbnData.inventory.delete(id);
  delete this.targetData.__bbnData;
  //bbn.fn.log(["DATA deleted", JSON.stringify(this.targetData)]);
};

  