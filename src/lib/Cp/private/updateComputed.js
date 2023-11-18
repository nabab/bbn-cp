import updateWatcher from "./updateWatcher.js";

export default function updateComputed(cp, name, val) {
  if (!cp.$computed[name]) {
    throw new Error(bbn._("The computed %s is not defined in %s", name, cp.$options.name));
  }

  //bbn.fn.log("UPDATING COMPUTED " + name + " IN " + cp.$options.name, val);
  const hash = bbnData.hash(val);
  const oldValue = cp.$computed[name].val;
  const oldHash = cp.$computed[name].hash;
  let go = ((val !== oldValue) && !bbn.fn.isSame(oldHash, hash))
    || !bbn.fn.isSame(cp.$computed[name].hash, hash);
  if (go) {
    let newData = bbnData.getObject(val);
    const oldData = bbnData.getObject(oldValue);
    if (bbn.fn.isArray(val, oldValue)
      && !newData
      && oldData
      && (oldData.root === cp)
      && (oldData.path === name)
    ) {
      if (val !== oldValue) {
        bbn.fn.mutateArray(oldValue, val);
      }

    }
    else if (oldValue !== val) {
      if (oldData && oldData.hasComponent(cp, name)) {
        //bbn.fn.log('Removing 6 data for ' + cp.$cid + ' in ' + cp.$options.name + ' / path: ' + name);
        oldData.removeComponent(cp, name);
      }
      //bbn.fn.log(["UPDATING COMPUTED " + name + " IN " + cp.$options.name, val, oldValue]);
      cp.$computed[name].old = oldValue;
      cp.$computed[name].val = cp.$treatValue(val, name);
      newData = bbnData.getObject(cp.$computed[name].val);
      if (newData) {
        newData.addComponent(cp, name);
      }
    }

    cp.$computed[name].hash = hash;
    if (newData) {
      newData.update();
    }
    //bbn.fn.log(["UPDATING COMPUTED " + name + " IN " + cp.$options.name, cp.$computed[name].val]);
    updateWatcher(cp, name, val);
    cp.$tick();
    return true;
  }

  return false;
}