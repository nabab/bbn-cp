import { bbn } from "@bbn/bbn";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnData extends EventTarget {

  /**
   * Returns a unique identifier from any type of value (hashes only simple objects and arrays)
   * 
   * @param {*} v Value to hash
   * @returns {String} The hash
   */
  static hash(v) {
    let hash = bbn.fn.hash(v);

    return hash;
  }

  /**
   * Add a special property to an object in order to prevent it from being reactive
   * @param {Object} value The value to immunize
   * @returns {Object} The immunized value
   */
  static immunizeValue(value, deep) {
    if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor)) {
      // Removing data object if any
      if (value.__bbnData) {
        const dataObj = this.getObject(value);
        if (dataObj) {
          dataObj.unset();
        }
      }

      // Adding the special property
      Object.defineProperty(value, '__bbnNoData', {
        value: true,
        enumerable: false,
        configurable: false,
        writable: false
      });

      if (deep) {
        bbn.fn.iterate(value, (v, i) => {
          try {
            value[i] = this.immunizeValue(v, true);
          }
          catch (e) {
            bbn.fn.warning("ERROR IN IMMUNIZE");
            bbn.fn.log(e);
          }
        });
      }
    }
      

    return value;
  }

  /**
   * Gets the value stored in the bbnData object
   * @param {bbnData} obj 
   * @param {Boolean} original if true returns the original value, no the proxy
   * @returns {Object} The reactive value or the original value
   */
  static getValue(obj, original) {
    if (obj && (typeof obj === 'object') && (obj instanceof bbnData)) {
      return obj[original ? 'data' : 'value'];
    }

    return obj;
  }

  /**
   * Retrieves a bbnData object from its unique id
   * 
   * @param {Symbol} id 
   * @returns 
   */
  static retrieve(id) {
    return bbn.cp.dataInventory.get(id);
  }

  /**
   * Returns the bbnData object from a value
   * @param {Object} value 
   * @returns {bbnData|null}
   */
  static getObject(value) {
    if (value && (typeof value === 'object') && value.__bbnData) {
      return this.retrieve(value.__bbnData);
    }

    return null;
  }

  /**
   * Creates a new bbnData object if the given value is not primitive or already reactive, returns the value
   * @param {*} value 
   * @param {*} component 
   * @param {*} path 
   * @param {*} parent 
   * @returns {*} The original value or the reactive value
   */
  static treatValue(value, component, path, parent) {
    if (component.$isDestroyed) {
      return value;
    }

    if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor) && !value.__bbnNoData) {
      if (value.__bbnData) {
        const dataObj = this.retrieve(value.__bbnData);
        if (!dataObj) {
          bbn.fn.log(value);
          bbn.fn.warning(bbn._("The data inventory does not contain the data object"));
          throw new Error(bbn._("The data inventory does not contain the data object"));
        }

        if (!parent) {
          dataObj.addComponent(component, path, parent);
        }

        return dataObj.value;
      }

      if (value.__bbnComponent) {
        throw new Error(bbn._("The data object is a component definition"));
      }

      const dataObj = new bbnData(value, component, path, parent);
      return dataObj.value;
    }

    return value;
  }

  /**
   * Pops the last element of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxyPop(target) {
    return () => {
      // The bbnData object of the target array
      const targetObj = this.getObject(target);
      const len = target.length;
      if (len) {
        const subObj = this.getObject(target[len - 1]);
        if (subObj) {
          subObj.unset();
        }
      }
      const res = target.pop();
      if (targetObj) {
        //bbn.fn.log("POP");
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in pop", target]);
      }
      return res;
    };
  }

  /**
   * Shifts the first element of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxyShift(target) {
    return () => {
      // The bbnData object of the target array
      const targetObj = this.getObject(target);
      if (target.length) {
        const subObj = this.getObject(target[0]);
        if (subObj) {
          subObj.unset();
        }
      }
      const res = target.shift();
      if (targetObj) {
        //bbn.fn.log("SHIFT");
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in shift", target]);
      }

      return res;
    };
  }

  /**
   * Pushes one or more elements to the end of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxyPush(target, component) {
    return (...args) => {
      // The bbnData object of the target array
      const targetObj = this.getObject(target);
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = this.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });
      const res = target.push(...newArgs);
      if (targetObj) {
        //bbn.fn.log("PUSH");
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in push", target]);
      }

      return res;
    };
  }

  /**
   * Unshifts one or more elements to the beginning of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxyUnshift(target, component) {
    return (...args) => {
      // The bbnData object of the target array
      const targetObj = this.getObject(target);
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = this.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });
      const res = target.unshift(...newArgs);
      if (targetObj) {
        //bbn.fn.log([dataObj.path, path]);
        //bbn.fn.warning("UNSHIFT");
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in unshift", target]);
      }

      return res;
    };
  }

  /**
   * Reverses the order of the elements of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxyReverse(target) {
    return (...args) => {
      const res = target.reverse(...args);
      const targetObj = this.getObject(target);
      if (targetObj) {
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in reverse", target]);
      }

      return res;
    };

  }

  /**
   * Sorts the elements of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxySort(target) {
    return (...args) => {
      const res = target.sort(...args);
      const targetObj = this.getObject(target);
      if (targetObj) {
        bbn.fn.warning("SORT");
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in sort", target]);
      }

      return res;
    };
  }

  /**
   * Splices the elements of an array and updates the data object
   * @param {Array} target 
   * @param {*} component 
   * @param {*} path 
   * @returns 
   */
  static proxySplice(target, component) {
    return (index, numDelete, ...args) => {
      const targetObj = this.getObject(target);
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = this.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });

      const res = target.splice(index, numDelete, ...newArgs);
      bbn.fn.each(res, t => {
        let subObj = this.getObject(t);
        if (subObj) {
          subObj.unset();
        }
      });
      if (targetObj) {
        //bbn.fn.log("SPLICE");
        targetObj.update();
      }
      else {
        bbn.fn.log(["Impossible to find the data object in splice", target]);
      }

      return res;
    };
  }

  /**
   * Returns a set of functions to be used by the proxy of bbnData objects
   * @param {*} component 
   * @param {*} path 
   * @param {*} targetObj 
   * @returns 
   */
  static getProxyHandler(component, path, targetObj) {
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

  /**
   * Constructor
   * @param {Object} data A regular object or array i.e. it mustn't be a class instance
   * @param {bbnCp} component The bbn component that contains the data
   * @param {String} path The path of the data in the component
   * @param {bbnData} parent If the data is a sub-object of another bbnData object, the parent object
   */
  constructor(data, component, path, parent) {
    super();
    if (path === 'computed') {
      bbn.fn.log([component, path, parent, data]);
      throw new Error("bbnData cannot be initialized with a computed property");
    }

    if (data instanceof bbnData) {
      throw new Error("bbnData cannot be initialized with a bbnData");
    }

    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData must be initialized with a bbn component");
    }

    if (!data || (typeof data !== 'object') || ![undefined, Object, Array].includes(data.constructor)) {
      bbn.fn.log(data);
      throw new Error("The object given is not compatible with bbnData");
    }

    if (data?.__bbnData) {
      throw new Error("bbnData cannot be initialized multiple times");
    }

    if (parent && !(parent instanceof bbnData)) {
      throw new Error("parent must be a bbnData");
    }

    /**
     * @var {Symbol} id The unique id of the bbnData object
     */
    const id = Symbol();
    Object.defineProperty(this, 'id', {
      writable: false,
      configurable: false,
      value: id
    });

    /**
     * @var {String} path The path of the data in the component
     */
    Object.defineProperty(this, 'path', {
      writable: true,
      value: path
    });

    /**
     * @var {bbnCp} root The root component of the bbnData object, ie the original component for which the bbnData is created
     */
    Object.defineProperty(this, 'root', {
      writable: false,
      configurable: false,
      value: component
    });

    /**
     * @var {bbnData} parent The parent bbnData object if any
     */
    Object.defineProperty(this, 'parent', {
      value: parent || null,
      writable: true,
      configurable: true
    });

    /**
     * @var {Array} children The children bbnData objects (which have this object as parent)
     */
    Object.defineProperty(this, 'children', {
      value: [],
      writable: false,
      configurable: false
    });

    /**
     * @var {Symbol} __bbnData The special property added to the data object to identify it as being part of a bbnData object
     */
    Object.defineProperty(data, '__bbnData', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: this.id
    });

    /**
     * @var {Object|Array} data The original data object
     */
    Object.defineProperty(this, 'data', {
      value: data,
      writable: false,
      configurable: true
    });

    /**
     * @var {Proxy} value The proxy takes care of subreactivity
     */
    Object.defineProperty(this, 'value', {
      value: new Proxy(this.data, this.constructor.getProxyHandler(component, path, this)),
      writable: false,
      configurable: false
    });

    /**
     * @var {Boolean} isArray If the data is an array
     */
    Object.defineProperty(this, 'isArray', {
      value: data instanceof Array,
      writable: false,
      configurable: true
    });

    /**
     * @var {String} old The hash of the data object
     */
    Object.defineProperty(this, 'old', {
      value: bbn.fn.hash(data),
      writable: true,
      configurable: true
    });

    /**
     * @var {Object} components The components that use this data object, indexed by their unique id (cid)
     */
    Object.defineProperty(this, 'components', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'refs', {
      value: [],
      writable: false,
      configurable: false
    });

    this.refs.push({
      component,
      path,
      root: true,
      parent: parent || null
    });

    if (component.$values.indexOf(this.id) === -1) {
      component.$values.push(this.id);
    }

    // If the object has a parent, the current object is added to the parent's children
    if (this.parent) {
      //bbn.fn.log(bbn._("ADDING CHILDREN for %s : %s", path.toString ? path.toString() : path || '<unknown>', JSON.stringify(this.data)))
      this.parent.children.push(this);
    }
    else if ((this.root.$cid !== component.$cid) || (this.path !== path)) {
      this.components[component.$cid] = [path];
    }

    // The object is added to the data inventory
    bbn.cp.dataInventory.set(id, this);

  }

  // Returns the full path of a data object in a component
  getImpactedPath(key) {
    const seq = [];
    if (key) {
      seq.push(key);
    }
    const fp = [];
    let dataObj = this;
    while (dataObj) {
      bbn.fn.iterate(dataObj.components, (pathArr, cid) => {
        const cp = bbn.cp.getComponent(cid)?.bbn;
        if (!cp) {
          bbn.fn.log(dataObj, this);
          throw new Error(bbn._("Impossible to find the component %s", cid));
        }
        else {
          bbn.fn.each(pathArr, p => {
            fp.push({cp, path: [p, ...seq]});
          });
        }
      });
      seq.unshift(dataObj.path);
      if (!dataObj.parent) {
        fp.push({cp: dataObj.root, path: seq});
        dataObj = false;
      }
      else {
        dataObj = dataObj.parent;
      }
    }

    return fp;
  }

  /**
   * Returns the highest parent of the current object
   * @returns {bbnData} The root bbnData object
   */
  rootData() {
    let obj = this;
    while (obj.parent) {
      obj = obj.parent;
    }
    return obj;
  }

  isSame(obj) {
    if (obj?.__bbnProxy) {
      return bbn.fn.isSame(obj, this.value);
    }
    else if (obj?.__bbnData) {
      return bbn.fn.isSame(obj, this.data);
    }

    return false;
  }


  /**
   * Deletes all references to the data object and its children
   */
  unset(noParent) {
    //bbn.fn.log("UNSET " + this.path + " ON " + this.root.$options.name, this);
    const id = this.id;

    // Unsetting the children
    bbn.fn.each(this.children, subObj => {
      subObj.unset(true);
    });
    const done = [];
    // Unsetting the data in each component but the root
    bbn.fn.iterate(this.components, (path, cid) => {
      const cp = bbn.cp.getComponent(cid);
      if (cp?.bbn) {
        // Root will be taken care of later
        if (cp.bbn === this.root) {
          return;
        }
        
        let idx = cp.bbn.$values.indexOf(id);
        if (idx > -1) {
          cp.bbn.$values.splice(idx, 1);
          done.push(cid);
        }
        else if (!done.includes(cid) && cp.bbn.$isInit) {
          bbn.fn.warning(bbn._("Impossible to find the data object in the values of the component %s with CID %s", cp.bbn.$options.name, cid));
          bbn.fn.log(this, cp.bbn, path);
          throw new Error(bbn._("Impossible to find the data object in the values of the component %s with CID %s", cp.bbn.$options.name, cid));
        }
        
        if (!cp.bbn.$isDestroyed) {
          cp.bbn.$tick();
        }
      }
      else {
        throw new Error(bbn._("Impossible to find the component %s", cid));
      }
    });
    
    // Unsetting the data in the root component
    let idx = this.root.$values.indexOf(id);
    if (idx > -1) {
      this.root.$values.splice(idx, 1);
    }
    else {
      bbn.fn.log(this);
      throw new Error(bbn._("Impossible to find the data object in the values of the component %s", dataObj.root.$options.name));
    }
    //bbn.fn.log(["TICK ON UNSET", this]);
    this.root.$tick();

    if (this.parent) {
      let idx = this.parent.children.indexOf(this);
      if (idx > -1) {
        this.parent.children.splice(idx, 1);
      }
    }
    // Ticking the parent components (only for the original unset call)
    if (!noParent && this.parent) {
      let dataObj = this;
      while (dataObj.parent) {
        dataObj = dataObj.parent;
        bbn.fn.iterate(Object.keys(dataObj.components), cid => {
          bbn.cp.getComponent(cid).bbn.$tick();
        });
        dataObj.root.$tick();
      }
    }

    bbn.cp.dataInventory.delete(id);
    delete this.data.__bbnData;
  }

  /**
   * Adds a component to the original bbnData object linked to it
   * @param {bbnCp} component 
   * @param {String} path 
   * @returns {Boolean}
   */
  addComponent(component, path, parent) {
    if (!(component instanceof bbnCp)) {
      throw new Error(bbn._("bbnData hasComponent must be called with a bbn component"));
    }

    if ((this.root !== component) || (this.path !== path)) {
      if (this.components[component.$cid] !== undefined) {
        if (!this.components[component.$cid].includes(path)) {
          this.components[component.$cid].push(path);
        }
      }
      else {
        this.components[component.$cid] = [path];
      }
    }

    if (!component.$values.includes(this.id)) {
      component.$values.push(this.id);
    }
  }

  /**
   * 
   * @param {bbnCp} component 
   * @returns 
   */
  hasComponent(component, name) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData hasComponent must be called with a bbn component");
    }

    if (this.components[component.$cid] !== undefined) {
      if (name) {
        return this.components[component.$cid].includes(name);
      }

      return true;
    }

    return false;
    if (this.components[component.$cid] !== undefined) {
      return true;
    }

    let obj = this;
    while (obj.parent) {
      if (obj.parent.components[component.$cid] !== undefined) {
        return true;
      }

      obj = obj.parent;
    }

    return false;
  }

  /**
   * Removes a component from the data object
   * @param {bbnCp} component 
   */
  removeComponent(component, path) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData hasComponent must be called with a bbn component");
    }

    if ((component === this.root) && (!path || (path === this.path))) {
      this.unset();
    }
    else {
      if (!this.components[component.$cid]) {
        bbn.fn.log(component, path, this);
        throw new Error("The component is not in the list of components");
      }

      if (path) {
        let pathIdx = this.components[component.$cid].indexOf(path);
        if (pathIdx === -1) {
          throw new Error("The path is not in the list of paths");
        }

        this.components[component.$cid].splice(pathIdx, 1);
      }

      if (!path || !this.components[component.$cid].length) {
        let idx = component.$values.indexOf(this.id);
        if (idx > -1) {
          component.$values.splice(idx, 1);
        }
  
        delete this.components[component.$cid];
      }
    }
  }

  /**
   * Update all the components linked to the data object
   * @param {Boolean} deep 
   */
  update(noParent, key) {
    /*
    if (this.isArray) {
      bbn.fn.each(this.value, (v, i) => {
        const objData = this.constructor.getObject(v);
        if (objData && (i != objData.path)) {
          objData.path = i.toString();
        }
      });
    }
    */
    /*
    if (data.root) {
      bbn.fn.log(["UPDATEBBNDATA", data.root, data]);
    }
    */
    const impacted = this.getImpactedPath(key);
    bbn.fn.each(impacted, it => {
      if (it.cp.$isInit) {
        let data = this;
        let bits = it.path.slice();
        let name = bits.join(".");
        let lev = 0;
        while (bits.length) {
          if (it.cp.$watcher?.[name]) {
            if (bits.length > 1) {
              bits.shift();
              //bbn.fn.log("WATCHER " + name, data.value, bits.join("."), '----')
              it.cp.$updateWatcher(name, bbn.fn.getProperty(data.value, ...bits));
            }
            else {
              //bbn.fn.log("WATCHER " + name, data.value, '----')
              it.cp.$updateWatcher(name, data.value);
            }
          }
          bits.pop();
          if (bits.length) {
            if (!key || lev) {
              if (data.parent) {
                data = data.parent;
              }
              else {
                bbn.fn.log(["NO PARENT", lev, name, data.path, this.path, key, data, this]);
                bbn.fn.warning("NO PARENT");
                throw new Error("Boooo!")
              }
            }
            name = bits.join('.');
          }
          else {
            break;
          }
          lev++;
        }
        it.cp.$tick()

        if (noParent) {
          return;
        }
      }

    });
    //          this.updateChildren();

  }

  updateChildren() {
    if (this.children.length) {
      bbn.fn.each(this.children, obj => {
        obj.update(true);
      });
    }
  }

}

