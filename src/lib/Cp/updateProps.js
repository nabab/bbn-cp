import bbnCp from "../Cp.js";

bbnCp.prototype.$updateProps = function () {
  bbn.fn.each(this.$namespaces, (a, n) => {
    if (a === 'props') {
      this.$getProp(n);
    }
  });
}