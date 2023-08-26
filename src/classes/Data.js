/**
 * Takes care of the data reactivity for non primitive values.
 */
class bbnData {

  /**
   * Returns a unique identifier from any type of value (hashes only simple objects and arrays)
   * 
   * @param {*} v Value to hash
   * @returns {String} The hash
   */
  static hash(v) {
    let hash = v;
    hash = bbn.fn.hash(v);

    return hash;
  }

  /**
   * Add a special property to an object in order to prevent it from being reactive
   * @param {Object} value The value to immunize
   * @returns {Object} The immunized value
   */
  static immunizeValue(value) {
    if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor)) {
      Object.defineProperty(value, '__bbnNoData', {
        value: true,
        enumerable: false,
        configurable: false,
        writable: false
      });
    }

    return value;
  }

  /**
   * Gets the value stored in the bbnData object
   * @param {bbnData} obj 
   * @param {Boolean} original 
   * @returns {Object} The reactive value or the original value
   */
  static getValue(obj, original) {
    if (obj && (typeof obj === 'object') && (obj instanceof bbnData)) {
      return obj[original ? 'data' : 'value'];
    }

    return obj;
  }

  /**
   * Returns the bbnData object from a value
   * @param {Object} value 
   * @returns {bbnData|null}
   */
  static getObject(value) {
    if (value && (typeof value === 'object') && value.__bbnData) {
      return bbn.cp.dataInventory.get(value.__bbnData);
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
    if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor) && !value.__bbnNoData) {
      if (value.__bbnData) {
        if (!bbn.cp.dataInventory.has(value.__bbnData)) {
          throw new Error(bbn._("The data inventory does not contain the data object"));
        }

        const dataObj = bbn.cp.dataInventory.get(value.__bbnData);
        if (!parent) {
          dataObj.addComponent(component, path);
        }

        return dataObj.value;
      }
      if (value._bbnComponent) {
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
      const targetObj = bbnData.getObject(target);
      const len = target.length;
      if (len) {
        const subObj = bbnData.getObject(target[len - 1]);
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
      const targetObj = bbnData.getObject(target);
      if (target.length) {
        const subObj = bbnData.getObject(target[0]);
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
  static proxyPush(target, component, path) {
    return (...args) => {
      // The bbnData object of the target array
      const targetObj = bbnData.getObject(target);
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = bbnData.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });
      const res = targetObj.data.push(...newArgs);
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
  static proxyUnshift(target, component, path) {
    return (...args) => {
      // The bbnData object of the target array
      const targetObj = bbnData.getObject(target);
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = bbnData.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });
      const res = targetObj.data.unshift(...newArgs);
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      if (dataObj) {
        //bbn.fn.log("UNSHIFT");
        dataObj.update();
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
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      if (dataObj) {
        dataObj.update();
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
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      if (dataObj) {
        //bbn.fn.log("SORT");
        dataObj.update();
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
  static proxySplice(target, component, path) {
    return (index, numDelete, ...args) => {
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = bbnData.treatValue(a, component, idx, dataObj);
        newArgs.push(newVal);
      });

      for (let i = index; i < index + numDelete; i++) {
        let subObj = bbnData.getObject(target[i]);
        if (subObj) {
          subObj.unset();
        }
      }

      const res = target.splice(index, numDelete, ...newArgs);
      if (dataObj) {
        //bbn.fn.log("SPLICE");
        dataObj.update();
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
    return {
      get(target, key) {
        const realValue = target[key];
        if (key === '__bbnData') {
          return realValue;
        }
        if (key === '__bbnProxy') {
          return true;
        }

        if (bbn.fn.isFunction(realValue)) {
          if (targetObj && targetObj.isArray && bbn.fn.isString(key)) {
            const fnName = bbn.fn.camelize('proxy-' + key);
            if (bbn.fn.isFunction(bbnData[fnName])) {
              return bbnData[fnName](target, component, path);
            }

            return target[key];
          }
        }
        else if (realValue) {
          const val = bbnData.treatValue(realValue, component, key, targetObj);
          return val;
        }

        return realValue;
      },
      set(target, key, value) {
        const oldValue = target[key];
        const oldObj = bbnData.getObject(oldValue);
        let mod = false;
        if (oldObj && !oldObj.isSame(value)) {
          bbn.fn.log(["UNSET", oldValue, value]);
          oldObj.unset();
          mod = true;
        }
        else if (!oldObj && !bbn.fn.isSame(oldValue, value)) {
          mod = true;
        }

        if (mod) {
          const newVal = bbnData.treatValue(value, component, key, targetObj);
          target[key] = newVal;
          const dataObj = bbnData.getObject(newVal);
          if (dataObj) {
            //bbn.fn.log(["SET", dataObj, key, diff, newVal, oldValue, target, '------']);
            dataObj.update();
          }
        }

        return true;
      },
      defineProperty(target, key, description) {
        const oldValue = target[key];
        const oldObj = bbnData.getObject(oldValue);
        if (oldObj) {
          oldObj.unset();
        }
        if (description.value) {
          description.value = bbnData.treatValue(description.value, component, key, targetObj);
        }
        Object.defineProperty(target, key, description);
        if (targetObj) {
          targetObj.update();
        }
        else {
          bbn.fn.log(target, key, description);
          bbn.fn.warning("Impossible to get the target object");
        }
        return true;
      },
      deleteProperty(target, key) {
        const dataObj = bbnData.getObject(target[key]);
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
      throw new Error("bbnData cannot be initialized with a bbnData");
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
      writable: false,
      configurable: false,
      value: path
    });

    /**
     * @var {bbnCp} root The root component of the bbnData object, ie the original component for which the bbnData is created
     */
    Object.defineProperty(this, 'root', {
      writable: false,
      configurable: false,
      value: parent?.root || component
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
     * @var {Proxy} value The proxy of the data object
     */
    Object.defineProperty(this, 'value', {
      value: new Proxy(this.data, bbnData.getProxyHandler(component, path, this)),
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
    if (!this.parent || !this.parent.hasComponent(component)) {
      this.components[component.$cid] = {
        component,
        path
      };
      component.$values.push(this.id);
    }

    // If the object has a parent, the current object is added to the parent's children
    if (this.parent) {
      this.parent.children.push(this);
    }

    // The object is added to the data inventory
    bbn.cp.dataInventory.set(id, this);
  }

  // Returns the full path of a data object in a component
  fullPath(component) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData must be initialized with a bbn component");
    }

    let dataObj = this;
    const paths = [];
    if (!this.parent && (this.root === component)) {
      return this.path;
    }
    while (dataObj) {
      if (dataObj.components[component.$cid]) {
        paths.unshift(dataObj.components[component.$cid].path);
        break;
      }
      else {
        paths.unshift(dataObj.path);
      }

      dataObj = dataObj.parent;
    }

    return paths.join('.');
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
      return obj === this.value;
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
    if (this.path == 3) {
      bbn.fn.log("UNSET", this);
      console.trace();
      alert("KKK");
    }
    const id = this.id;
    // Unsetting the children
    bbn.fn.each(this.children, subObj => {
      subObj.unset(true);
    });
    // Unsetting the data in each component but the root
    bbn.fn.iterate(this.components, (it, cid) => {
      const cp = it.component;
      if (cp) {
        // Root will be taken care of later
        if (!this.parent && (cp === this.root)) {
          return;
        }
        
        let idx = cp.$values.indexOf(id);
        if (idx > -1) {
          cp.$values.splice(idx, 1);
        }
        else if (cp.$isInit) {
          bbn.fn.log(this, it);
          throw new Error(bbn._("Impossible to find the data object in the values of the component %s with CID %s", cp.$options.name, cid));
        }
        
        //cp.$tick();
      }
      else {
        throw new Error(bbn._("Impossible to find the component %s", cid));
      }
    });
    
    // Unsetting the data in the root component
    if (!this.parent && this.root) {
      let idx = this.root.$values.indexOf(id);
      if (idx > -1) {
        this.root.$values.splice(idx, 1);
      }
      else {
        bbn.fn.log(this);
        throw new Error(bbn._("Impossible to find the data object in the values of the component %s", dataObj.root.$options.name));
      }
      this.root.$tick();
    }
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
        bbn.fn.iterate(dataObj.components, it => {
          //it.component.$tick();
        });
      }
    }

    delete this.data.__bbnData;
    bbn.cp.dataInventory.delete(id);
  }

  /**
   * Adds a component to the original bbnData object linked to it
   * @param {bbnCp} component 
   * @param {String} path 
   * @returns {Boolean}
   */
  addComponent(component, path) {
    if (!(component instanceof bbnCp)) {
      throw new Error(bbn._("bbnData hasComponent must be called with a bbn component"));
    }

    if (!this.hasComponent(component)) {
      this.components[component.$cid] = {
        component,
        path
      };
      if (!component.$values.includes(this.id)) {
        component.$values.push(this.id);
        return true;
      }
    }

    
    return false;
  }

  /**
   * 
   * @param {bbnCp} component 
   * @returns 
   */
  hasComponent(component) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData hasComponent must be called with a bbn component");
    }

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
  removeComponent(component) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData hasComponent must be called with a bbn component");
    }

    if (!this.components[component.$cid]) {
      throw new Error("The component is not in the list of components");
    }

    if (component === this.root) {
      //bbn.fn.log("UNSETTING");
      this.unset();
    }
    else {
      let idx = component.$values.indexOf(this.id);
      if (idx > -1) {
        component.$values.splice(idx, 1);
      }

      delete this.components[component.$cid];
    }
  }

  /**
   * Update all the components linked to the data object
   * @param {Boolean} deep 
   */
  update(noParent) {
    if (this.updater) {
      clearTimeout(this.updater);
    }

    this.updater = setTimeout(() => {
      let data = this;
      let lev = 0;
      /*
      if (data.root) {
        bbn.fn.log(["UPDATEBBNDATA", data.root, data]);
      }
      */
      while (data) {
        bbn.fn.iterate(data.components, (it, cid) => {
          if (!it?.component) {
            throw new Error(bbn._("Impossible to find the component %s", cid));
          }

          if (it.component.$isInit) {
            let name = this.fullPath(it.component);
            let bits = name.split('.');
            /*
            if (!noParent) {
              bbn.fn.log(['ON UPDATE', this, name, it.path, lev]);
            }
            */

            while (bits.length && !it.component.$watcher?.[name]?.handler) {
              bits.pop();
              name = bits.join('.');
            }

            if (it.component.$watcher?.[name]?.handler) {
              let oldV = it.component.$watcher[name].value;
              let v = bbn.fn.getProperty(it.component, name);
              if (it.component.$isMounted && (!lev || it.component.$watcher[name].deep) ) {
                //bbn.fn.log(["WATCHER: " + name, oldV, v, it.component, '---']);
                if (bbnData.hash(v) !== it.component.$watcher[name].hash) {
                  if (!bbn.fn.isFunction(it.component.$watcher[name].handler)) {
                    throw new Error(bbn._("Watchers must be function, wrong parameter for %s", name));
                  }
                  it.component.$watcher[name].hash = bbnData.hash(v);
                  it.component.$watcher[name].value = v;
                  it.component.$watcher[name].num++;
                  it.component.$watcher[name].handler.apply(this, [v, oldV]);
                }
              }
              else {
                it.component.$watcher[name].hash = bbnData.hash(v);
                it.component.$watcher[name].value = v;
              }
            }

            /*
            name = paths.join(".");
            if (name && (subpathDone.indexOf(name) === -1)) {
              subpathDone.push(name);
              const prop = bbn.fn.getProperty(this.root, name);
              const dataObj = bbnData.getObject(prop);
              if (dataObj) {
                //dataObj.updateComponents(true);
              }
            }
            */

            //bbn.fn.log(["TICK", it.component]);
            //it.component.$tick()
          }
        });


        if (!lev) {
          this.updateChildren();
          if (noParent) {
            return;
          }
        }

        data = data.parent;
        lev++;
      }
    }, 1)

  }

  updateChildren() {
    if (this.children.length) {
      bbn.fn.each(this.children, obj => {
        obj.update(true);
      });
    }
  }

}
