import bbnCp from "../Cp.js";

/**
 * Set the data properties of the object
 */
bbnCp.prototype.$setData = function (name, v) {
  //bbn.fn.log(["SET DATA", this, name, v]);
  // In the case the function is called litterally it creates 
  if (!Object.hasOwn(this, name)) {
    return this.$setUpData(name, v);
  }
  if (this.$dataValues[name] !== v) {

    let isMod = true;
    // Will remain the same if not simple Obj/Array
    const oldV = bbnData.getValue(this.$dataValues[name]);
    // Getting the bbnData object
    let oldDataObj = bbnData.getObject(oldV);
    if (oldDataObj) {
      if (oldDataObj.isSame(v)) {
        isMod = false;
      }
      else {
        //bbn.fn.log(["REMOVING COMPONENT FROM DATA", this, oldV, v]);
        oldDataObj.removeComponent(this, name);
      }
    }

    if (isMod) {
      const newVal = this.$treatValue(v, name);
      this.$dataValues[name] = newVal;
      this.$updateWatcher(name, newVal);
      this.$tick();
    }
  }
}