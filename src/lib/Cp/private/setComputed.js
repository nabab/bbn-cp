import updateComputed from './updateComputed.js';
import updateWatcher from './updateWatcher.js';

export default function setComputed(cp, name, getter, setter) {
  if (Object.hasOwn(cp, name)) {
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
            updateComputed(this, name, getter.bind(this)());
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
  Object.defineProperty(cp, name, def);
  updateWatcher(cp, name, cp[name], true);
}
