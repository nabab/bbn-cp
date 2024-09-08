import bbnCp from "../Cp.js";
import addNamespace from "../private/addNamespace.js";
import onHook from "../private/onHook.js";
import init from "../private/init.js";
import registerChild from "../private/registerChild.js";
import updateData from "../private/updateData.js";
import generateNode from "../private/generateNode.js";
import mapDependencies from "../../../internals/mapDependencies.js";

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

bbnCp.prototype.$connected = async function () {
  // Check we are in the DOm
  //bbn.fn.warning("CALLBACK ON " + this.$options.name + " / " + this.$el.bbnSchema.id + " INIT: " + this.$isInit + " MOUNTED: " + this.$isMounted);
  if (!this.$el.isConnected) {
    bbn.fn.log("CONNECTED CALLBACK: not connected or already initialized", this.$el.isConnected, bbn.cp.getComponent(this.$el.bbnCid));
    return;
  }
  if (Object.hasOwn(this, '$isInit')) {
    bbn.fn.log("WTF " + this.constructor.name);
    return;
    throw Error("WTF " + this.constructor.name);
  }

  // Stopping propagation for internal events
  for (const key in this.$el) {
    /*
    if (/^on/.test(key)) {
      const eventType = bbn.fn.substr(key, 2);
      this.$el.addEventListener(eventType, e => {
        if (!e.bubbles && (bbn.fn.isInside(e.currentTarget, this.$el) || (this.$el === e.currentTarget))) {
          e.stopPropagation();
        }
      });
    }
      */
  }

  init(this);

  // An anon component won't have props nor this method
  /** @todo check if the above assertion is true (source?) */
  this.$setUpProps();

  // Sending beforeCreate event
  const beforeCreate = new Event('hook:beforecreate');
  await onHook(this, 'beforeCreate');
  this.$el.dispatchEvent(beforeCreate);

  // Setting up the config
  const cfg = this.$cfg;
  // Setting up the namespace for the methods
  if (cfg.methods) {
    bbn.fn.each(Object.keys(cfg.methods), n => addNamespace(this, n, 'method'));
  }
  // Setting up the namespace for the computed
  if (cfg.computed) {
    bbn.fn.each(Object.keys(cfg.computed), n => addNamespace(this, n, 'computed'));
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
    updateData(this);
  }

  if (!this.$el.bbnDirectives) {
    Object.defineProperty(this.$el, 'bbnDirectives', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
  }

  // Generates the evaluator function, will happen only once
  /*
  if (!this.$el.bbnEval && !this.$el.constructor.bbnEval) {
    // The template is not a one-shot (it is defined in the constructor)
    if (!this.$el.bbnTpl) {
      // The function has never been generated for this component
      if (!this.$el.constructor.bbnEval) {
        // Generating
        const fn = templateToFunction(this, this.$el.constructor.bbnTpl);
        if (!fn) {
          throw Error(bbn._("Impossible to create the template evaluator"));
        }
        // Setting in component's constructor
        this.$el.constructor.prototype.bbnEval = fn;
      }
    }
    // The template is a one-shot, bbnAnon
    else {
      // Generating
      const fn = templateToFunction(this, this.$el.bbnTpl);
      if (!fn) {
        throw Error(bbn._("Impossible to create the template evaluator"));
      }
      // Setting in component's property
      Object.defineProperty(this.$el, 'bbnEval', {
        value: fn,
        writable: false,
        configurable: false
      });
    }
  }
  */
  mapDependencies(this);

  if (!this.$isCreated) {
    Object.defineProperty(this, '$lastBuild', {
      value: 0,
      writable: true
    });

    // If no template it's a functional component
    if (this.$tpl['0']) {
      Object.defineProperty(this, '$internal', {
        value: generateNode(this.$tpl['0'], this, this.$internal),
        writable: false,
        configurable: false
      });
    }
    const created = new Event('hook:created');
    await onHook(this, 'created');
    this.$el.dispatchEvent(created);
    Object.defineProperty(this, '$isCreated', {
      value: true,
      writable: false, 
      configurable: false
    });
  }

  // Sets the current template schema and creates the DOM
  if (this.$internal) {
    await this.$internal.init();
  }

  // registering current object to parent and setting root
  if (this.$parent) {
    registerChild(this.$parent, this);
  }

  // Sending beforeMount event
  const beforeMount = new Event('hook:beforemount');
  await onHook(this, 'beforeMount');
  this.$el.dispatchEvent(beforeMount);


  bbn.fn.iterate(this.$cfg.watch, (a, name) => {
    this.$watch(name, a);
  });

  // $isInit, defined in constructor  is made writable before being set to true
  Object.defineProperty(this, '$isInit', {
    value: true,
    writable: false,
    configurable: true
  });
  this.$el.dispatchEvent(new CustomEvent('connected'));

  if (!this.$isMounted) {
    // Sending mounted event
    const mounted = new Event('hook:mounted');
    await onHook(this, 'mounted');
    this.$el.dispatchEvent(mounted);
    Object.defineProperty(this, '$isMounted', {
      value: true,
      writable: false, 
      configurable: false
    });
  }

}