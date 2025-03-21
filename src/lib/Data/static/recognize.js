import bbnData from "../Data.js";

const retrieveData = function (v, res, path) {
  if (!res) {
    res = bbn.fn.createObject();
  }
  if (!path) {
    path = [];
  }

  if (!bbn.fn.isPrimitive(v)) {
    const keys = Object.keys(v).sort();
    for (let i in keys) {
      let n = keys[i];
      if (!bbn.fn.isPrimitive(v[n])) {
        let p = path.slice();
        p.push(n);
        if (v[n].__bbnData) {
          res[p.join('.')] = v[n].__bbnData.uid;
        }
        else if ([undefined, Object, Array].includes(v.constructor)) {
          retrieveData(v[n], res, p);
        }
      }
    }
  }

  return res;
};

const mutateArray = function(newArr, oldArr, component, path, parent) {
  if (newArr?.__bbnData instanceof bbnData) {
    return false;
  }
  const rnd = bbn.fn.randomString();
  bbn.fn.startChrono(rnd);
  const newHash = newArr.map(v => retrieveData(v));
  const oldHash = oldArr.map(v => retrieveData(v));
  //bbn.fn.log("HASSHES", newHash, oldHash);
  let toFix = false;
  let changed = false;
  for (let i = 0; i < newArr.length; i++) {
    if (oldArr[i] !== newArr[i]) {
      if (newArr[i]?.__bbnData instanceof bbnData) {
        const idx = oldArr.lastIndexOf(newArr[i]);
        if (idx > i) {
          bbn.fn.move(oldArr, idx, i);
          changed = true;
        }
        else {
          oldArr[i] = newArr[i];
          changed = true;
        }
      }
      else if (bbn.fn.numProperties(newHash[i])) {
        let idx = bbn.fn.search(oldHash, newHash[i]);
        if (idx === i) {
          if (mutate(newArr[i], oldArr[i], component, i, oldArr)) {
            changed = true;
          }
        }
        // If it's before it means it's double --> problem
        else if (idx > i) {
          bbn.fn.move(oldArr, idx, i);
          mutate(newArr[i], oldArr[i], component, path, oldArr);
          changed = true;
        }
        else {
          oldArr.splice(i, 0, newArr[i]);
          changed = true;
        }
      }
      else if (Object.hasOwn(oldArr, i)) {
        if (bbn.fn.isObject(newArr[i], oldArr[i])) {
          if (newArr[i].__bbnData) {
            oldArr[i] = newArr[i];
            changed = true;
          }
          else if (mutateObject(newArr[i], oldArr[i], component, i, oldArr)) {
            changed = true;
          }
        }
        else if (bbn.fn.isArray(newArr[i], oldArr[i])) {
          if (mutateArray(newArr[i], oldArr[i], component, path, oldArr)) {
            changed = true;
          }
        }
        else {
          oldArr[i] = newArr[i];
          changed = true;
        }
      }
      else {
        oldArr.push(newArr[i]);
        changed = true;
      }
    }
  }

  if (oldArr.length > newArr.length) {
    oldArr.splice(newArr.length);
    changed = true;
  }

  //bbn.fn.log(["MUTATE ARRAY", newArr.length, newArr, oldArr, bbn.fn.stopChrono(rnd)]);
  return changed;
};

