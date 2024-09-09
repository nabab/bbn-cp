import updateWatcher from "./updateWatcher.js";
import setUpData from "./setUpData.js";
import propagateDependencyChanges from "./propagateDependencyChanges.js";
/**
 * Set the data properties of the object
 */
export default function setData(cp, name, v) {
  // In the case the function is called litterally it creates 
  
  if (!Object.hasOwn(cp, name)) {
    return setUpData(cp, name, v);
  }

  const oldV = cp.$dataCfg[name].value;
  if (oldV !== v) {
    let isMod = true;
    // Getting the bbnData object

    let oldDataObj = bbnData.getObject(oldV);
    if (oldDataObj) {
      if (oldDataObj.isSame(v)) {
        isMod = false;
        bbn.fn.log("SAME VALUE IN DATA");
      }
      else {
        bbn.fn.log(["REMOVING COMPONENT FROM DATA", cp, oldV, v]);
        oldDataObj.removeComponent(cp, name);
      }
    }

    if (isMod) {
      cp.$dataCfg[name].value = cp.$treatValue(v, name);
      cp.$dataCfg[name].lastUpdate = bbn.fn.microtimestamp();
      propagateDependencyChanges(cp, name);
      updateWatcher(cp, name);
    }
  }
}