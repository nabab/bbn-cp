import bbnCp from "../Cp.js";
import bbn from "@bbn/bbn";
import mapDependencies from "../../internals/mapDependencies.js";
import onHook from "./private/onHook.js";
import init from "./private/init.js";
import addNamespace from "./private/addNamespace.js";
import updateData from "./private/updateData.js";
import launch from "./private/launch.js";
import registerChild from "./private/registerChild.js";

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
    bbn.fn.log("CONNECTED CALLBACK: not connected or already initialized", this.$el.isConnected, bbn.this.getComponent(this.$el.bbnCid));
    return;
  }
  if (this.$isInit) {
    bbn.fn.log("WTF " + this.constructor.name);
    throw new Error("WTF " + this.constructor.name);
  }

  init(this);

  // An anon component won't have props nor this method
  /** @todo check if the above assertion is true (source?) */
  this.$setUpProps();

  // Sending beforeCreate event
  const beforeCreate = new Event('hook:beforecreate');
  onHook(this, 'beforeCreate');
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

  // Setting up all the data properties
  updateData(this);

  // Generates the evaluator function, will happen only once
  if (!this.$el.bbnEval && !this.$el.constructor.bbnEval) {
    // The template is not a one-shot (it is defined in the constructor)
    if (!this.$el.bbnTpl) {
      // The function has never been generated for this component
      if (!this.$el.constructor.bbnEval) {
        // Generating
        /*
        const fn = templateToFunction(this, this.$el.constructor.bbnTpl);
        if (!fn) {
          throw new Error(bbn._("Impossible to create the template evaluator"));
        }
        */
        // Setting in component's constructor
        this.$el.constructor.prototype.bbnEval = true;
      }
    }
    // The template is a one-shot, bbnAnon
    else {
      /*
      // Generating
      const fn = templateToFunction(this, this.$el.bbnTpl);
      if (!fn) {
        throw new Error(bbn._("Impossible to create the template evaluator"));
      }
      */
      // Setting in component's property
      Object.defineProperty(this.$el, 'bbnEval', {
        value: true,
        writable: false,
        configurable: false
      });
    }

    mapDependencies(this);
    bbn.fn.log("MAPPING DEPENDENCIES", this.$el.bbnMap);
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
    onHook(this, 'created');
    this.$el.dispatchEvent(created);
    Object.defineProperty(this, '$isCreated', {
      value: true,
      writable: false, 
      configurable: false
    });
  }

  // Sets the current template schema and creates the DOM
  await launch(this).then(() => {

    // registering current object to parent and setting root
    if (this.$parent) {
      registerChild(this.$parent, this);
    }

    // Sending beforeMount event
    const beforeMount = new Event('hook:beforemount');
    onHook(this, 'beforeMount');
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
      onHook(this, 'mounted');
      this.$el.dispatchEvent(mounted);
      Object.defineProperty(this, '$isMounted', {
        value: true,
        writable: false, 
        configurable: false
      });
    }

    this.$el.dispatchEvent(new CustomEvent('connected'));
  });
}