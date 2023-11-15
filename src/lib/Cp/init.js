import bbnCp from "../Cp.js";

/**
 * Starts everything up
 * @returns 
 */
bbnCp.prototype.$init = function (el) {
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

  Object.defineProperty(this, '$isDestroyed', {
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

  Object.defineProperty(this.$options, 'components', {
    get() {
      return _t.$cfg.components || {};
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
  Object.defineProperty(this, '$origin', {
    value: this.$el.bbnComponentId && (this.$el.bbnComponentId !== this.$cid) ? bbn.cp.getComponent(this.$el.bbnComponentId)?.bbn || this : this,
    writable: false,
    configurable: false
  });

  /**
   * Object of DOM building functions indexed on the template ids
   */
  Object.defineProperty(this, '$fns', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });

  /**
   * The class constructor
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
  
  Object.defineProperty(this, '$queue', {
    value: this.$root === this ? [] : this.$root.$queue,
    writable: false,
    configurable: false
  });
  /*
  Object.defineProperty(this, '$queue', {
    value: [],
    writable: false,
    configurable: false
  });
  */

  if (this === this.$root) {
    this.$fetchTimeout = null;
    Object.defineProperty(this, '$unknownComponents', {
      value: [],
      writable: false,
      configurable: false
    });
  }
  Object.defineProperty(this, '$currentMap', {
    get() {
      return this.$el.bbnMap || this.$cls.bbnMap;
    }
  });
  Object.defineProperty(this, '$currentResult', {
    configurable: false,
    writable: false,
    value: bbn.fn.createObject()
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