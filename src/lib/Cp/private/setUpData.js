import addNamespace from "./addNamespace.js";
import setData from "./setData.js";
import updateWatcher from "./updateWatcher.js";

export default function setUpData(cp, name, value) {
  
  if (!Object.hasOwn(cp, name)) {
    // The data will remain the same if not simple Obj/Array
    cp.$dataValues[name] = cp.$treatValue(value, name);
    const def = {
      get() {
        /*
        if (cp.$currentComputed && !cp.$computed[cp.$currentComputed].dependencies.includes(name)) {
          cp.$computed[cp.$currentComputed].dependencies.push(name);
        }
        */
        bbnData.addSequence(cp, name, this.$dataValues[name]);
        return cp.$dataValues[name];
      },
      set(v) {
        return setData(cp, name, v);
      }
    };
    Object.defineProperty(cp, name, def);
    addNamespace(cp, name, 'data');
    if ((cp.$options.name === 'bbn-widget') && (name === 'dashboard')){
      bbn.fn.log(["SETTING UP DATA", value, Object.hasOwn(cp, name), cp.$namespaces.currentItems, cp.$numBuild, cp.$isCreated, cp.$isMounted])
    }
    if (cp.$numBuild) {
      updateWatcher(cp, name, cp.$dataValues[name], true);
    }
    if (cp.$isMounted) {
      cp.$tick();
    }
  }
}