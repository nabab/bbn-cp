import updateWatcher from "../lib/Cp/private/updateWatcher.js";
import updateComputed from "../lib/Cp/private/updateComputed.js";

export default function setComputed(obj, name, getter, setter) {
  if (Object.hasOwn(obj, name)) {
    throw new Error(bbn._("The computed property %s already exists", name));
  }


  if (Object.hasOwn(obj.$computed, name)) {
    throw new Error(bbn._("The computed property %s already exists", name));
  }

  obj.$computed[name] = bbn.fn.createObject({
    old: undefined,
    val: undefined,
    hash: undefined,
    num: 0,
    update: () => {
      updateComputed(obj, name, getter.bind(obj)());
    }
  });

  const def = {
    get() {
      if (!this.$isDataSet) {
        return undefined;
      }

      if (this.$computed[name].num <= this.$numBuild) {
        this.$computed[name].update();
        this.$computed[name].num = this.$numBuild + 1;
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
  updateWatcher(obj, name, obj[name], true);
}
