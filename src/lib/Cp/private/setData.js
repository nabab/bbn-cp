import updateWatcher from "./updateWatcher.js";
import setUpData from "./setUpData.js";
/**
 * Set the data properties of the object
 */
export default function setData(cp, name, v) {
  //bbn.fn.log(["SET DATA", cp, name, v]);
  // In the case the function is called litterally it creates 
  if (!Object.hasOwn(cp, name)) {
    return setUpData(cp, name, v);
  }

  if (cp.$dataValues[name] !== v) {
    let isMod = true;
    // Will remain the same if not simple Obj/Array
    const oldV = bbnData.getValue(cp.$dataValues[name]);
    // Getting the bbnData object
    let oldDataObj = bbnData.getObject(oldV);
    if (oldDataObj) {
      if (oldDataObj.isSame(v)) {
        isMod = false;
      }
      else {
        //bbn.fn.log(["REMOVING COMPONENT FROM DATA", cp, oldV, v]);
        oldDataObj.removeComponent(cp, name);
      }
    }

    if (isMod) {
      const newVal = cp.$treatValue(v, name);
      cp.$dataValues[name] = newVal;
      updateWatcher(cp, name, newVal);
      cp.$tick();
    }
  }
}