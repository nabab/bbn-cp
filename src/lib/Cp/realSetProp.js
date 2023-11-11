import bbnCp from "../Cp.js";

bbnCp.prototype.$realSetProp = function (name, value) {
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  const original = this.$props[name];
  const oldObj = bbnData.getObject(original);
  const newObj = bbnData.getObject(value);
  let todo = true;
  // There are data objects and their hash is different
  if (oldObj) {
    if (newObj) {
      if (newObj !== oldObj) {
        //bbn.fn.log('Removing 4 data for ' + this.$cid + ' in ' + this.$options.name + ' / path: ' + name, this);
        if (oldObj.hasComponent(this, name)) {
          oldObj.removeComponent(this, name);
        }

        newObj.addComponent(this, name);
      }
    }
    else {
      //bbn.fn.log('Removing 5 data for ' + this.$cid + ' in ' + this.$options.name + ' / path: ' + name);
      if (oldObj.hasComponent(this, name)) {
        oldObj.removeComponent(this, name);
      }

      value = this.$treatValue(value, name);
    }
  }
  else if (newObj) {
    // The objects are different
    newObj.addComponent(this, name);
  }
  else if (value) {
    value = this.$treatValue(value, name);
  }

  if (original !== value) {
    Object.defineProperty(this.$props, name, {
      value: value,
      writable: false,
      configurable: true
    });
    this.$updateWatcher(name, value);

  }

  if (this.$isMounted) {
    this.$emit('propchange', name, value, original);
    //bbn.fn.log(["EMITTING PROPCHANGE", this.$options.name, this.$cid, name, newValue, original, hash, oldHash, JSON.stringify(value)]);
  }
}