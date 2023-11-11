import bbnCp from "../Cp.js";

bbnCp.prototype.$updateWatcher = function(name, v, init){
  if ((init || this.$isInit) && this.$watcher?.[name]) {
    let lev = 0;
    const bits = name.split(".");
    for (let i = bits.length - 1; i > -1; i--) {
      let name = bits.join('.');
      if (this.$watcher[name]?.handler) {
        if (!bbn.fn.isFunction(this.$watcher[name].handler)) {
          throw new Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
        }

        const hash = bbnData.hash(v);
        if ((!lev || this.$watcher[name].deep) && (hash !== this.$watcher[name].hash)) {
          let oldDataObj = bbnData.getObject(this.$watcher[name].value);
          let oldV = oldDataObj ? oldDataObj.value : this.$watcher[name].value;
          this.$watcher[name].value = lev ? bbn.fn.getProperty(this, name) : v;
          this.$watcher[name].hash = bbnData.hash(this.$watcher[name].value);
          this.$watcher[name].num++;
          if (!init) {
            this.$watcher[name].handler.apply(this, [this.$watcher[name].value, oldV]);
          }
        }
      }
      bits.pop();
      lev++
    }
  }
}