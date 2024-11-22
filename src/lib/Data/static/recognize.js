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

const mutateArray = function(newArr, oldArr) {
  const newHash = newArr.map(v => retrieveData(v));
  const oldHash = oldArr.map(v => retrieveData(v));
  let toFix = false;
  for (let i = 0; i < newArr.length; i++) {
    if (oldArr[i] !== newArr[i]) {
      if (bbn.fn.numProperties(newHash[i])) {
        let idx = bbn.fn.search(oldHash, newHash[i]);
        if (idx === i) {
          mutate(newArr[i], oldArr[i]);
        }
        // If it's before it means it's double --> problem
        else if (idx > i) {
          bbn.fn.move(oldArr, idx, i);
          mutate(newArr[i], oldArr[i]);
          toFix = true;
        }
        else {
          oldArr.splice(i, 0, newArr[i]);
          toFix = true;
        }
      }
      else {
        oldArr.splice(i, 0, newArr[i]);
        toFix = true;
      }
    }
  }

  if (oldArr.length > newArr.length) {
    oldArr.splice(newArr.length);
    toFix = true;
  }

  if (toFix) {
    oldArr.__bbnData.fixIndexes();
  }
};

const mutateObject = function(newObj, oldObj) {
  const done = [];
  for (let n in newObj) {
    if (oldObj[n] !== newObj[n]) {
      if (bbn.fn.isPrimitive(newObj[n])) {
        oldObj[n] = newObj[n];
      }
      else if (oldObj[n].__bbnData) {
        if (newObj[n].__bbnData) {
          oldObj[n] = newObj[n];
        }
        else {
          mutate(newObj[n], oldObj[n]);
        }
      }
      else {
        oldObj[n] = newObj[n];
      }
    }
    done.push(n);
  }

  for (let n in oldObj) {
    if (!done.includes(n)) {
      delete oldObj[n];
    }
  }
};

const mutate = function(newObj, oldObj) {
  if (oldObj.__bbnData?.isArray) {
    if (bbn.fn.isArray(newObj)) {
      mutateArray(newObj, oldObj);
    }
    else {
      throw new Error("The new object is not an array");
    }
  }
  else {
    if (bbn.fn.isObject(newObj, oldObj)) {
      mutateObject(newObj, oldObj);
    }
    else {
      throw new Error("The new object is not an object");
    }
  }
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
    const newDataObject = v?.__bbnData;
    const oldDataObject = oldData?.__bbnData?.dataTarget ? oldData?.__bbnData : false;
    if (!bbn.fn.isPrimitive(v)) {
      if (![undefined, Object, Array].includes(v.constructor)) {
        //bbn.fn.log("INSIDE " + this.#name)
        if (oldDataObject) {
          oldDataObject.removeComponent(component, path);
        }
      }
      // Case where the result has not been treated and a data object already exists
      else if (!newDataObject && oldDataObject) {
        //bbnData.isUpdating++;
        if (oldDataObject.isArray && bbn.fn.isArray(v)) {
          mutateArray(v, oldDataObject.value);
          v = oldDataObject.value;
        }
        // If both are objects we mutate the old one into the new one
        else if (!oldDataObject.isArray && bbn.fn.isObject(v)) {
          mutateObject(v, oldDataObject.value);
          //bbn.fn.log(["MUTATE OBJECT", this.#data.value, v]);
          v = oldDataObject.value;
          isChanged = true;
        }
        else {
          // Remove the old data object from the component.
          oldDataObject.removeComponent(component, path);
          v = component.$treatValue(v, path);
          isChanged = true;
        }

        /*
        bbnData.isUpdating--;
        if (!bbnData.isUpdating) {
          bbnData.updated.splice(0);
          while (bbnData.toUpdate.length) {
            const d = bbnData.toUpdate.shift();
            d.data.prepareUpdate(d.path);
          }
        }
          */
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
