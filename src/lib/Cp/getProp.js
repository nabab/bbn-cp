import bbnCp from "../Cp.js";

bbnCp.prototype.$getProp = function(name){
  if (Object.hasOwn(this.$el.bbnSchema.props || {}, name) && (this.$el.bbnSchema.props[name] !== this.$props[name])) {
    this.$setProp(name, this.$el.bbnSchema.props[name]);
  }
  let v = bbnData.getValue(this.$props[name]);
  /*
  if (!bbn.fn.isPrimitive(v) && (typeof v === 'object') && [Array, Object, undefined].includes(v.constructor)) {
    const hash = bbn.fn.hash(v);
    if (this.$oldValues[name] !== hash) {
      if (this.$isInit) {
        if (this.$watcher?.[name]?.handler) {
          if (!bbn.fn.isFunction(this.$watcher[name].handler)) {
            throw new Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
          }
          const oldV = this.$watcher[name].value;
          this.$watcher[name].value = v;
          this.$watcher[name].handler.apply(this, [v, oldV]);
        }

        this.$oldValues[name] = hash;
        this.$tick();
      }
    }
  }
  */

  return v;
}
