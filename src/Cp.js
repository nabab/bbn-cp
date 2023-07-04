(() => {
  const sc = document.createElement('script');
  sc.setAttribute('type', 'text/javascript');
  sc.innerHTML = `
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


class bbnCp {

  constructor(el) {
    // Setting up basic props
    Object.defineProperty(this, '$el', {
      value: el,
      writable: false,
      configurable: false
    });
  }

  /**
   * Adds or updates the given element to the $elements object property
   * 
   * @param {Symbol} id The ID of the element, based on the template
   * @param {HTMLElement, Text} ele The HTML element to be added
   * @param {String} hash The loop hash if any
   * @param {Number} index The loop index if any
   * @returns {undefined}
   */
  $addToElements(ele) {
    bbn.fn.checkType(ele, [HTMLElement, Text, Comment, SVGElement], "Elements should be HTML elements or text nodes");
    bbn.fn.checkType(ele.bbnId, ['string', 'symbol'], "In addToElements the ID should be a symbol");
    const id = ele.bbnId;
    const hash = ele.bbnHash;
    const origin = ele.bbnComponentId;
    let cp = this;
    if (origin !== this.$cid) {
      cp = bbn.cp.getComponent(origin).bbn;
    }

    if (hash) {
      if (!cp.$elements[id]) {
        cp.$elements[id] = bbn.fn.createObject();
      }

      if (cp.$elements[id][hash] && (cp.$elements[id][hash] !== ele)) {
        cp.$removeDOM(cp.$elements[id][hash]);
        cp.$elements[id][hash] = ele;
      }
      else if (cp.$elements[id][hash] !== ele) {
        cp.$elements[id][hash] = ele;
      }
    }
    else {
      if (cp.$elements[id] && (cp.$elements[id] !== ele)) {
        cp.$removeDOM(cp.$elements[id]);
        cp.$elements[id] = ele;
      }
      else if (cp.$elements[id] !== ele) {
        cp.$elements[id] = ele;
      }
    }
  }


  /**
   * Reacts to change of attributes by emitting an update event
   * 
   * @todo The event updated shouldn't be here but during DOM creation process
   * @param {String} name The attribute's name
   * @param {String} oldValue The attribute's old value
   * @param {String} newValue The attribute's new value
   * @returns {undefined}
   */
  $attributeChange(name, oldValue, newValue) {
    /*
    const realName = name.indexOf(':') === 0 ? name.substr(1) : name;

    bbn.fn.log("ATTR------------>")
    if (this.$acceptedAttributes.includes(realName)) {
      this.bbn.$attr[name] = newValue;
      this.bbn.$setProp(name, newValue);
      if (this.bbn.$isMounted) {
        this.bbn.$tick();
        const updated = new Event('updated');
        this.bbn.$onUpdated();
        this.dispatchEvent(updated);
      }
    }
    */
  }


  /**
   * Starts everything up when the component enters the DOM
   * - Adds itself tyo the global static 'components'
   * - Sets up the props
   * - Triggers beforecreate
   * - Sets $parent
   * - Launches $addToElements in order to add the element to the $elements property
   * - Sets $root
   * - Adds namespaces for computed and methods
   * - Sets up the properties based on attributes
   * - Sets up the data
   * - Triggers created
   * - Creates the DOM
   * - Triggers beforemount
   * - Sets $isInit to true
   * - Triggers mounted
   * - Sets $isMOunted to true
   * - Starts tick interval
   * 
   * @returns {undefined}
   */
  $connectedCallback() {
    // Check we are in the DOm
    //bbn.fn.warning("CALLBACK ON " + this.$options.name + " / " + this.$el.bbnSchema.id + " INIT: " + this.$isInit + " MOUNTED: " + this.$isMounted);
    if (!this.$el.isConnected || bbn.cp.getComponent(this.$el.bbnCid)) {
      bbn.fn.log("CONNECTED CALLBACK: not connected or already initialized", this.$el.isConnected, bbn.cp.getComponent(this.$el.bbnCid));
      return;
    }
    if (this.$isInit) {
      bbn.fn.log("WTF " + this.constructor.name);
      throw new Error("WTF " + this.constructor.name);
    }

    this.$init();
    // Adding itself to the global static #components
    bbn.cp.addComponent(this.$el);

    // Setting up $parent prop
    const parentNode = this.$el.parentNode;
    // host is for shadow DOM (not used)
    const parent = parentNode.host ? parentNode.host.closest(".bbn-component") : parentNode.closest(".bbn-component");
    /*
    const cpSource = bbn.cp.getComponent(this.$el.bbnComponentId);
    if (cpSource?.bbn && !cpSource.bbn.$retrieveElement(this.$el.bbnId)) {
      cpSource.$addToElements(this.$el);
    }
    */

    // $parent will always remain the same, it should only be null for root
    Object.defineProperty(this, '$parent', {
      value: parent ? parent.bbn : null,
      writable: false,
      configurable: false
    });
    /**
     * The highest component in the document's hierarchy
     */
    Object.defineProperty(this, '$root', {
      value: this.$parent?.$root || this,
      writable: false,
      configurable: false
    });
    
    /*
    Object.defineProperty(this, '$queue', {
      value: this.$root === this ? [] : this.$root.$queue,
      writable: false,
      configurable: false
    });
    */
    Object.defineProperty(this, '$queue', {
      value: [],
      writable: false,
      configurable: false
    });

    if (this === this.$root) {
      this.$fetchTimeout = null;
      Object.defineProperty(this, '$unknownComponents', {
        value: [],
        writable: false,
        configurable: false
      });
    }
    Object.defineProperty(this, '$fetchComponents', {
      value: async function() {
        if (this.$root.$unknownComponents.length) {
          let unknown = this.$root.$unknownComponents.splice(0, this.$root.$unknownComponents.length);
          return await bbn.cp.fetchComponents(unknown);
        }

        return false;
      },
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, '$addUnknownComponent', {
      value: function(name) {
        if ((name.indexOf('-') > 0) && !bbn.cp.known.includes(name) && !this.$root.$unknownComponents.includes(name)) {
          this.$root.$unknownComponents.push(name);
          return true;
          /*
          if (this.$root.$fetchTimeout) {
            clearTimeout(this.$root.$fetchTimeout);
          }
          this.$root.$fetchTimeout = setTimeout(() => {
            this.$root.$fetchComponents();
          }, 25);
          */
        }
        return false;
      },
      writable: false,
      configurable: false
    });
    /**
     * The highest component in the doocument's hierarchy
     */
    Object.defineProperty(this, '$attrMap', {
      value: bbn.fn.clone(this.$el.bbnMap || this.$el.constructor.bbnMap),
      writable: false,
      configurable: false
    });
    Object.defineProperty(this, '$currentMap', {
      configurable: true,
      writable: true,
      value: bbn.fn.clone(this.$el.bbnMap || this.$cls.bbnMap)
    });
    Object.defineProperty(this, '$currentResult', {
      configurable: false,
      writable: false,
      value: bbn.fn.createObject({_num: 0})
    });
    Object.defineProperty(this, '$schema', {
      configurable: false,
      writable: false,
      value: []
    });
    /**
     * The latest timestamp of the last update launch
     */
    Object.defineProperty(this, '$lastLaunch', {
      value: 0,
      writable: true
    });

    // An anon component won't have props nor this method
    /** @todo check if the above assertion is true (source?) */
    this.$setUpProps();

    // Sending beforeCreate event
    const beforeCreate = new Event('hook:beforecreate');
    this.$onBeforeCreate();
    this.$el.dispatchEvent(beforeCreate);

    // Setting up the config
    const cfg = this.$cfg;
    // Setting up the namespace for the methods
    if (cfg.methods) {
      bbn.fn.each(Object.keys(cfg.methods), n => this.$addNamespace(n, 'method'));
    }
    // Setting up the namespace for the computed
    if (cfg.computed) {
      bbn.fn.each(Object.keys(cfg.computed), n => this.$addNamespace(n, 'computed'));
    }

    // Setting up data
    if (this.$cfg.data) {
      // Proper to the specific private class: sets all the datasource
      Object.defineProperty(this, '$dataSource', {
        writable: false,
        configurable: false,
        value: this.$cfg.data
      });
      // Setting up all the data properties
      this.$updateData();
    }

    // Generates the evaluator function, will happen only once
    if (!this.$el.bbnEval && !this.$el.constructor.bbnEval) {
      // The template is not a one-shot (it is defined in the constructor)
      if (!this.$el.bbnTpl) {
        // The function has never been generated for this component
        if (!this.$el.constructor.bbnEval) {
          // Generating
          const stFn = bbn.cp.templateToFunction(this, this.$el.constructor.bbnTpl);
          if (!stFn) {
            throw new Error(bbn._("Impossible to create the template evaluator"));
          }
          // Setting in component's constructor
          this.$el.constructor.prototype.bbnEval = stFn;
        }
      }
      // The template is a one-shot, bbnAnon
      else {
        // Generating
        const stFn = bbn.cp.templateToFunction(this, this.$el.bbnTpl);
        if (!stFn) {
          throw new Error(bbn._("Impossible to create the template evaluator"));
        }
        // Setting in component's property
        Object.defineProperty(this.$el, 'bbnEval', {
          value: eval(stFn),
          writable: false,
          configurable: false
        });
      }
    }

    // Setting $eval with the retrived/generated function
    Object.defineProperty(this, '$eval', {
      value: this.$el.bbnEval || this.$el.constructor.bbnEval,
      writable: false,
      configurable: false
    });


    // Sending created event
    const created = new Event('hook:created');
    this.$onCreated();
    this.$el.dispatchEvent(created);
    Object.defineProperty(this, '$isCreated', {
      value: true,
      writable: false, 
      configurable: false
    });

    // Sets the current template schema and creates the DOM
    this.$updateComponent().then(() => {
      // Not going on if the element disappeared
      if (!this.$el.isConnected) {
        return;
      }

      // registering current object to parent and setting root
      if (this.$parent) {
        this.$parent.$registerChild(this);
      }

      // Sending beforeMount event
      const beforeMount = new Event('hook:beforemount');
      this.$onBeforeMount();
      this.$el.dispatchEvent(beforeMount);

      // $isInit, defined in constructor  is made writable before being set to true
      Object.defineProperty(this, '$isInit', {
        value: true,
        writable: false,
        configurable: true
      });

      // Sending mounted event
      const mounted = new Event('hook:mounted');
      this.$onMounted();
      this.$el.dispatchEvent(mounted);
      Object.defineProperty(this, '$isMounted', {
        value: true,
        writable: false, 
        configurable: false
      });

      this.$start();

    });
  }


  $start() {
    /*
    if (this !== this.$root) {
      return;
    }
    */

    if (this.$interval) {
      throw new Error(bbn._("The component %s is already started", this.$options.name));
    }

    Object.defineProperty(this, '$interval', {
      value: setInterval(
        () => this.$launchQueue(),
        bbn.cp.tickDelay
      ),
      writable: false,
      configurable: true
    });
  }


  $stop() {
    if (this !== this.$root) {
      return;
    }

    if (!this.$interval) {
      throw new Error(bbn._("The component %s is not started", this.$options.name));
    }

    clearInterval(this.$interval);
    Object.defineProperty(this, '$interval', {
      value: null,
      writable: false,
      configurable: true
    });
  }


  /**
   * Creates an element in the given target
   * @param {HTMLElement} d 
   * @param {HTMLElement} target 
   * @returns 
   */
  async $createElement(node, target, before, loopInfo) {
    const d = node;
    // Components have an hyphen
    let isComponent = this.$isComponent(d);
    /** @constant {Array} todo A list of function to apply once the element will ne created */
    const todo = [];
    /** @constant {bbnComponentFunction} cpSource */
    const cpSource = node.componentId ? bbn.cp.getComponent(node.componentId)?.bbn : this;
    const oldEle = cpSource.$retrieveElement(d.id, d.loopHash);
    let replace = false;
    let ele;
    if (oldEle) {
      const isComment = bbn.fn.isComment(oldEle);
      if (
        (oldEle !== this.$el)
        && (
          (!!d.comment !== isComment)
          || (
            !isComment
            && d.tag
            && !bbn.cp.isTag(d.tag, oldEle)
          )
        )
      ) {
        //bbn.fn.log("REPLACING " + d.id, isComment, d, oldEle);
        replace = true;
      }
      else {
        ele = oldEle;
      }
    }

    /** @todo check todo */
    let tag = d.tag;
    let originalTag = d.tag;
    if (tag && this.$cfg.componentNames[tag]) {
      tag = this.$cfg.componentNames[tag];
      isComponent = true;
    }
    /** 
     * @todo Add the possibility to change the tag using Customized built-in elements 
     * See createElement
     */
    if (isComponent) {
      if (this.$addUnknownComponent(tag)) {
        await this.$fetchComponents(tag);
      }
      if (bbn.cp.statics[tag]?.tag) {
        originalTag = tag;
        tag = bbn.cp.statics[originalTag].tag;
      }
    }

    if (!oldEle || replace) {
      if (d.comment) {
        ele = document.createComment(" ***_BBN_*** ");
      }
      else if (tag === 'svg') {
        ele = document.createElementNS("http://www.w3.org/2000/svg", tag);
        ele.innerHTML = d.content;
      }
      else {
        /** 
         * @todo Add the possibility to change the tag using Customized built-in elements 
         * See createElement
         */
        if (isComponent) {
          if (replace && oldEle?.tagName && (tag === oldEle.tagName.toLowerCase())) {
            replace = false;
          }
        }

        /** @constant {HTMLElement} ele */
        const constructorArgs = [tag];
        if (originalTag !== tag) {
          constructorArgs.push({
            is: originalTag
          });
        }
        ele = document.createElement(...constructorArgs);
        if (originalTag !== tag) {
          ele.setAttribute('is', originalTag);
        }
        if (tag === 'bbn-anon') {
          if (d.cfg){
            if (d.cfg.mixins && d.cfg.mixins.indexOf(bbn.cp.mixins.basic) === -1) {
              d.cfg.mixins.push(bbn.cp.mixins.basic);
            }
            Object.defineProperty(ele, 'bbnCfg', {
              value: d.cfg,
              writable: false,
              configurable: false
            });
            if (d.cfg.template) {
              const tmp = bbn.cp.stringToTemplate(d.cfg.template, true);
              Object.defineProperty(ele, 'bbnTpl', {
                value: tmp.res,
                writable: false,
                configurable: false
              });
              Object.defineProperty(ele, 'bbnMap', {
                value: tmp.map,
                writable: false,
                configurable: false
              });
              Object.defineProperty(ele, 'bbnInlineTemplates', {
                value: tmp.inlineTemplates,
                writable: false,
                configurable: false
              });
            }
          }
        }
      }

      // Giving to all elements property bbnId
      Object.defineProperty(ele, 'bbnId', {
        value: d.id,
        writable: false,
        configurable: false
      });

      // Outer schema of the component, with the slots
      Object.defineProperty(ele, 'bbnSchema', {
        value: d,
        writable: true,
        configurable: true
      });

      Object.defineProperty(ele, 'bbnComponentId', {
        value: cpSource.$cid,
        writable: false,
        configurable: false
      });

      if (loopInfo) {
        Object.defineProperty(ele, 'bbnLoopVars', {
          value: loopInfo,
          writable: false,
          configurable: false
        });
      }

      if (d.loopHash) {
        Object.defineProperty(ele, 'bbnHash', {
          value: d.loopHash,
          writable: false,
          configurable: false
        });
        Object.defineProperty(ele, 'bbnIndex', {
          value: d.loopIndex,
          writable: false,
          configurable: false
        });
      }
      if (isComponent) {
        // Outer schema of the component, with the slots
        Object.defineProperty(ele, 'bbnRealSlots', {
          value: tag === 'bbn-anon' ? bbn.cp.retrieveSlots(ele.bbnTpl || d.items) : bbn.fn.clone(ele.constructor.bbnSlots),
          writable: false,
          configurable: false
        });
        // Outer schema of the component, with the slots
        Object.defineProperty(ele, 'bbnSlots', {
          get() {
            return this.bbnRealSlots;
          }
        });

        // Outer schema of the component, with the slots
        Object.defineProperty(ele, 'bbnModels', {
          value: tag === 'bbn-anon' ? bbn.cp.retrieveModels(ele.bbnTpl || d.items) : bbn.fn.clone(ele.constructor.bbnModels),
          writable: false,
          configurable: false
        });

      }
    }
    else {
      ele = oldEle;
      if (!bbn.fn.isSame(ele.bbnSchema.props,  d.props)) {
        ele.bbnSchema = d;
        if (isComponent && ele.bbn && ele.bbn.$isMounted) {
          ele.bbn.$tick();
        }
      }
    }

    if (!d.comment) {
      cpSource.$updateElementFromProps(d, ele);

      if (d.pre) {
        ele.innerHTML = d.pre;
      }

    }

    if (oldEle && !replace) {
      if (!d.comment && d.directives) {
        bbn.cp.updateDirectives(d.directives, ele);
      }
      return oldEle;
    }

    if (target !== this.$el) {
      this.$insertElement(ele, target, before, oldEle);
    }
    else {
      this.$addToElements(ele);
    }

    if (!d.comment && d.directives) {
      bbn.cp.insertDirectives(d.directives, ele);
    }

    return ele;
  }


  /**
   * Creates an element in the given target
   * @param {HTMLElement} d 
   * @param {HTMLElement} target 
   * @returns 
   */
  $createText(d, target, loopInfo) {
    const ele = document.createTextNode(d.text);
    bbn.fn.checkType(d.id, String, "Boo");
    Object.defineProperty(ele, 'bbnId', {
      value: d.id,
      writable: false,
      configurable: false
    });
    Object.defineProperty(ele, 'bbnComponentId', {
      value: this.$cid,
      writable: false,
      configurable: false
    });

    if (loopInfo) {
      Object.defineProperty(ele, 'bbnLoopVars', {
        value: loopInfo,
        writable: false,
        configurable: false
      });
    }

    if (d.loopHash) {
      Object.defineProperty(ele, 'bbnHash', {
        value: d.loopHash,
        writable: false,
        configurable: false
      });
      Object.defineProperty(ele, 'bbnIndex', {
        value: d.loopIndex,
        writable: false,
        configurable: false
      });
    }

    this.$addToElements(ele);

    if (bbn.cp.isComponent(target)) {
      target.bbnSlots.default.push(ele);
    }
    else if (target !== this.$el) {
      target.appendChild(ele);
    }

    return ele;
  }


  /**
   * Shuts everything down
   * @returns 
   */
  $disconnectedCallback() {
    //bbn.fn.log("Before disconnected callback from " + this.$el.tagName + ' / ' + this.$el.bbnSchema.id);
    if (!this.$el.isConnected) {
      bbn.fn.log("Disconnected callback from " + this.$el.tagName);
      // Sending beforeDestroy event
      const beforeDestroy = new Event('beforedestroy');
      this.$onBeforeDestroy();
      this.$el.dispatchEvent(beforeDestroy);
      
      // Sending destroyed event through a timeout
      setTimeout(() => {
        const destroyed = new Event('destroyed');
        this.$onDestroyed();
        this.$el.dispatchEvent(destroyed);
      });
      // Deleting from elements prop
      while (this.$values.length) {
        let id = this.$values[this.$values.length -1];
        const data = bbn.cp.dataInventory.get(id);
        if (!data) {
          throw new Error(bbn._("Impossible to find a piece of data in %s", this.$options.name));
        }
        else {
          //bbn.fn.log('Removing data for ' + this.$cid + ' in ' + this.$options.name + ' / path: ' + data.path[0]);
          data.removeComponent(this);
        }
      }
      bbn.cp.removeComponent(this.$el.bbnCid);
      this.$el.childNodes.forEach(node => {
        this.$removeDOM(node);
      });
      this.$removeFromElements(this.$el.bbnId, this.$el.bbnHash);
      // Setting back $isinit
      Object.defineProperty(this, '$isInit', {
        value: false,
        writable: false,
        configurable: true
      });
    }
  }


  /**
   * Starts everything up
   * @returns 
   */
  $init(el) {
    if (Object.hasOwn(this, '$isInit')) {
      return;
    }
    /**
     * Constructor of the BBNComponentObject
     * 
     * @param {[HTMLElement]} el Always attached to an HTML component
     * @param {Number} id Comes from the template
     */

    /**
     * A reference to the component Object (this)
     */
    Object.defineProperty(this, '_self', {
      confifurable: false,
      writable: false,
      value: this.$el.bbn
    });


    // This will hold all the reactive data
    Object.defineProperty(this, '$values', {
      value: [],
      writable: false,
      configurable: false
    });

    // This will become true after all is mounted
    Object.defineProperty(this, '$isInit', {
      value: false,
      writable: false,
      configurable: true
    });

    // This will become true after the data functions are launched and the data is set
    Object.defineProperty(this, '$isDataSet', {
      value: false,
      writable: false,
      configurable: true
    });

    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$isCreating', {
      value: false,
      writable: true,
      configurable: true
    });

    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$isUpdating', {
      value: null,
      writable: true,
      configurable: true
    });

    Object.defineProperty(this, '$isCreated', {
      value: false,
      writable: true, 
      configurable: true
    });

    Object.defineProperty(this, '$isMounted', {
      value: false,
      writable: true, 
      configurable: true
    });

    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$isUpdatingComputed', {
      value: false,
      writable: true,
      configurable: true
    });
    // This will be true during the construction process (updateComponent)
    Object.defineProperty(this, '$tagUsed', {
      value: [],
      writable: false,
      configurable: true
    });


    /**
     * Object of all the instance properties available directly in the HTML templates.
     * Indexed by name, the value being the type (data, prop, method, computed)
     * @return {Object}
     */
    Object.defineProperty(this, '$namespaces', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    /**
     * Component configuration object
     */
    Object.defineProperty(this, '$cfg', {
      value: this.$el.bbnCfg || this.$el.constructor.bbnCfg,
      writable: false,
      configurable: false
    });

    /**
     * Template array
     */
    Object.defineProperty(this, '$tpl', {
      value: this.$el.bbnTpl || this.$el.constructor.bbnTpl,
      writable: false,
      configurable: false
    });

    const _t = this;

    Object.defineProperty(this.$options, 'propsData', {
      get() {
        return _t.$el.bbnSchema?.props || {};
      }
    });

    Object.defineProperty(this, '$props', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    /**
     * Object of all available slots nodes in the template.
     * Indexed by name with id as value
     */
    Object.defineProperty(this, '$availableSlots', {
      get() {
        return this.$el.bbnSlots || bbnHTML.availableSlots;
      }
    });

    /**
     * Is true if is creating or updating
     */
    Object.defineProperty(this, '$isBusy', {
      get() {
        return this.$isCreating || this.$isUpdating;
      }
    });

    /**
     * Object of all available slots nodes in the template.
     * Indexed by name with id as value
     */
    Object.defineProperty(this, '$hash', {
      get() {
        return this.$el?.bbnHash || '';
      }
    });

    /**
     * Object of all elements with bbn-model prop.
     * Indexed by element's id with bbn-model's value as value
     */
    Object.defineProperty(this, '$dataModels', {
      get() {
        return this.$el.bbnModels || this.$el.constructor.bbnModels;
      }
    });

    /**
     * Object of all elements with bbn-model prop.
     * Indexed by element's id with bbn-model's value as value
     */
    Object.defineProperty(this, '$computed', {
      value: bbn.fn.createObject()
    });

    // Setting $eval with the retrived/generated function
    Object.defineProperty(this, '$oldValues', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });


    Object.defineProperty(this, '$watcher', {
      value: bbn.fn.createObject(),
      writable: false
    });

    bbn.fn.iterate(this.$cfg.watch, (a, name) => {
      this.$watch(name, a);
    });

    /**
     * Object referencing all the content for each available slot.
     * Indexed by slot's name (default is default), it contains an array of nodes which are the content
     * @return {Object}
     */
    Object.defineProperty(this, '$slots', {
      get() {
        return this.$el.bbnSlots;
      }
    });

    /**
     * The ID of the component, corresponding ot its ID in the template.
     * Components inside a loop have all the same id
     */
    Object.defineProperty(this, '$id', {
      value: this.$el.bbnId,
      writable: false,
      configurable: false
    });

    /**
     * Unique ID for each component, used for global registration
     */
    Object.defineProperty(this, '$cid', {
      value: this.$el.bbnCid,
      writable: false,
      configurable: false
    });

    /**
     * Unique ID for each component, used for global registration
     */
    Object.defineProperty(this, '$cls', {
      value: this.$el.constructor,
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, '$attr', {
      value: bbn.fn.getAttributes(this.$el),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, '$events', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

      /**
     * Array of bbnComponentObject instances direct descendants of the current one
     * @return {Array}
     */
    Object.defineProperty(this, '$children', {
      value: [],
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, '$elements', {
      value: bbn.fn.createObject({
        '-': this.$el
      }),
      writable: false,
      configurable: false
    });

    /** @var {Object} $dataValues The content of the data */
    Object.defineProperty(this, '$dataValues', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    Object.defineProperty(this, '$refsElements', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });

    /**
     * Counts the number of times the component has been repainted through the method updateComponent
     */
    Object.defineProperty(this, '$numBuild', {
      value: 0,
      writable: true,
      configurable: true
    });

    //Object.defineProperty
    //this.$event = null;
    //this.$cls = this.$el.constructor;
    /**
     * Object referencing all the elements with ref prop
     * Indexed by name, value being the bbnComponentObject if it's a component a HTMLElement otherwise
     * @return {Object}
     */
    Object.defineProperty(this, '$refs', {
      configurable: false,
      writable: false,
      value: new Proxy(this.$refsElements, {
        get(target, propName) {
          let tmp = target[propName];
          if (tmp) {
            if (bbn.fn.isArray(tmp)) {
              return tmp.filter(a => a.isConnected)
                        .map(a => a.bbn || a);
            }
    
            return tmp.isConnected ? (tmp.bbn || tmp) : null;
          }
        }
      })
    });
  
    // Setting up available props for HTML templates
    this.$addNamespace('$props', 'internal');
    this.$addNamespace('$el', 'internal');
    this.$addNamespace('$root', 'internal');
    this.$addNamespace('$attr', 'internal');
    this.$addNamespace('$event', 'internal');
    this.$addNamespace('$parent', 'internal');
    this.$addNamespace('$options', 'internal');
    this.$addNamespace('$namespaces', 'internal');
    this.$addNamespace('$children', 'internal');
    this.$addNamespace('$refs', 'internal');
    this.$addNamespace('$slots', 'internal');
    this.$addNamespace('$isCreated', 'internal');
    this.$addNamespace('$isMounted', 'internal');
    this.$addNamespace('_self', 'internal');
    this.$addNamespace('_', 'method');
    this.$addNamespace('$emit', 'method');
    this.$addNamespace('$is', 'method');
    this.$addNamespace('$isComponent', 'method');
    this.$addNamespace('$nextTick', 'method');
    this.$addNamespace('$off', 'method');
    this.$addNamespace('$on', 'method');
    this.$addNamespace('$once', 'method');
    this.$addNamespace('$retrieveComponent', 'method');
    this.$addNamespace('$retrieveElement', 'method');
    this.$addNamespace('ancestors', 'method');
    this.$addNamespace('closest', 'method');
    this.$addNamespace('extend', 'method');
    this.$addNamespace('find', 'method');
    this.$addNamespace('findAll', 'method');
    this.$addNamespace('findAllByKey', 'method');
    this.$addNamespace('findByKey', 'method');
    this.$addNamespace('getChildByKey', 'method');
    this.$addNamespace('getComponentName', 'method');
    this.$addNamespace('getComponents', 'method');
    this.$addNamespace('getRef', 'method');
    bbn.fn.iterate(bbnCp.prototype, (a, n) => {
      if (bbn.fn.isFunction(a)) {
        this.$addNamespace(n, 'method');
      }
    });
  }


  /**
   * Creates an element in the given target
   * @param {HTMLElement} d 
   * @param {HTMLElement} target 
   * @returns 
   */
  $insertElement(ele, target, before, oldEle) {
    if ((ele.tagName === 'BBN-PORTAL') && (ele.bbnId === '0-2')) {
      bbn.fn.log(["INSERTING", ele, target, before, oldEle]);
    }
    bbn.fn.checkType(target, HTMLElement, "The $insert function should have an HTMLElement as target");

    const d = ele.bbnSchema;

    //bbn.fn.checkType(ele, HTMLElement);
    const isParentComponent = (target !== this.$el) && bbn.cp.isComponent(target);
    let replace = false;
    const isComment = bbn.fn.isComment(ele);
    if (oldEle) {
      const isOldComment = bbn.fn.isComment(oldEle);
      if (
        (oldEle !== this.$el)
        && (
          (isOldComment !== isComment)
          || (
            !isOldComment
            && d.tag
            && !bbn.cp.isTag(d.tag, oldEle)
          )
        )
      ) {
        replace = true;
      }
      else {
        ele = oldEle;
      }
    }

    if (replace) {
      //bbn.fn.log("REPLACE", ele);
      if (isParentComponent && !ele.bbnSchema.comment) {
        //bbn.fn.log("IN CP " + target.tagName, ele);
        const slot = ele.getAttribute("slot") || 'default';
        if (target.bbnSlots?.[slot]) {
          let search = {bbnId: oldEle.bbnId};
          if (oldEle.bbnHash) {
            search.bbnHash = oldEle.bbnHash;
          }
          let idx = bbn.fn.search(target.bbnSlots[slot], search);
          if (idx > -1) {
            /*
            const mounted = !!target.bbnSlots[slot][idx].parentNode;
            if (mounted) {
              oldEle.parentNode.replaceChild(ele, oldEle);
            }
            */

            target.bbnSlots[slot].splice(idx, 1, ele);
          }
        }
      }
      else {
        if (oldEle.parentNode) {
          try {
            target.replaceChild(ele, oldEle);
          }
          catch (e) {
            bbn.fn.log("ERROR IN REPLACE", e, ele, oldEle);
          }
        }
        else {
          try {
            target.appendChild(ele);
          }
          catch (e) {
            bbn.fn.log("ERROR IN APPEND", e, ele, oldEle);
          }
        }
      }

      this.$addToElements(ele);
    }
    else if (oldEle !== ele) {
      //bbn.fn.log("INSERT", oldEle, ele);
      if (isParentComponent) {
        const slot = ele.bbnSchema.props?.slot || 'default';
        if (target.bbnSlots?.[slot]) {

          let search = {bbnId: ele.bbnId};
          if (ele.bbnHash) {
            search.bbnHash = ele.bbnHash;
          }

          let idx = bbn.fn.search(target.bbnSlots[slot], search);
          if (idx > -1) {
            const mounted = !!target.bbnSlots[slot][idx].parentNode;
            if (mounted) {
              target.bbnSlots[slot][idx].parentNode.replaceChild(ele, target.bbnSlots[slot][idx]);
            }

            target.bbnSlots[slot].splice(idx, 1, ele);
          }
          else {
            target.bbnSlots[slot].push(ele);
          }
          this.$addToElements(ele);
        }
      }
      else {
        if (before) {
          target.insertBefore(ele, before);
        }
        else {
          target.appendChild(ele);
        }

        this.$addToElements(ele);
      }
    }
  }


  $updateProps() {
    bbn.fn.each(this.$namespaces, (a, n) => {
      if (a === 'props') {
        this.$getProp(n);
      }
    });
  }


  /**
   * Launches the updateComponent function and triggers the queue's functions.
   * 
   * @param {Boolean} force If true and the queue is empty, it will be filled with an empty array
   * @returns {undefined}
   */
  /*
  async $launchQueue(force) {
    let row = bbn.fn.getRow(this.$queue, {cp: this});
    if (force && !row) {
      row = {cp: this, fns: [], force};
      this.$queue.push(row);
    }
    else if (force && row && !row.force) {
      row.force = true;
    }

    if (this !== this.$root) {
      const res = await this.$root.$launchQueue();
      return res;
    }

    const time = bbn.fn.timestamp();
    if (this.$queue.length) {
      //bbn.fn.log(bbn._("LAUNCHING QUEUE WITH %d items in %s", this.$queue.length, this.$queue.map(a => a.cp.$options.name).join(", ")));
      this.$lastLaunch = time;
      const queue = this.$queue.splice(0, this.$queue.length);
      let isTime;
      for (let i = 0; i < queue.length; i++) {
        if (!queue[i].cp.$isMounted) {
          continue;
        }

        if (queue[i].force || (time - queue[i].cp.$lastLaunch > bbn.cp.tickDelay)) {
          await queue[i].cp.$updateComponent();
          queue[i].fns.forEach(fn => {
            bbn.fn.log([queue[i].cp, queue[i].force]);
            return fn.bind(queue[i].cp)()
          });
        }
        else {
          //this.$queue.push(queue[i]);
        }
      }
    }
    else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, bbn.cp.tickDelay);
      });
    }

  }
  */
  async $launchQueue(force) {
    if (force && !this.$queue.length) {
      this.$queue.push([]);
    }


    const time = bbn.fn.timestamp();
    if (this.$queue.length && (force || (time - this.$lastLaunch >= bbn.cp.tickDelay))) {
      this.$lastLaunch = time;
      const last = this.$queue.shift();
      return this.$updateComponent().then(() => {
        last.forEach(fn => fn.bind(this)());
      });
    }

    /*
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
    */
  }


  /**
   * Remove an element from the DOM
   * @param {HTMLElement} ele
   */
  $removeDOM(ele) {
    //bbn.fn.log("REMOVING " + ele.bbnId);
    const id = ele.bbnId;
    const hash = ele.bbnHash;
    const cpSource = ele.bbnComponentId && (ele.bbnComponentId !== this.$cid) ? bbn.cp.getComponent(ele.bbnComponentId).bbn : this;
    // It won't have an ID if it's a bbn-text or bbn-html
    if (id) {
      if (ele.bbnSlots) {
        bbn.fn.iterate(ele.bbnSlots, slot => {
          bbn.fn.each(slot, o => {
            //bbn.fn.log("REMOVE FROM SLOT", o);
            let cp = o.bbnComponentId !== this.$cid ? bbn.cp.getComponent(o.bbnComponentId).bbn : this;
            cp.$removeDOM(o);
          });
        });
      }

      if (ele.childNodes && !ele.bbnSchema?.props?.['bbn-text'] && !ele.bbnSchema?.props?.['bbn-html'] && (ele.bbnSchema?.tag !== 'svg')) {
        bbn.fn.each(Array.from(ele.childNodes), (node, i) => {
          let cp = ele.bbnComponentId !== this.$cid ? bbn.cp.getComponent(ele.bbnComponentId).bbn : this;
          cp.$removeDOM(node);
        });
      }

      cpSource.$removeFromElements(id, hash);
    }
    else {
      bbn.fn.log("Impossible to remove element without ID", ele);
    }

    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
    else {
      //bbn.fn.log("Can't find ", ele)
    }
  }


  /**
   * Adds or updates the given element to the $elements object property
   * 
   * @param {Symbol} id The ID of the element, based on the template
   * @param {HTMLElement, Text} ele The HTML element to be added
   * @param {String} hash The loop hash if any
   * @param {Number} index The loop index if any
   * @returns {undefined}
   */
  $removeFromElements(id, hash) {
    bbn.fn.checkType(id, ['string', 'symbol'], "In removeFromElements the ID should be a symbol");
    if (hash) {
      const row = this.$elements[id];
      if (row) {
        delete this.$elements[id][hash];
      }
      else{
        bbn.fn.log(["HASH BUT NO ROW IN " + this.$options.name, id, hash, this.$elements[id]]);
      }
    }
    else {
      delete this.$elements[id];
    }
  }


  $retrieveElement(id, hash, index = -1, loopObj) {
    let res = this.$elements[id] || null;
    if (res && hash) {
      return res[hash] || null;
    }

    return res;
  }


  /**
   * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
   * - Updates the component element based on its own schema ($el.bbnSchema)
   * - Updates the schema
   * - Generates/update the DOM when needed
   * 
   * @param {Boolean} shadow The content will go to the shadow DOM if true
   * @returns {Promise}
   */
  async $updateComponent(shadow) {
    if (!this.$isCreated) {
      return;
    }

    if (this.$isUpdating === null) {
      Object.defineProperty(this, '$isCreating', {
        writable: false,
        configurable: true,
        value: true
      });
    }
    else if (this.$isUpdating) {
      return;
    }
    else {
      this.$isUpdating = true;
    }

    // The HTML component's root in the DOM
    let root = this.$el;
    if (shadow) {
      root = this.$el.attachShadow({ mode: "open" });
    }

    const t1 = (new Date()).getTime();
    this.$updateProps();
    this.$updateAllComputed();
    const e = await this.$eval(this);
    const t2 = (new Date()).getTime();
    this.$numBuild++;
    if (this.$isCreating) {
      Object.defineProperty(this, '$isCreating', {
        writable: false,
        configurable: false,
        value: false
      });
      this.$emit('domcreated');
    }

    this.$isUpdating = false;
  }

  $isComponent(node) {
    if (node.tag && this.$cfg.componentNames[node.tag]) {
      return true;
    }

    return bbn.cp.isComponent(node);
  }


  /**
   * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
   * - Updates the component element based on its own schema ($el.bbnSchema)
   * - Updates the schema
   * - Generates/update the DOM when needed
   * 
   * @param {Boolean} shadow The content will go to the shadow DOM if true
   * @returns {Promise}
   */
  $updateElementFromProps(node, ele) {
    if (node.comment) {
      return;
    }

    /** @constant {Object} props */
    const props = node.props || bbn.fn.createObject();
    /** @constant {Boolean} isComponent */
    const isComponent = this.$isComponent(node);
    /** @constant {bbnComponentObject} cpSource */
    const cpSource = this;//node.componentId ? bbn.cp.getComponent(node.componentId)?.bbn : this;
    if (!cpSource) {
      bbn.fn.log(node, bbn.cp.getComponent(node.componentId));
      bbn.fn.warning("The component source is not defined");
      return;
    }
    /** @var {Object} attr The attributes of the element to be built */
    const attr = bbn.fn.createObject();
    let isChanged = false;
    // Other normal props are prioritarian
    for (let n in props) {
      switch (n) {
        case 'ref':
          bbn.fn.checkType(props.ref, 'string', bbn._("Refs must be strings in %s", this.$options.name));
          cpSource.$setRef(props.ref, ele);
          break;
        case 'class':
          if (!isComponent && (ele !== this.$el)) {
            if (ele.className !== props['class']) {
              ele.className = props['class'];
            }
          }
          break;
        case 'style':
          if (!isComponent && (ele !== this.$el)) {
            if (props.style !== ele.style.cssText) {
              ele.style.cssText = bbn.cp.convertStyles(props.style);
            }
          }
          break;
        default:
          if (n.indexOf('bbn-') !== 0) {
            attr[n] = props[n];
          }
      }
    }

    if (Object.hasOwn(props, 'bbn-show')) {
      if (props['bbn-show'] && (ele.style.display === 'none')) {
        ele.style.removeProperty('display');
      }
      else if (!props['bbn-show']) {
        ele.style.display = 'none';
      }
    }

    if (node.model) {
      for (let n in node.model) {
        let isC = false;
        if (isComponent) {
          if (Object.hasOwn(ele.bbnSchema.props || {}, n) && (ele.bbnSchema.props?.[n] !== node.model[n].value)) {
            ele.bbnSchema.props[n] = node.model[n].value;
            isChanged = true;
            isC = true;
          }
        }
        else if ((ele[n] !== undefined) && (ele[n] !== node.model[n].value)) {
          isChanged = true;
          isC = true;
          ele[n] = node.model[n].value;
        }
        /*
        if (isC) {
          bbn.fn.iterate(this.$dataModels, (id, exp) => {
            if (exp === node.model[n].exp) {
              if (node.id === id) {
                return false;
              }
              const twinModelEle = this.$retrieveElenment(id, node.loopHash);
              if (twinModelEle) {
                twinModelEle[n] = node.model[n].value;
              }
            }
          })
        }
        */
      }
    }
    else if (Object.hasOwn(props, 'bbn-html') && (ele.innerHTML !== props['bbn-html'])) {
      ele.innerHTML = props['bbn-html'];
      isChanged = true;
    }
    else if (Object.hasOwn(props, 'bbn-text') && (ele.innerText !== props['bbn-text'])) {
      ele.innerText = props['bbn-text'];
      isChanged = true;
    }

    // Setting up attributes
    bbn.fn.iterate(attr, (value, name) => {
      if (!isComponent) {
        if (bbn.fn.isString(value)) {
          let propName = name;
          if (bbn.cp.badCaseAttributes[name]) {
            propName = bbn.cp.badCaseAttributes[name];
          }

          const isAttr = (ele[propName] !== undefined) && bbn.fn.isPrimitive(this.$el[propName]);
          if (isAttr) {
            const attr = ele[propName];
            if (attr !== value) {
              if (!value) {
                ele.removeAttribute(name);
              }
              else {
                ele.setAttribute(name, value);
              }
            }
          }
        }
      }
      else if (ele.bbnSchema.props[name] !== value) {
        ele.bbnSchema.props[name] = value;
        if (ele.bbn?.$isInit) {
          ele.bbn.$setProp(name, value);
        }

        isChanged = true;
      }
    });
    

    if (isChanged) {
      if (isComponent && ele.bbn?.$isMounted) {
        ele.bbn.$forceUpdate();
      }
    }
  }


  /**
   * Sets the props and attributes of the component element based on its combined schema
   * 
   * @returns {undefined}
   */
  $updateFromSchema(props) {
    if (this.$el.bbnSchema) {
      //bbn.fn.warning("updateFromSchema " + this.$options.name);
      // The classes on the component itself are only generated once 
      // Concatenating classes from the attributes and from componentClass
      const cls = ['bbn-component'];
      if (this.componentClass) {
        cls.push(this.componentClass);
      }
      if (props?.class) {
        cls.push(props.class);
      }
      if (this.$el.bbnSchema.props?.class) {
        cls.push(this.$el.bbnSchema.props.class);
      }

      let textCls = bbn.cp.convertClasses(cls);

      if (this.$el.className !== textCls) {
        // Converting to string
        this.$el.className = textCls;
      }
      //bbn.fn.log("PUTTING CLASSES " + textCls);

      let stl = [this.$el.bbnSchema.props?.style || ''];
      stl.push(this.$attr.style || '');
      if (props?.style) {
        stl.push(props.style);
      }

      if ((props?.['bbn-show'] !== undefined)) {
        stl.push({display: props['bbn-show'] ? 'block' : 'none'});
      }

      stl = bbn.cp.convertStyles(stl);
      if (stl) {
        this.$el.style.cssText = bbn.cp.convertStyles(stl);
      }
      for (let n in props) {
        if (!['class', 'style'].includes(n)) {
          if (Object.hasOwn(this.$props, n)) {
            this.$setProp(n, props[n]);
          }
          else if (this.$el[n] !== undefined) {
            this.$el[n] = bbn.fn.isString(props[n]) ? props[n] : props[n]?.toString() || '';
          }
        }
      }
    }
  }


  /**
   * Set the watcher for the given property.
   * 
   * @param {Number} index The loop index if any
   * @returns {undefined}
   */
  $watch(name, a) {
    if (this.$watcher) {
      const bits = name.split('.');
      const realName = bits.shift();
      const tmp = this.$watcher[realName] || bbn.fn.createObject();
      if (bits.length) {
        while (bits.length) {
          let n = bits.shift();
          if (!tmp.props) {
            tmp.props = bbn.fn.createObject();
          }
          tmp.props[n] = bbn.fn.createObject();
          if (!bits.length) {
            tmp.props[n].handler = bbn.fn.isFunction(a) ? a : a.handler;
            tmp.props[n].immediate = a.immediate || false;
            tmp.props[n].deep = a.deep || false;
            tmp.props[n].value = undefined;
          }
          else {
            tmp = tmp.props[n];
          }
        }
      }
      else {
        tmp.handler = (bbn.fn.isFunction(a) ? a : a.handler).bind(this);
        tmp.immediate = a.immediate || false;
        tmp.deep = a.deep || false;
        tmp.value = undefined;
      }

      if (!this.$watcher[name]) {
        this.$watcher[name] = tmp;
      }

      // Returns a function to cancel the watcher
      return () => {
        delete this.$watcher[name];
      }
    }
  }


  $setRef(ref, ele) {
    if (this.$refsElements[ref] && (this.$refsElements[ref] !== ele)) {
      if (!bbn.fn.isArray(this.$refsElements[ref])) {
        if (!this.$refsElements[ref].isConnected) {
          this.$refsElements[ref] = ele;
        }
        else {
          this.$refsElements[ref] = [this.$refsElements[ref]]
        }
      }
      if (bbn.fn.isArray(this.$refsElements[ref])) {
        this.$refsElements[ref].push(ele);
      }
    }
    else {
      this.$refsElements[ref] = ele;
    }
  }

  $makeReactive(obj) {
    return obj;
    //const cp = this;
    //return bbn.fn.makeReactive(obj, () => cp.$tick(), cp);
  }


  $setUpData(name, value) {
    if (!Object.hasOwn(this, name)) {
      this.$dataValues[name] = bbnData.treatValue(value, this, name);
      const def = {
        get() {
          return this.$dataValues[name];
        },
        set(v) {
          if (this.$dataValues[name] !== v) {
            let isMod = true;
            const oldV = this.$dataValues[name];
            //bbn.fn.log("SETTING " + name + " in " + this.$options.name, oldV, v);
            let oldDataObj = bbnData.getObject(this.$dataValues[name]);
            if (oldDataObj) {
              if (bbn.fn.isSame(oldV, v)) {
                isMod = false;
              }
              else {
                bbn.fn.log(["REMOVING COMPONENT", this, oldV, v]);
                oldDataObj.removeComponent(this);
              }
            }

            if (isMod) {
              const newVal = bbnData.treatValue(v, this, name);
              const dataObj = bbnData.getObject(newVal);
              this.$dataValues[name] = newVal;
              if (this.$isInit) {
                if (this.$watcher?.[name]?.handler) {
                  if (!bbn.fn.isFunction(this.$watcher[name].handler)) {
                    throw new Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
                  }
                  this.$watcher[name].value = v;
                  this.$watcher[name].handler.apply(this, [v, oldV]);
                }

                //bbn.fn.log("TICKING FOR", name);
                this.$tick();
              }
            }
          }
        }
      };
      Object.defineProperty(this, name, def);
      this.$addNamespace(name, 'data');
      if (this.$isMounted) {
        this.$tick();
      }
    }
  }


  /**
  * Set the data properties of the object
  */
  $setData(name, value) {
    if (!Object.hasOwn(this, name)) {
      return this.$setUpData(name, value);
    }
    if (this[name] !== value) {
      this[name] = value;
    }
  }

  $setUpProp(name, cfg) {
    name = bbn.fn.camelize(name);
    if (Object.hasOwn(this.$cfg.props, name)) {
      if (!Object.hasOwn(this.$props, name)) {
        Object.defineProperty(this.$props, name, {
          value: undefined,
          writable: false,
          configurable: true
        });
      }

      this.$addNamespace(name, 'props');
    }

    const value = this.$checkPropValue(name, cfg);
    const isDefined = value !== undefined;
    if (isDefined) {
      this.$realSetProp(name, value);
    }
  }


  $getProp(name) {
    if (Object.hasOwn(this.$el.bbnSchema.props || {}, name) && (this.$el.bbnSchema.props[name] !== this.$props[name])) {
      this.$setProp(name, this.$el.bbnSchema.props[name]);
    }
    let v = bbnData.getValue(this.$props[name]);
    /*
    if (!bbn.fn.isPrimitive(v) && (typeof v === 'object') && [Array, Object, undefined].includes(v.constructor)) {
      const hash = bbn.fn.hash(v);
      if (this.$oldValues[name] !== hash) {
        if (this.$isInit) {
          if (this.$watcher?.[name]?.handler) {
            if (!bbn.fn.isFunction(this.$watcher[name].handler)) {
              throw new Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
            }
            this.$watcher[name].value = v;
            const oldV = bbn.fn.isPrimitive(v) ? hash : v;
            this.$watcher[name].handler.apply(this, [v, oldV]);
          }

          this.$oldValues[name] = hash;
          this.$tick();
        }
      }
    }
    */

    return v;
  }


  /**
   * Set properties of the initial component to the new web-component
   */
  $setProp(name, value) {
    name = bbn.fn.camelize(name);
    const cfg = this.$cfg.props[name];
    /*
    if (bbn.cp.possibleAttributes.includes(name)) {
      return;
    }
    */

    if (!this.$el.constructor.bbnFn.$acceptedAttributes.includes(name) && (name.indexOf('bbn') !== 0)) {
      bbn.fn.warning(bbn._("The attribute %s in %s is not a property", name, this.$options.name));
      return;
    }

    if (!Object.hasOwn(this.$props, name)) {
      //bbn.fn.warning(bbn._("The attribute %s in %s is not defined", name, this.$options.name));
      return;
    }


    let v = this.$checkPropValue(name, cfg, value);
    if (v === this[name]) {
      return;
    }
    this.$realSetProp(name, v);
  }


  $realSetProp(name, value) {
    name = bbn.fn.camelize(name);
    const original = this.$props[name];
    if (!bbn.fn.isSame(value, original)) {
      const oldObj = bbnData.getObject(original);
      if (oldObj) {
        oldObj.unset();
      }
    }
    else {
      return;
    }

    const newValue = bbnData.treatValue(value, this, name);
    const dataObj = bbnData.getObject(newValue);
    Object.defineProperty(this.$props, name, {
      value: newValue,
      writable: false,
      configurable: true
    });

    if (this.$isInit && this.$watcher?.[name]) {
      this.$watcher[name].handler.apply(this, [newValue, original]);
    }

    if (this.$isMounted) {
      this.$emit('propchange', name, newValue, original);
      //bbn.fn.log(["EMITTING PROPCHANGE", this.$options.name, this.$cid, name, newValue, original, hash, oldHash, JSON.stringify(value)]);
    }
  }


  $checkPropValue(name, cfg, value) {
    if (!cfg) {
      throw new Error(bbn._("The property %s is not defined in component %s", name, this.$options.name));
    }

    let isDefined = Object.hasOwn(this.$options.propsData, name) && (this.$options.propsData[name] !== undefined);
    let v = undefined;
    if (value !== undefined) {
      v = value;
      isDefined = true;
    }
    else if (isDefined) {
      v = this.$options.propsData[name];
    }
    if (!this.$numBuild && !isDefined && (cfg.default !== undefined)) {
      if (bbn.fn.isObject(cfg.default) || bbn.fn.isArray(cfg.default)) {
        throw new Error(bbn._("A function must be used to return object default values in %s", name));
      }

      v = bbn.fn.isFunction(cfg.default) ? cfg.default() : cfg.default;
      isDefined = true;
    }

    if (cfg.required && (!isDefined || [null, undefined, ''].includes(v))) {
      throw new Error(bbn._("The property %s is required in component %s", name, this.$options.name));
    }

    if (cfg.type && isDefined && ![null, undefined, ''].includes(v)) {
      bbn.fn.checkType(v, cfg.type, bbn._("Wrong type for %s in component %s", name, this.$options.name));
    }

    if (isDefined && bbn.fn.isFunction(cfg.validator) && !cfg.validator(v)) {
      throw new Error(bbn._("The property %s is invalid", name));
    }

    return v;
  }


  /**
   * Update the data property with the dataSource Array
   */
  $updateData() {
    if (this.$isDataSet) {
      return;
    }

    if (this.$dataSource.length) {
      let tmp = bbn.fn.createObject(
        bbn.fn.extend(bbn.fn.createObject(), ...this.$dataSource.map(a => a.apply(this)))
      );
      bbn.fn.each(tmp, (v, n) => {
        this.$setData(n, v);
      })
    }

    Object.defineProperty(this, '$isDataSet', {
      value: true,
      writable: false,
      configurable: false
    });
  }

  $updateComputed(name, val) {
    const hash = bbnData.hash(val);
    if (hash !== this.$computed[name].hash) {
      const oldValue = this.$computed[name].val;
      this.$computed[name].old = oldValue;
      this.$computed[name].hash = hash;
      this.$computed[name].num = this.$numBuild;
      //val = bbnData.treatValue(val, this, name);
      this.$computed[name].val = val;
      if (this.$watcher?.[name]) {
        if (this.$watcher[name].handler) {
          //bbn.fn.log(bbn._("Launching watcher for computed %s", name), val, oldValue);
          this.$watcher[name].handler.call(this, val, oldValue);
        }
        if (this.$watcher[name].props) {
          bbn.fn.iterate(this.$watcher[name].props, (a, n) => {
            if (a.handler && !bbn.fn.isSame(val[n], oldValue?.[n])) {
              a.handler.call(this, val[n], oldValue?.[n]);
            }
          });
        }
      }

      this.$tick();
      return true;
    }

    return false;
  }


  $updateAllComputed() {
    this.$isUpdatingComputed = true;
    bbn.fn.iterate(this.$computed, (a, name) => {
      a.update.bind(this)();
    });
    this.$isUpdatingComputed = false;
  }


  $retrieveComponent(id, hash, index = -1, loopObj) {
    const ele = this.$retrieveElement(...arguments);
    return ele?.bbn || null;
  }


  $retrieveLoopObject(id, hash, index = -1) {
    return retrieve(id, hash, index, true);
  }


  /**
   * Register the given child of the component into the $children array
   */
  $registerChild(child) {
    bbn.fn.checkType(child, Object, "The child must be an object");
    this.$children.push(child);
    if (this.onRegisterChild) {
      this.onRegisterChild(child);
    }
  }


  /**
   * Unregister the given child of the component from the $children array
   */
  $unregisterChild(child) {
    let idx = this.$children.indexOf(child);
    if (idx > -1) {
      this.$children.splice(idx, 1);
    }
  }


  $_setInternalResult(_r, _name, _res, _hash) {
    if (!_r[_name]) {
      _r[_name] = bbn.fn.createObject();
    }
    if (!_hash) {
      _hash = '_root';
    }
    // If not set it's new
    if (!_r[_name][_hash]) {
      _r[_name][_hash] = bbn.fn.createObject({
        state: 'NEW',
        value: _res,
        elements: []
      });
      _r[_name][_hash].old = bbnData.hash(_r[_name][_hash].value);
    }
    else if (_r[_name][_hash].state === 'DEL') {
      _r[_name][_hash].value = _res;
      _r[_name][_hash].state = 'NEW';
    }
    // If it's a temporary value, we set it
    else if (_r[_name][_hash].state === 'TMP') {
      _r[_name][_hash].value = _res;
      const _o = bbnData.hash(_r[_name][_hash].value);
      if (_r[_name][_hash].old !== _o) {
        _r[_name][_hash].state = 'MOD';
      }
      else {
        _r[_name][_hash].state = 'OK';
      }

      _r[_name][_hash].old = _o;
    }

    return _r[_name][_hash].value;

  }


  $_getInternalState(_r, _name, _hash) {
    if (!_hash) {
      _hash = '_root';
    }
    if (!_r[_name]?.[_hash]) {
      bbn.fn.log("STATE", _r);
      throw new Error(_name + '  ---  ' + _hash + ' are not defined in ' + this.$options.name);
    }
    return _r[_name][_hash].state;
  }


  $_getInternalValue(_r, _name, _hash) {
    if (!_hash) {
      _hash = '_root';
    }
    if (!_r[_name]?.[_hash]) {
      bbn.fn.log("VALUE", _r);
      throw new Error(_name + '  --- ' + _hash + ' are not defined in ' + this.$options.name);
    }

    return _r[_name][_hash].value;
  }


  /**
   * beforeCreate hooks execution
   */
  $onBeforeCreate() {
    if (this.$cfg.beforeCreate) {
      bbn.fn.each(this.$cfg.beforeCreate, fn => {
        fn.bind(this)();
      });
    }
  }

  /**
   * created hooks execution
   */
  $onCreated() {
    if (this.$cfg.created) {
      bbn.fn.each(this.$cfg.created, fn => fn.apply(this));
    }
  }

  /**
   * beforeMount hooks execution
   */
  $onBeforeMount() {
    if (this.$cfg.beforeMount) {
      bbn.fn.each(this.$cfg.beforeMount, fn => fn.apply(this));
    }
  }

  /**
   * mounted hooks execution
   */
  $onMounted() {
    if (this.$cfg.mounted) {
      bbn.fn.each(this.$cfg.mounted, fn => fn.apply(this));
    }
  }

  /**
   * updated hooks execution
   */
  $onUpdated() {
    if (this.$cfg.updated) {
      bbn.fn.each(this.$cfg.updated, fn => fn.apply(this));
    }
  }

  /**
   * beforeDestroy hooks execution
   */
  $onBeforeDestroy() {
    if (this.$cfg.beforeDestroy) {
      bbn.fn.each(this.$cfg.beforeDestroy, fn => fn.apply(this));
    }
  }

  /**
   * destroyed hooks execution
   */
  $onDestroyed() {
    if (this.$cfg.destroyed) {
      bbn.fn.each(this.$cfg.destroyed, fn => fn.apply(this));
    }
  }


  /**
   * Add delay before another function call
   */
  /*
  $tick() {
    return new Promise(resolve => {
      let row = bbn.fn.getRow(this.$queue, {cp: this});
      if (!row) {
        row = {cp: this, fns: []};
        this.$queue.push(row);
      }

      row.fns.push(resolve);
    });
  }
  */
  $tick() {
    return new Promise(resolve => {
      if (!this.$queue.length) {
        this.$queue.push([]);
      }

      this.$queue[0].push(resolve);
    });
  }


  /**
   * Check if there is no conflict between attributes/methods and
   * add list all the public methods and attributes that can be used by the component
   * @param name
   * @param type
   */
  $addNamespace(name, type) {
    if (!type) {
      throw new Error(bbn._("Type must be defined for %s", name));
    }

    if (this.$namespaces[name] && (this.$namespaces[name] !== type)) {
      bbn.fn.log(
        "Component name: " + this.$options.name,
        "Prop name: " + this[name],
        this.$namespaces,
        name
      );
      return;
      throw new Error(bbn._("The name %s in %s is already used by %s in %s", name, type, this.$namespaces[name], this.$options.name));
    }

    this.$namespaces[name] = type;
  }


  $isComponent(node) {
    if (node.tag && this.$options.components?.[node.tag]) {
      return true;
    }

    return bbn.cp.isComponent(node);
  }


  /**
   * Sets the given property on the given object using static method
   * @param {Object} obj 
   * @param {String} prop 
   * @param {*} value 
   * @param {Boolean} writable 
   * @param {Boolean} configurable 
   * @returns 
   */
  $set(obj, prop, value, writable = true, configurable = true) {
    if (bbn.cp.isComponent(obj)) {
      if (!obj.$namespaces[prop]) {
        obj.$setUpData(prop, value);
      }
      else {
        const dataObj = bbnData.treatValue(value, obj, prop);
        if (!bbn.fn.isSame(dataObj, obj[prop])) {
          if (obj.$namespaces[prop] === 'props') {
            obj.$setProp(prop, value);
          }
          else {
            obj[prop] = value;
          }
        }
      }
    }
    else {
      Object.defineProperty(obj, prop, {
        value,
        writable,
        configurable
      });
    }

    return this;
  }


  /**
   * Gets the given property from the given object using static method
   * @param {*} obj 
   * @param {*} prop 
   * @returns 
   */
  $get(obj, prop) {
    return obj[prop];
  }


  /**
   * Deletes the given property from the given object using static method
   * @param {*} obj 
   * @param {*} prop 
   * @returns 
   */
  $delete(obj, prop) {
    return delete obj[prop];
  }


  /*
  $nextTick(fn) {
    return new Promise((resolve) => {
      let row = bbn.fn.getRow(this.$queue, {cp: this});
      if (!row) {
        row = {cp: this, fns: []};
        this.$queue.push(row);
      }

      row.fns.push(fn || resolve);
    });
  }
  */
  $nextTick(fn) {
    return new Promise((resolve) => {
      if (!this.$queue.length) {
        this.$queue.push([]);
      }

      this.$queue[0].push(fn || resolve);
    });
  }

  /**
   * Emits a new event with variable arguments
   */
  $emit(eventName, ...args) {
    bbn.fn.checkType(eventName, String);

    if (bbn.env.loggingLevel > 5) {
      bbn.fn.log(bbn._("Event %s emitted by %s", eventName, this.$options.name));
    }
    /*
    if ((args.length === 1) && (args[0] instanceof Event) && (args[0].type === eventName)) {
      
      this.$el.dispatchEvent(args[0]);
      return;
    }
    */

    let ok = true;
    bbn.fn.each(args, a => {
      if (!bbn.fn.isPrimitive(a)) {
        if ((a instanceof CustomEvent) && a.detail && a.detail.__bbnEvent) {
          ok = false;
          return false;
        }
      }
    });

    if (!ok) {
      return;
    }

    const option = bbn.fn.createObject({
      detail: {
        __bbnEvent: true,
        args: args
      }
    });
    const ev = new CustomEvent(eventName, option);
    this.$el.dispatchEvent(ev);
  }

  /**
   * Sets an event listener for the given event with the given handler on the component's element
   * @param {String} event 
   * @param {Function} handler 
   */
  $on(event, handler, remove, bound) {
    bbn.fn.checkType(event, String, bbn._("Events must be strings for \$on in %s", this.$options.name));
    bbn.fn.checkType(handler, Function, bbn._("Events handlers must be functions for \$on in %s", this.$options.name));
    const fn = bbn.fn.analyzeFunction(handler);
    const hash = bbn.fn.md5((bound || this).$cid + '-' + event + '-' + handler.toString());
    if (!this.$events[event]) {
      this.$events[event] = bbn.fn.createObject();
    }

    if (!remove && this.$events[event][hash]) {
      throw new Error(bbn._("The event %s is already set in %s", event, this.$options.name));
    }

    this.$events[event][hash] = (ev) => {
      const args = [];
      if (ev.detail?.args) {
        args.push(...ev.detail.args);
      }
      else {
        args.push(ev);
      }

      handler.bind(bound || this)(...args);
    }

    const opt = {};
    if (remove) {
      opt.once = true;
    }

    this.$el.addEventListener(event, this.$events[event][hash], opt);
  }


  /**
   * Removes an event listener on the element set with $on
   * @param {String} event 
   * @param {Function} handler 
   */
  $off(event, handler, bound) {
    bbn.fn.checkType(event, String, bbn._("Events must be strings for \$off / %s in %s", event, this.$options.name));
    bbn.fn.checkType(handler, Function, bbn._("Events handlers must be functions for \$off / %s in %s", event, this.$options.name));
    const fn = bbn.fn.analyzeFunction(handler);
    const hash = bbn.fn.md5((bound || this).$cid + '-' + event + '-' + handler.toString());
    if (this.$events[event]?.[hash]) {
      this.$el.removeEventListener(event, this.$events[event][hash]);
      delete this.$events[event][hash];
    }
  }


  /**
   * Sets an event listener for the given event with the given handler on the component's element
   * @param {String} event 
   * @param {Function} handler 
   */
  $once(event, handler) {
    this.$off(event, handler);
    this.$on(event, handler, true);
  }


  /**
   * Forcing executing tick (updateComponent) function by setting this.$tickLast to 0
   */
  $forceUpdate() {
    return this.$launchQueue(true);
    //return this.$updateComponent();
  }


  /**
   * @todo!
   */
  $destroy() {

  }


  /**
   * Return the function bbn._ for the strings' translation.
   * @method _
   * @return {Function}
   */
  _() {
    return bbn._(...arguments);
  }


  /**
  * Returns the given ref (will return $refs[name] or $refs[name][0])
  * @method getRef
  * @param {String} name
  * @fires bbn.cp.getRef
  * @return {Function}
  */
  getRef(name) {
    return bbn.fn.isArray(this.$refs[name]) ? this.$refs[name][0] : this.$refs[name];
  }


  /**
  * Checks if the component corresponds to the selector
  * @method is
  * @fires bbn.cp.is
  * @param {String} selector 
  * @return {Function}
  */
  $is(selector) {
    return this.$el.matches(selector);
  }


  /**
  * Returns the closest component matching the given selector
  * @method closest
  * @param {String} selector
  * @param {Boolean} checkEle
  * @return {Function}
  */
  closest(selector, checkEle) {
    let ele = checkEle ? this.$el : this.$el.parentNode;
    let letters = selector.split('');
    if (!['.', '#', '[', ':'].filter(c => letters.includes(c)).length) {
      selector += ',*[is=' + selector + ']';
    }

    while (ele instanceof HTMLElement) {
      if (ele.matches(selector)) {
        return ele.bbn || ele;
      }
      
      ele = ele.bbnPortal || ele.parentNode || null;
    }
  }


  /**
  * Returns an array of parent components until $root
  * @method ancestors
  * @param {String} selector
  * @param {Boolean} checkEle
  * @return {Function}
  */
  ancestors(selector, checkEle) {
    let res = [];
    let ele = this.closest(selector, checkEle);
    while (ele) {
      res.push(ele);
      ele = ele.closest(selector);
    }

    return res;
  }


  /**
  * Fires the function bbn.cp.getChildByKey.
  * @method getChildByKey
  * @param {String} key
  * @param {String} selector
  * @return {Function}
  */
  getChildByKey(key, selector) {
    //to do?
  }


  /**
  * Fires the function bbn.cp.findByKey.
  * @method findByKey
  * @param {String} key
  * @param {String} selector
  * @param {Array} ar
  * @return {Function}
  */
  findByKey(key, selector, ar) {
    // to do?
  }


  /**
  * Fires the function bbn.cp.findAllByKey.
  * @method findAllByKey
  * @param {String} key
  * @param {String} selector
  * @return {Function}
  */
  findAllByKey(key, selector) {
    // to do?,
  }


  /**
  * Fires the function bbn.cp.find.
  * @method find
  * @param {String} selector
  * @param {Number} index
  * @return {Function}
  */
  find(selector, index) {
    const letters = selector.split('');
    if (!['.', '#', '[', ':'].filter(c => letters.includes(c)).length) {
      selector += ',*[is=' + selector + ']';
    }

    if (index) {
      selector += ':nth-of-type(' + index + ')';
    }

    return this.$el.querySelector(selector)?.bbn;
  }


  /**
  * Fires the function bbn.cp.findAll.
  * @method findAll
  * @param {String} selector 
  * @param {Boolean} only_children 
  * @return {Function}
  */
  findAll(selector, only_children) {
    const letters = selector.split('');
    if (!['.', '#', '[', ':'].filter(c => letters.includes(c)).length) {
      selector += ',*[is=' + selector + ']';
    }

    if (only_children) {
      let res = [];
      Array.from(this.childNodes).forEach(a => {
        if (a.tagName && a.matches(selector)) {
          res.push(a.bbn);
        }
      });
      return res;
    }

    return Array.from(this.$el.querySelectorAll(selector)).map(a => a.bbn);
  }


  /**
  * @method extend
  * @param {Boolean} selector
  * @param {Object} source The object to be extended
  * @param {Object} obj1
  * @return {Object}
  */
  extend(deep, src, obj1) {
    // to do?
  }


  /**
  * Fires the function bbn.cp.getComponents.
  * @method getComponents
  * @param {Array} ar 
  * @param {Boolean} only_children 
  * @return {Function}
  */
  getComponents(ar, only_children) {
    if (only_children) {
      return Array.from(this.childNodes).filter(a => !!a._bbn);
    }
    else {
      return this.querySelectAll('*').filter(a => !!a._bbn);
    }
  }


  /**
   * Returns a component name based on the name of the given component and a path.
   * @method getComponentName
   * @memberof bbn.cp
   */
  getComponentName() {
    return this.$options.name;
  }

}
`;
window.document.head.appendChild(sc);
})();