import bbnCp from "../Cp.js";

bbnCp.prototype.$updateComputed = function (name, val) {
  if (!this.$computed[name]) {
    throw new Error(bbn._("The computed %s is not defined in %s", name, this.$options.name));
  }

  //bbn.fn.log("UPDATING COMPUTED " + name + " IN " + this.$options.name, val);
  const hash = bbnData.hash(val);
  const oldValue = this.$computed[name].val;
  const oldHash = this.$computed[name].hash;
  let go = ((val !== oldValue) && !bbn.fn.isSame(oldHash, hash))
    || !bbn.fn.isSame(this.$computed[name].hash, hash);
  if (go) {
    let newData = bbnData.getObject(val);
    const oldData = bbnData.getObject(oldValue);
    if (bbn.fn.isArray(val, oldValue)
      && !newData
      && oldData
      && (oldData.root === this)
      && (oldData.path === name)
    ) {
      if (val !== oldValue) {
        bbn.fn.mutateArray(oldValue, val);
      }

    }
    else if (oldValue !== val) {
      if (oldData && oldData.hasComponent(this, name)) {
        //bbn.fn.log('Removing 6 data for ' + this.$cid + ' in ' + this.$options.name + ' / path: ' + name);
        oldData.removeComponent(this, name);
      }
      //bbn.fn.log(["UPDATING COMPUTED " + name + " IN " + this.$options.name, val, oldValue]);
      this.$computed[name].old = oldValue;
      this.$computed[name].val = this.$treatValue(val, name);
      newData = bbnData.getObject(this.$computed[name].val);
      if (newData) {
        newData.addComponent(this, name);
      }
    }

    this.$computed[name].hash = hash;
    if (newData) {
      newData.update();
    }
    //bbn.fn.log(["UPDATING COMPUTED " + name + " IN " + this.$options.name, this.$computed[name].val]);
    this.$updateWatcher(name, val);
    this.$tick();
    return true;
  }

  return false;
}