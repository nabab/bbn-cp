import bbnData from "../Data.js";

/**
 * Removes a component from the data object
 * @param {HTMLElement} component 
 */
bbnData.prototype.fixIndexes = function() {
  if (this.isArray && this.value) {
    for (let i = 0; i < this.targetData.length; i++) {
      const o = bbnData.getObject(this.targetData[i]);
      if (o) {
        const rows = bbn.fn.filter(o.refs, a => a.parent === this);
        for (let j = 0; j < rows.length; j++) {
          if (rows[j].path != i) {
            rows[j].path = i.toString();
            if (rows[j].root) {
              o.path = rows[j].path;
            }
          }
        }
      }
    }
  }
}
