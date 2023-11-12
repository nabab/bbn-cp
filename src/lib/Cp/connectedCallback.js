import bbnCp from "../Cp.js";

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

bbnCp.prototype.$connectedCallback = async function () {
  // Check we are in the DOm
  //bbn.fn.warning("CALLBACK ON " + this.$options.name + " / " + this.$el.bbnSchema.id + " INIT: " + this.$isInit + " MOUNTED: " + this.$isMounted);
  if (!this.$el.isConnected) {
    bbn.fn.log("CONNECTED CALLBACK: not connected or already initialized", this.$el.isConnected, bbn.cp.getComponent(this.$el.bbnCid));
    return;
  }
  if (this.$isInit) {
    bbn.fn.log("WTF " + this.constructor.name);
    throw new Error("WTF " + this.constructor.name);
  }

  this.$init();

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
  Object.defineProperty(this, '$fetchComponents', {
    value: async function() {
      if (this.$root.$unknownComponents.length) {
        let unknown = this.$root.$unknownComponents.splice(0, this.$root.$unknownComponents.length);
        const res = await bbn.cp.fetchComponents(unknown);
        return res;
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
      }
      return false;
    },
    writable: false,
    configurable: false
  });
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

  // An anon component won't have props nor this method
  /** @todo check if the above assertion is true (source?) */
  this.$setUpProps();

  // Sending beforeCreate event
  const beforeCreate = new Event('hook:beforecreate');
  this.$onHook('beforeCreate');
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
        const fn = bbn.cp.templateToFunction(this, this.$el.constructor.bbnTpl);
        if (!fn) {
          throw new Error(bbn._("Impossible to create the template evaluator"));
        }
        // Setting in component's constructor
        this.$el.constructor.prototype.bbnEval = fn;
      }
    }
    // The template is a one-shot, bbnAnon
    else {
      // Generating
      const fn = bbn.cp.templateToFunction(this, this.$el.bbnTpl);
      if (!fn) {
        throw new Error(bbn._("Impossible to create the template evaluator"));
      }
      // Setting in component's property
      Object.defineProperty(this.$el, 'bbnEval', {
        value: fn,
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
  if (!this.$isCreated) {
    const created = new Event('hook:created');
    this.$onHook('created');
    this.$el.dispatchEvent(created);
    Object.defineProperty(this, '$isCreated', {
      value: true,
      writable: false, 
      configurable: false
    });
  }

  // Sets the current template schema and creates the DOM
  await this.$updateComponent().then(() => {
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
    this.$onHook('beforeMount');
    this.$el.dispatchEvent(beforeMount);

    // $isInit, defined in constructor  is made writable before being set to true
    Object.defineProperty(this, '$isInit', {
      value: true,
      writable: false,
      configurable: true
    });

    if (!this.$isMounted) {
      // Sending mounted event
      const mounted = new Event('hook:mounted');
      this.$onHook('mounted');
      this.$el.dispatchEvent(mounted);
      Object.defineProperty(this, '$isMounted', {
        value: true,
        writable: false, 
        configurable: false
      });
    }

    this.$el.dispatchEvent(new CustomEvent('connected'));
    this.$start();

  });
}