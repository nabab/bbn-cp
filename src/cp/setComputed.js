export default function setComputed(obj, name, getter, setter) {
  if (Object.hasOwn(obj, name)) {
    throw new Error(bbn._("The computed property %s already exists", name));
  }


  const def = {
    get() {
      if (!this.$isDataSet) {
        return undefined;
      }
      if (!Object.hasOwn(this.$computed, name)) {
        this.$computed[name] = bbn.fn.createObject({
          old: undefined,
          val: undefined,
          hash: undefined,
          num: -1,
          update: () => {
            this.$updateComputed(name, getter.bind(this)());
          }
        });
      }
      if (this.$computed[name].num < this.$numBuild) {
        this.$computed[name].update();
        this.$computed[name].num++;
      }
  
      return bbnData.getValue(this.$computed[name].val);
    }
  };
  if (setter) {
    def.set = function(v) {
      const res = setter.bind(this)(v);
      this.$computed[name].update();
      return res;
    };
  }
  Object.defineProperty(obj, name, def);
  obj.$updateWatcher(name, obj[name], true);
}
