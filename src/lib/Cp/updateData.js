import bbn from "@bbn/bbn";
import bbnCp from "../Cp.js";

/**
 * Update the data property with the dataSource Array
 */
bbnCp.prototype.$updateData = function () {
  if (this.$isDataSet) {
    return;
  }

  if (this.$cfg.data.length) {
    bbn.fn.iterate(
      bbn.fn.extend(bbn.fn.createObject(), ...this.$cfg.data.map(a => a.apply(this))),
      (v, n) => {
        this.$setUpData(n, v);
      }
    );
  }

  Object.defineProperty(this, '$isDataSet', {
    value: true,
    writable: false,
    configurable: false
  });
}