import bbnCp from "../Cp.js";

bbnCp.prototype.$setUpData = function (name, value) {
  if (!Object.hasOwn(this, name)) {
    // The data will remain the same if not simple Obj/Array
    this.$dataValues[name] = this.$treatValue(value, name);
    const def = {
      get() {
        return this.$dataValues[name];
      },
      set(v) {
        return this.$setData(name, v);
      }
    };
    Object.defineProperty(this, name, def);
    this.$addNamespace(name, 'data');
    if (this.$numBuild) {
      this.$updateWatcher(name, this.$dataValues[name], true);
    }
    if (this.$isMounted) {
      this.$tick();
    }
  }
}