const mutateObject = function(newObj, oldObj, component, path, parent) {
  if (newObj?.__bbnData instanceof bbnData) {
    return false;
  }

  const rnd = bbn.fn.randomString();
  bbn.fn.startChrono(rnd);
  let changed = false;
  const done = [];
  for (let n in newObj) {
    if (oldObj[n] !== newObj[n]) {
      if (bbn.fn.isPrimitive(newObj[n])) {
        oldObj[n] = newObj[n];
        changed = true;
      }
      else if (!Object.hasOwn(oldObj, n) || bbn.fn.isPrimitive(oldObj[n])) {
        oldObj[n] = newObj[n];
        changed = true;
      }
      else if (oldObj[n].__bbnData) {
        const oldObjData = bbnData.getObject(oldObj[n]);
        if (oldObjData) {
          const newObjectData = bbnData.getObject(newObj[n]);
          if (newObjectData) {
            oldObj[n] = newObj[n];
          }
          else if (oldObjData.isArray) {
            if (bbn.fn.isArray(newObj[n])) {
              if (mutateArray(newObj[n], oldObj[n], component, n, oldObj)) {
                changed = true;
              }
            }
            else {
              oldObj[n] = newObj[n];
            }
          }
          else {
            if (bbn.fn.isObject(newObj[n])) {
              if (mutateObject(newObj[n], oldObj[n], component, n, oldObj)) {
                changed = true;
              }
            }
            else {
              oldObj[n] = newObj[n];
              changed = true;
            }
          }
        }
        else {
          if (mutate(newObj[n], oldObj[n], component, n, oldObj)) {
            changed = true;
          }
        }
      }
      else {
        oldObj[n] = component.$treatValue(newObj[n], n, oldObj.__bbnData);
        changed = true;
      }
    }

    done.push(n);
  }

  for (let n in oldObj) {
    if (!done.includes(n)) {
      delete oldObj[n];
      changed = true;
    }
  }

  //bbn.fn.log(["MUTATE OBJECT", newObj, oldObj, bbn.fn.stopChrono(rnd)]);
  return changed;
};

const mutate = function(newObj, oldObj, component, path, parent) {
  if (oldObj.__bbnData?.isArray) {
    if (bbn.fn.isArray(newObj)) {
      return mutateArray(newObj, oldObj, component, path, parent);
    }
    else {
      throw new Error("The new object is not an array");
    }
  }
  else {
    if (bbn.fn.isObject(newObj, oldObj)) {
      return mutateObject(newObj, oldObj, component, path, parent);
    }
    else {
      throw new Error("The new object is not an object");
    }
  }
};

/**
 * 
 * @param {*} v The new value to be set 
 * @param {*} oldData The current value
 * @param {*} component The component
 * @param {*} path The path
 * @returns {value: {*}, changed: {Bool}} An object with the new value or the old one modified, and a boolean indicating if the value has changed
 */
bbnData.recognize = function(v, oldData, component, path) {
  let isChanged = false;
  if (v !== oldData) {
    const newDataObject = v?.__bbnData;
    const oldDataObject = oldData?.__bbnData?.value ? oldData?.__bbnData : false;
    //bbn.fn.log(['RECO', path, oldDataObject?.isArray, v?.length, v, oldData, newDataObject]);
    if (!bbn.fn.isPrimitive(v)) {
      if (![undefined, Object, Array].includes(v.constructor)) {
        //bbn.fn.log("INSIDE " + this.#name)
        if (oldDataObject) {
          oldDataObject.removeComponent(component, path);
        }

        isChanged = true;
      }
      // Case where the result has not been treated and a data object already exists
      else if (!newDataObject && oldDataObject && (oldDataObject.root.component === component) && (oldDataObject.root.path === path)) {
        if (oldDataObject.isArray && bbn.fn.isArray(v)) {
          isChanged = mutateArray(v, oldDataObject.value, component, path);
          //bbn.fn.log(["MUTATE ARRAY", oldDataObject.value, v, path]);
          v = oldDataObject.value;
        }
        // If both are objects we mutate the old one into the new one
        else if (!oldDataObject.isArray && bbn.fn.isObject(v)) {
          isChanged = mutateObject(v, oldDataObject.value, component, path);
          //bbn.fn.log(["MUTATE OBJECT", oldDataObject.value, v]);
          v = oldDataObject.value;
        }
        else {
          // Remove the old data object from the component.
          isChanged = oldDataObject.removeComponent(component, path);
          v = component.$treatValue(v, path);
        }
      }
      // Case where the result is already treated (by another property and/or another component)
      else if (newDataObject) {
        if (newDataObject !== oldDataObject) {
          // Existing different data object
          if (oldDataObject) {
            // Remove the old data object from the component.
            oldDataObject.removeComponent(component, path);
          }

          newDataObject.addComponent(component, path);
          isChanged = true;
        }
      }
      else {
        // Treat the value and get the data object.
        v = component.$treatValue(v, path);
        isChanged = true;
      }
    }

  }

  return {value: v, changed: isChanged};
}
