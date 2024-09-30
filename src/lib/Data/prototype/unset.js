import bbnData from "../Data.js";

/**
 * Deletes all references to the data object and its children
 */
const err = "Impossible to find the data object in the values of the component %s with CID %s";
bbnData.prototype.unset = function(noParent) {
  //bbn.fn.log("UNSET: " + JSON.stringify(this.targetData), this, this.deps.map(d => d.constructor.name));
  const id = this.id;

  // Unsetting the children
  while (this.children.length) {
    this.children.pop().unset(true);
  }
  // Unsetting the data in each component, root is last
  while (this.refs.length) {
    const it = this.refs.shift();
    const cp = it.component;
    if (cp) {
      if (!noParent && it.parent) {
        let idx = it.parent.children.indexOf(this);
        if (idx > -1) {
          //bbn.fn.log(["UPDATE ON UNSET", this, it.parent, cp, it]);
          it.parent.children.splice(idx, 1);
          it.parent.prepareUpdate();
        }
      }
    }
  }
  bbn.fn.each(this.children, it => it.unset());

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
  delete this.targetData.__bbnKeys;
  delete this.targetData;
  //bbn.fn.log(["DATA deleted", JSON.stringify(this.targetData)]);
};

  