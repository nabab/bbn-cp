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
          let tmp = bbnData.getObject(v[n]);
          res[p.join('.')] = tmp.uid;
        }
        else if ([undefined, Object, Array].includes(v.constructor)) {
          retrieveData(v[n], res, p);
        }
      }
    }
  }

  return res;
};

const mutateArray = function(newArr, oldArr) {
  const rnd = bbn.fn.randomString();
  bbn.fn.startChrono(rnd);
  const newHash = newArr.map(v => retrieveData(v));
  const oldHash = oldArr.map(v => retrieveData(v));
  let toFix = false;
  let changed = false;
  for (let i = 0; i < newArr.length; i++) {
    if (oldArr[i] !== newArr[i]) {
      if (bbn.fn.numProperties(newHash[i])) {
        let idx = bbn.fn.search(oldHash, newHash[i]);
        if (idx === i) {
          if (mutate(newArr[i], oldArr[i])) {
            changed = true;
          }
        }
        // If it's before it means it's double --> problem
        else if (idx > i) {
          bbn.fn.move(oldArr, idx, i);
          mutate(newArr[i], oldArr[i]);
          toFix = true;
          changed = true;
        }
        else {
          oldArr.splice(i, 0, newArr[i]);
          toFix = true;
          changed = true;
        }
      }
      else {
        oldArr.splice(i, 0, newArr[i]);
        toFix = true;
        changed = true;
      }
    }
  }

  if (oldArr.length > newArr.length) {
    oldArr.splice(newArr.length);
    toFix = true;
    changed = true;
  }

  if (toFix) {
    const oldDataObj = bbnData.getObject(oldArr);
    oldDataObj.fixIndexes();
  }

  bbn.fn.log(["MUTATE ARRAY", newArr.length, newArr, oldArr, bbn.fn.stopChrono(rnd)]);
  return changed;
};

const mutateObject = function(newObj, oldObj) {
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
              if (mutateArray(newObj[n], oldObj[n])) {
                changed = true;
              }
            }
            else {
              oldObj[n] = newObj[n];
            }
          }
          else {
            if (bbn.fn.isObject(newObj[n])) {
              if (mutateObject(newObj[n], oldObj[n])) {
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
          if (mutate(newObj[n], oldObj[n])) {
            changed = true;
          }
        }
      }
      else {
        oldObj[n] = newObj[n];
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

  bbn.fn.log(["MUTATE OBJECT", newObj, oldObj, bbn.fn.stopChrono(rnd)]);
  return changed;
};

const mutate = function(newObj, oldObj) {
  const oldObjData = bbnData.getObject(oldObj);
  if (oldObjData?.isArray) {
    if (bbn.fn.isArray(newObj)) {
      return mutateArray(newObj, oldObj);
    }
    else {
      throw new Error("The new object is not an array");
    }
  }
  else {
    if (bbn.fn.isObject(newObj, oldObj)) {
      return mutateObject(newObj, oldObj);
    }
    else {
      throw new Error("The new object is not an object");
    }
  }

  return false;
};

/**
 * Unshifts one or more elements to the beginning of an array and updates the data object
 * @param {Array} target 
 * @param {*} component 
 * @param {*} path 
 * @returns 
 */
bbnData.recognize = function(v, oldData, component, path) {
  let isChanged = false;
  if (v !== oldData) {
    const newDataObject = bbnData.getObject(v);
    const tmp = bbnData.getObject(oldData);
    const oldDataObject = tmp?.targetData ? tmp : false;
    bbn.fn.log(['RECO', path, oldDataObject?.isArray, v?.length, v, oldData, tmp, newDataObject]);
    if (!bbn.fn.isPrimitive(v)) {
      if (![undefined, Object, Array].includes(v.constructor)) {
        //bbn.fn.log("INSIDE " + this.#name)
        if (oldDataObject) {
          oldDataObject.removeComponent(component, path);
        }

        isChanged = true;
      }
      // Case where the result has not been treated and a data object already exists
      else if (!newDataObject && oldDataObject) {
        bbnData.isUpdating++;
        if (oldDataObject.isArray && bbn.fn.isArray(v)) {
          isChanged = mutateArray(v, oldDataObject.value);
          v = oldDataObject.value;
        }
        // If both are objects we mutate the old one into the new one
        else if (!oldDataObject.isArray && bbn.fn.isObject(v)) {
          isChanged = mutateObject(v, oldDataObject.value);
          //bbn.fn.log(["MUTATE OBJECT", this.#data.value, v]);
          v = oldDataObject.value;
        }
        else {
          // Remove the old data object from the component.
          isChanged = oldDataObject.removeComponent(component, path);
          v = component.$treatValue(v, path);
        }

        bbnData.isUpdating--;
        if (!bbnData.isUpdating) {
          bbnData.updated.splice(0);
          while (bbnData.toUpdate.length) {
            const d = bbnData.toUpdate.shift();
            d.data.prepareUpdate(d.path);
          }
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
