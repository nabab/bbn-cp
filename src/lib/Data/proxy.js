import bbnData from "../Data.js";

/**
 * Returns a set of functions to be used by the proxy of bbnData objects
 * @param {*} component 
 * @param {*} path 
 * @param {*} targetObj 
 * @returns 
 */
bbnData.proxy = function(component, path, targetObj) {
  if (path === 'computed') {
    bbn.fn.log([component, path, targetObj]);
    throw new Error("Proxy cannot be initialized with a computed property");
  }

  const t = this;
  return {
    get(target, key) {
      const realValue = target[key];
      if (key?.indexOf && (key.indexOf('__bbn') === 0)) {
        if (key === '__bbnProxy') {
          return true;
        }

        return realValue;
      }

      if (bbn.fn.isFunction(realValue)) {
        if (targetObj && targetObj.isArray && bbn.fn.isString(key)) {
          const fnName = bbn.fn.camelize('proxy-' + key);
          if (bbn.fn.isFunction(bbnData[fnName])) {
            return t[fnName](target, component, path);
          }
        }
      }
      else if (realValue) {
        const val = t.treatValue(realValue, component, key, targetObj);
        return val;
      }

      return realValue;
    },
    set(target, key, value) {
      if (key?.indexOf && (key.indexOf('__bbn') === 0)) {
        target[key] = newVal;
        return true;
      }

      const oldValue = target[key];
      const oldObj = t.getObject(oldValue);
      let mod = false;
      if (oldObj && !oldObj.isSame(value)) {
        const newObj = t.getObject(value);
        //bbn.fn.log(["UNSET", key, oldValue, value, oldObj.path, newObj?.path, oldObj.parent?.value?.length, newObj?.parent?.value?.length]);
        oldObj.unset();
        mod = true;
      }
      else if (!oldObj && !bbn.fn.isSame(oldValue, value)) {
        mod = true;
      }
      
      if (mod) {
        const newVal = t.treatValue(value, component, key, targetObj);
        target[key] = newVal;
        const dataObj = t.getObject(newVal);
        /*
        if (key === 'loading') {
          bbn.fn.log(["SET LOADING", value, mod, target, targetObj]);
        }

        bbn.fn.log(["SET", targetObj, key, newVal, oldValue, target, '------']);
        */
        

        if (dataObj) {
          dataObj.update(false);
        }
        else {
          targetObj.update(true, key);
        }

      }

      return true;
    },
    defineProperty(target, key, description) {
      if (key.indexOf('__bbn') === 0) {
        Object.defineProperty(target, key, description);
        return true;
      }

      const oldValue = target[key];
      const oldObj = t.getObject(oldValue);
      if (oldObj) {
        oldObj.unset();
      }

      if (description.value) {
        description.value = t.treatValue(description.value, component, key, targetObj);
      }

      Object.defineProperty(target, key, description);
      if (targetObj) {
        targetObj.update(false, key);
      }
      else {
        bbn.fn.log(target, key, description);
        bbn.fn.warning("Impossible to get the target object");
      }
      return true;
    },
    deleteProperty(target, key) {
      const dataObj = t.getObject(target[key]);
      if (dataObj) {
        dataObj.unset();
      }

      delete target[key];
      targetObj.update();
      return true;
    }
  }
}
