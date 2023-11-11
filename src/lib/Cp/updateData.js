import bbnCp from "../Cp.js";

/**
 * Update the data property with the dataSource Array
 */
bbnCp.prototype.$updateData = function () {
  if (this.$isDataSet) {
    return;
  }

  if (this.$dataSource.length) {
    let tmp = bbn.fn.createObject(
      bbn.fn.extend(bbn.fn.createObject(), ...this.$dataSource.map(a => a.apply(this)))
    );
    bbn.fn.each(tmp, (v, n) => {
      this.$setUpData(n, v);
    })
  }

  Object.defineProperty(this, '$isDataSet', {
    value: true,
    writable: false,
    configurable: false
  });
}