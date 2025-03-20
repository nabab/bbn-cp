import addNamespace from "./addNamespace.js";
import setData from "./setData.js";
import updateWatcher from "./updateWatcher.js";

export default function setUpData(cp, name, value) {
  
  if (!Object.hasOwn(cp, name)) {
    if (cp.$isPropNative(name)) {
      if (cp.tagName === 'BBN-ANON') {
        bbn.fn.log(cp);
      }

      throw new Error(`The data ${name} is already defined in the HTML prototype of the component ${cp.tagName}`);
    }

    // The data will remain the same if not simple Obj/Array
    cp.$dataCfg[name] = bbn.fn.createObject({
      value: cp.$treatValue(value, name),
    });
    const def = {
      get() {
        bbnData.addSequence(cp, name);
        return cp.$dataCfg[name].value;
      },
      set(v) {
        return setData(cp, name, v);
      }
    };
    Object.defineProperty(cp, name, def);
    addNamespace(cp, name, 'data');
    if (cp.$numBuild) {
      updateWatcher(cp, name);
    }
  }
}
