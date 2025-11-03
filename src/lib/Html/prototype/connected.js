import bbnProtoHtml from "../../Html/Proto.js";
import addNamespace from "../private/addNamespace.js";
import onHook from "../private/onHook.js";
import init from "../private/init.js";
import registerChild from "../private/registerChild.js";
import setUpAllData from "../private/setUpAllData.js";
import generateNode from "../private/generateNode.js";
import mapDependencies from "../../../internals/mapDependencies.js";
import retrieveSlots from "../../../internals/retrieveSlots.js";
import tryMount from "../private/tryMount.js";

/**
 * Starts everything up when the component enters the DOM
 * - Adds itself tyo the global static 'components'
 * - Sets up the props
 * - Triggers beforecreate
 * - Sets $parent
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

bbnProtoHtml.$connected = function () {
  if (this.$isDestroyed) {
    throw new Error(bbn._("The component is already destroyed"));
  }
  // Convert the class name from camel case to CSS-style (kebab-case).
  
  const tag = bbn.fn.camelToCss(this.constructor.name);
  if (this.constructor.bbnCfg.tag) {
    this.$options.tag = this.constructor.bbnCfg.tag;
  }

  bbn.cp.uid++;
  this.bbnUid = bbn.cp.uid;
  // Check we are in the DOm
  //bbn.fn.warning("CALLBACK ON " + this.$options.name + " / " + this.$el.bbnNode.id + " INIT: " + this.$isInit + " MOUNTED: " + this.$isMounted);
  if (!this.isConnected) {
    //bbn.fn.log("CONNECTED CALLBACK: not connected or already initialized", this.$el.isConnected, bbn.cp.getComponent(this.$el.bbnCid), this);
    return;
  }

  if (this.$isConnected) {
    throw new Error(bbn._("The component is already connected"));
  }

  //bbn.fn.warning(this.$options.name + " / " + this.$el.bbnNode.id + " / CID: " + this.bbnCid);

  this.$isConnected = true;

  let realSlots = this.$options.name === 'bbn-anon' ? retrieveSlots(this.bbnTpl || this.items) : bbn.fn.clone(this.constructor.bbnSlots);
  if (!Object.keys(realSlots || {}).length) {
    // Ensure a default slot is always available
    realSlots = { default: [] }; 
  }
  this.bbnSlots = realSlots;
  bbn.fn.iterate(this.bbnTmpSlots, (a, n) => {
    if (realSlots[n]) {
      realSlots[n].push(...a.splice(0));
    }
    else {
      bbn.fn.warning("NO SLOT " + n);
    }
  });

  // just after definition to know what is the default model prop
  const modelCfg = bbn.cp.statics[this.$node.tag === 'component' ? this.$node.realTag : this.$node.tag]?.cfg?.model || (this.$options.name === 'bbn-anon' ? {prop: 'value'} : null);
  if (Object.hasOwn(this.$node.model || {}, '_default_') && modelCfg) {
    Object.defineProperty(this.$node.model._default_, 'name', {
      value: modelCfg.prop,
      configurable: false,
      writable: false
    });
    this.$node.model[modelCfg.prop] = this.$node.model._default_;
    delete this.$node.model._default_;
    delete this.$node.props._default_;
    this.$node.props[modelCfg.prop] = this.$node.model[modelCfg.prop].value;
  }

  init(this);

  // An anon component won't have props nor this method
  /** @todo check if the above assertion is true (source?) */
  this.$setUpProps();

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
    setUpAllData(this);
  }


  // Sending beforeCreate event
  onHook(this, 'beforeCreate');
  if (this.$node.events?.['hook:beforecreate'] || this.$node.events?.['hook:beforecreate']) {
    const beforeCreate = new Event('hook:beforecreate');
    this.$el.dispatchEvent(beforeCreate);
  }

  if (!this.$el.bbnDirectives) {
    Object.defineProperty(this.$el, 'bbnDirectives', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
  }
  mapDependencies(this);

  if (!this.$isCreated) {
    // If no template it's a functional component
    if (this.$tpl['0']) {
      this.$internal = generateNode(this.$tpl['0'], this, null, this.$node.root, this.$node.rootHash);
    }

    onHook(this, 'created');
    if (this.$node.events?.['hook:created'] || this.$node.events?.['hook:created']) {
      const created = new Event('hook:created');
      this.$el.dispatchEvent(created);
    }

    this.$isCreated = true;
  }
  else {
    bbn.fn.log("ALREADY CREATED")
  }

  // just after definition to know what is the default model prop
  if (this.$el.bbnNode.model?._default_ && this.$cfg?.model) {
    const modelCfg = this.$cfg.model;
    Object.defineProperty(this.$el.bbnNode.model._default_, 'name', {
      value: modelCfg.prop,
      configurable: false,
      writable: false
    });
    this.$el.bbnNode.model[modelCfg.prop] = this.$el.bbnNode.model._default_;
    delete this.$el.bbnNode.model._default_;
    delete this.$el.bbnNode.props._default_;
    this.$el.bbnNode.props[modelCfg.prop] = this.$el.bbnNode.model[modelCfg.prop].value;
  }


  // Sets the current template schema and creates the DOM
  if (this.$internal) {
    this.$internal.nodeInit();
    for (let n in this.$internal.events) {
      this.addEventListener(n, this.$internal.events[n].handler);
    }
  }

  // registering current object to parent and setting root
  if (this.$origin) {
    registerChild(this);
  }

  bbn.fn.iterate(this.$cfg.watch, (a, name) => {
    this.$watch(name, a);
  });

  // Sending beforeMount event
  onHook(this, 'beforeMount');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  if (this.$node.events?.['hook:beforemount'] || this.$events?.['hook:beforemount']) {
    const beforeMount = new Event('hook:beforemount');
    this.$el.dispatchEvent(beforeMount);
  }

  this.$isWatched = true;

  tryMount(this);
  // Important
  this.$numBuild = bbn.cp.numTicks;
}

