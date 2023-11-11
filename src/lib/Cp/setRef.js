import bbnCp from "../Cp.js";

bbnCp.prototype.$setRef = function (ref, ele) {
  if (this.$refsElements[ref] && (this.$refsElements[ref] !== ele)) {
    if (!bbn.fn.isArray(this.$refsElements[ref])) {
      if (!this.$refsElements[ref].isConnected) {
        this.$refsElements[ref] = ele;
      }
      else {
        this.$refsElements[ref] = [this.$refsElements[ref]]
      }
    }
    if (bbn.fn.isArray(this.$refsElements[ref])) {
      this.$refsElements[ref].push(ele);
    }
  }
  else {
    this.$refsElements[ref] = ele;
  }
}