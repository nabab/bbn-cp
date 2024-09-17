import bbn from "@bbn/bbn";
import bbnData from "../Data.js";

/**
 * Returns a set of functions to be used by the proxy of bbnData objects
 * @param {*} component 
 * @param {*} path 
 * @param {*} targetObj 
 * @returns 
 */
bbnData.proxy = function(component, path, targetObj) {
  const t = this;
  return {
    get(target, key) {
      let realValue = target[key];
      if (key === 'constructor') {
        return realValue;
      }

      if (key?.indexOf && (key.indexOf('__bbn') === 0)) {
        if (key === '__bbnProxy') {
          return true;
        }

        return realValue;
      }

      if (bbn.fn.isFunction(realValue)) {
        if (targetObj?.isArray && bbn.fn.isString(key)) {
          const fnName = bbn.fn.camelize('proxy-' + key);
          if (bbn.fn.isFunction(bbnData[fnName])) {
            return t[fnName](targetObj, target, component, path);
          }
        }

        return realValue;
      }
      else if (realValue) {
        realValue = t.treatValue(realValue, component, key, targetObj);
      }
      
      if ((realValue === undefined) && !Object.hasOwn(target, key)) {
        return realValue;
      }

      bbnData.addSequence(component, key, targetObj);

      return realValue;
    },
    set(target, key, value) {
      if (key?.indexOf && (key.indexOf('__bbn') === 0)) {
        target[key] = value;
        return true;
      }

      const oldValue = target[key];
      const oldObj = t.getObject(oldValue);
      let mod = false;
      //bbn.fn.log(["SET", key, oldValue, value, oldObj, targetObj.getImpacted([key], bbn.fn.microtimestamp())]);

      if (oldObj && !oldObj.isSame(value)) {
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
        bbn.fn.log([
          "SET",
          "DATAOBJ",
          dataObj,
          "TARGET",
          t.getObject(target),
          "SAME",
          targetObj === t.getObject(target),
          "TARGETOBJ",
          targetObj,
          key,
          newVal,
          oldValue,
          target,
          '------'
        ]);
        */

        if (dataObj) {
          dataObj.prepareUpdate();
        }

        targetObj.prepareUpdate(key);

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
        targetObj.prepareUpdate(key);
      }
      else {
        bbn.fn.log(target, key, description);
        bbn.fn.warning("Impossible to get the target object");
      }
      return true;
    },
    deleteProperty(target, key) {
      if (key.indexOf && !key.indexOf('__bbn')) {
        delete target[key];
        return true;
      }

      const dataObj = t.getObject(target[key]);
      if (dataObj) {
        dataObj.unset();
      }

      delete target[key];
      targetObj.prepareUpdate();
      return true;
    }
  }
}
