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

  if (cp.$dataCfg[name].value !== v) {
    // Getting the bbnData object
    let oldDataObj = bbnData.getObject(cp.$dataCfg[name].value);
    if (oldDataObj) {
      //bbn.fn.log(["REMOVING COMPONENT FROM DATA", name, cp, oldDataObj, v]);
      oldDataObj.removeComponent(cp, name);
    }
    
    v = cp.$treatValue(v, name);
    cp.$dataCfg[name].value = v;
    cp.$dataCfg[name].lastUpdate = bbn.fn.microtimestamp();
    propagateDependencyChanges(cp, name);
    updateWatcher(cp, name);
  }
}
