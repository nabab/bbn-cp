class bbnData {

  static hash(v) {
    let hash = v;
    if (v && (typeof v === 'object') && [Array, Object, undefined].includes(v.constructor)) {
      hash = bbn.fn.hash(v);
    }

    return hash;
  }

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

  static getValue(obj, original) {
    if (obj && (typeof obj === 'object') && (obj instanceof bbnData)) {
      return obj[original ? 'data' : 'value'];
    }

    return obj;
  }

  static getObject(value) {
    if (value && (typeof value === 'object') && value.__bbnData) {
      return bbn.cp.dataInventory.get(value.__bbnData);
    }

    return null;
  }

  static treatValue(value, component, path, parent) {
    if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor) && !value.__bbnNoData) {
      if (value.__bbnData) {
        if (!bbn.cp.dataInventory.has(value.__bbnData)) {
          throw new Error(bbn._("The data inventory does not contain the data object"));
        }

        const dataObj = bbn.cp.dataInventory.get(value.__bbnData);
        dataObj.addComponent(component, path);
        return dataObj.value;
      }

      const dataObj = new bbnData(value, component, path, parent);
      return dataObj.value;
    }

    return value;
  }

  static proxyPop(target, component, path) {
    return () => {
      const targetObj = bbnData.getObject(target);
      const len = target.length;
      if (len) {
        const subObj = bbnData.getObject(target[len - 1]);
        if (subObj) {
          subObj.unset();
        }
      }
      const res = target.pop();
      targetObj.update(path);
      return res;
    };
  }

  static proxyShift(target, component, path) {
    return () => {
      const targetObj = bbnData.getObject(target);
      if (target.length) {
        const subObj = bbnData.getObject(target[0]);
        if (subObj) {
          subObj.unset();
        }
      }
      const res = target.shift();
      targetObj.update(path);
      return res;
    };
  }

  static proxyPush(target, component, path) {
    const targetObj = bbnData.getObject(target);
    return (...args) => {
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = bbnData.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });
      const res = target.push(...newArgs);
      targetObj.update(path);
      return res;
    };
  }

  static proxyUnshift(target, component, path) {
    const targetObj = bbnData.getObject(target);
    return (...args) => {
      let newArgs = [];
      bbn.fn.each(args, (a, i) => {
        const idx = target.length + i;
        const newVal = bbnData.treatValue(a, component, idx, targetObj);
        newArgs.push(newVal);
      });
      const res = target.unshift(...newArgs);
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      dataObj.update(path);
      return res;
    };
  }

  static proxyReverse(target, component, path) {
    return (...args) => {
      const res = target.reverse(...args);
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      dataObj.update(path);
      return res;
    };

  }

  static proxySort(target, component, path) {
    return (...args) => {
      const res = target.sort(...args);
      const dataObj = bbn.cp.dataInventory.get(target.__bbnData);
      dataObj.update();
      return res;
    };
  }

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
      dataObj.update(path);
      return res;
    };
  }


  static getProxyHandler(component, path, targetObj) {
    return {
      get(target, key) {
        const realValue = target[key];
        if (key === '__bbnData') {
          return realValue;
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
        if (!bbn.fn.isSame(target[key], value)) {
          const oldValue = target[key];
          const oldObj = bbnData.getObject(oldValue);
          if (oldObj) {
            oldObj.unset();
          }
          const newVal = bbnData.treatValue(value, component, key, targetObj);
          target[key] = newVal;
          const dataObj = bbnData.getObject(newVal);
          targetObj.update();
          // bbn.fn.log("SET", target, key, value, oldValue, targetObj, dataObj, '------');
          if (dataObj) {
            dataObj.update();
          }
        }

        return true;
      },
      defineProperty(target, key, description) {
        const targetObj = bbnData.getObject(target);
        const oldValue = target[key];
        const oldObj = bbnData.getObject(oldValue);
        if (oldObj) {
          oldObj.unset();
        }
        if (description.value) {
          description.value = bbnData.treatValue(description.value, component, key, targetObj);
        }
        Object.defineProperty(target, key, description);
        targetObj.update();
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

  constructor(data, component, path, parent) {
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

    Object.defineProperty(this, 'id', {
      writable: false,
      configurable: false,
      value: Symbol()
    });

    Object.defineProperty(this, 'path', {
      writable: false,
      configurable: false,
      value: path
    });

    Object.defineProperty(this, 'root', {
      value: component,
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'parent', {
      value: parent || null,
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, 'children', {
      value: [],
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'root', {
      value: component,
      writable: false,
      configurable: false
    });

    Object.defineProperty(data, '__bbnData', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: this.id
    });

    Object.defineProperty(this, 'data', {
      value: data,
      writable: false,
      configurable: true
    });

    Object.defineProperty(this, 'value', {
      value: new Proxy(this.data, bbnData.getProxyHandler(component, path, this)),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, 'isArray', {
      value: data instanceof Array,
      writable: false,
      configurable: true
    });

    Object.defineProperty(this, 'old', {
      value: bbn.fn.hash(data),
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, 'components', {
      value: this.parent ? null : bbn.fn.createObject({
        [component.$cid]: [path]
      }),
      writable: false,
      configurable: false
    });

    if (this.parent) {
      this.parent.children.push(this);
    }
    else {
      component.$values.push(this.id);
    }

    bbn.cp.dataInventory.set(this.id, this);
  }

  rootData() {
    let obj = this;
    while (obj.parent) {
      obj = obj.parent;
    }
    return obj;
  }

  unset() {
    const dataObj = this;
    if (dataObj) {
      bbn.fn.each(dataObj.children, subObj => {
        subObj.unset();
      });
      const id = dataObj.id;
      const rootData = dataObj.rootData();
      if (!dataObj.parent) {
        bbn.fn.iterate(rootData.components, (paths, cid) => {
          const cp = bbn.cp.getComponent(cid)?.bbn;
          if (cp) {
            if (cp === dataObj.root) {
              return;
            }

            let idx = cp.$values.indexOf(id);
            if (idx > -1) {
              cp.$values.splice(idx, 1);
            }
            else {
              throw new Error(bbn._("Impossible to find the data object in the values of the component %s with CID %s", cp.$options.name, cid));
            }

            cp.$tick();
          }
          else {
            throw new Error(bbn._("Impossible to find the component %s", cid));
          }
          delete dataObj.rootData().components[cid];
        });

        let idx = dataObj.root.$values.indexOf(id);
        if (idx > -1) {
          dataObj.root.$values.splice(idx, 1);
        }
        else {
          bbn.fn.log(dataObj);
          throw new Error(bbn._("Impossible to find the data object in the values of the component %s", dataObj.root.$options.name));
        }
        
      }

      bbn.cp.dataInventory.delete(id);
      delete dataObj.data.__bbnData;
      dataObj.root.$tick();
    }
  }

  addComponent(component) {
    if (!(component instanceof bbnCp)) {
      throw new Error(bbn._("bbnData hasComponent must be called with a bbn component"));
    }

    const rootData = this.rootData();

    if (!rootData.components[component.$cid]) {
      rootData.components[component.$cid] = component;
    }

    if (!component.$values.includes(rootData.id)) {
      component.$values.push(rootData.id);
    }
    
    return false;
  }

  hasComponent(component) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData hasComponent must be called with a bbn component");
    }

    const rootData = this.rootData();
    return rootData.components[component.$cid] !== undefined;
  }

  removeComponent(component) {
    if (!(component instanceof bbnCp)) {
      throw new Error("bbnData hasComponent must be called with a bbn component");
    }

    const rootData = this.rootData();
    if (!rootData.components[component.$cid]) {
      throw new Error("The component is not in the list of components");
    }

    if (component === rootData.root) {
      this.unset();
    }
    else {
      let idx = component.$values.indexOf(this.id);
      if (idx > -1) {
        component.$values.splice(idx, 1);
      }
      delete rootData.components[component.$cid];
    }

    component.$tick();
  }

  updateComponents(deep) {
    const rootData = this.rootData();
    bbn.fn.iterate(rootData.components, (component, cid) => {
      if (!component) {
        throw new Error(bbn._("Impossible to find the component %s", cid));
      }

      if (component.$isInit) {
        const subpathDone = [];
        const paths = [this.path];
        let data = this;
        while (data.parent) {
          paths.unshift(data.path);
          data = data.parent;
        }
        let name = paths.join(".");
        if (component.$watcher?.[name]?.handler) {
          if (component.$watcher[name] && (!deep || component.$watcher[name].deep)) {
            if (!bbn.fn.isFunction(component.$watcher[name].handler)) {
              throw new Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
            }
            let oldV = component.$watcher[name].value;
            let v = bbn.fn.getProperty(this, name);
            component.$watcher[name].value = v;
            component.$watcher[name].handler.apply(this, [v, oldV]);
          }
        }

        paths.pop();
        name = paths.join(".");
        if (name && (subpathDone.indexOf(name) === -1)) {
          subpathDone.push(name);
          const prop = bbn.fn.getProperty(this.root, name);
          const dataObj = bbnData.getObject(prop);
          if (dataObj) {
            dataObj.updateComponents(true);
          }
        }

        component.$tick()
      }
    });
  }


  update() {
    const hash = bbn.fn.hash(this.data);
    if (hash !== this.old) {
      this.old = hash;
    }
    this.updateComponents(); 
    /*
    if (this.$isInit) {
      if (this.$watcher?.[name]?.handler) {
        if (!bbn.fn.isFunction(this.$watcher[name].handler)) {
          throw new Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
        }
        this.$watcher[name].value = v;
        this.$watcher[name].handler.apply(this, [v, oldV]);
      }

      this.$tick();
    }

    this.root.$tick();
    bbn.fn.iterate(this.rootData().components, (cp, cid) => {
      if (!cp) {
        throw new Error(bbn._("Impossible to find the component %s", cid));
      }

      cp.$tick()
    });
    */
  }

}