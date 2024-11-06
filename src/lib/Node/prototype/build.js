import bbn from "@bbn/bbn";
import bbnNode from "../Node.js";
import addUnknownComponent from "../../Cp/private/addUnknownComponent.js";
import fetchComponents from "../../Cp/private/fetchComponents.js";
import retrieveSlots from "../../../internals/retrieveSlots.js";
import stringToTemplate from "../../../internals/stringToTemplate.js";

bbnNode.prototype.nodeBuild = async function(after) {
  /*
  if (this.tag === 'td') {
    bbn.fn.log("BUILDING TD " + this.id + " " + this.hash);
    bbn.fn.startChrono("CHRONO")
  }*/
  if (this.tag === 'template') {
    //bbn.fn.log("BUILDING TEMPLATE " + this.id + " " + this.hash);
  }

  const parent = this.parentElement || this.component.$el;
  const cp = this.component;
  // Check if the node represents a component and not a comment
  // Retrieve the source component based on node's componentId or default to cp
  // Attempt to retrieve an existing element with the same ID and hash
  let hash = this.hash;
  this.oldElement = this.element;
  // Flag to determine if the existing element should be replaced
  // Create the appropriate DOM element based on the node type
  if (this.comment) {
    // Create a comment node for placeholders
    this.element = document.createComment(" ***_BBN_*** ");
    if (bbn.fn.isComment(this.oldElement)) {
      debugger;
    }
  }
  else {
    const realTag = this.realTag;
    let tag = realTag;
    if (this.attr?.is) {
      this.attr.is.attrGetValue();
    }
    
    // Special handling for components and unknown components
    // Attempt to add unknown component for dynamic fetching if needed
    if (this.isComponent && addUnknownComponent(cp, realTag)) {
      // Fetch component definitions if the component is unknown
      let components = await fetchComponents(cp);
      if (!components?.[realTag] && !bbn.cp.known.includes(realTag)) {
        bbn.fn.log(components);
        throw new Error(bbn._("impossible to get the component %s", realTag));
      }

      if (components?.[realTag]?.tag) {
        tag = components[realTag].tag;
      }
    }
  
    if (bbn.cp.statics[tag]?.cfg?.tag) {
      tag = bbn.cp.statics[tag]?.cfg?.tag;
    }
  
    // just after definition to know what is the default model prop
    if (this.model?._default_ && bbn.cp.statics[tag]?.cfg?.model) {
      const modelCfg = bbn.cp.statics[tag]?.cfg?.model;
      Object.defineProperty(this.model._default_, 'name', {
        value: modelCfg.prop,
        configurable: false,
        writable: false
      });
      this.model[modelCfg.prop] = this.model._default_;
      delete this.model._default_;
      delete this.props._default_;
      this.props[modelCfg.prop] = this.model[modelCfg.prop].value;
    }
  
    const isDiff = realTag !== tag;
    if (tag === 'svg') {
      // Create an SVG element for vector graphics
      this.element = document.createElementNS("http://www.w3.org/2000/svg", tag);
      // Set the SVG content
      this.element.innerHTML = this.component.$currentMap[this.id].content;
    }
    else {
      // Handle component elements or standard HTML elements
      const constructorArgs = [tag];
      if (isDiff) {
        // Handle custom elements with 'is' attribute
        constructorArgs.push({ is: this.tag });
      }

      // Create the element
      this.element = Object.assign(
        document.createElement(...constructorArgs),
        {}
      );

      if (isDiff) {
        // Set the 'is' attribute for custom elements
        this.element.setAttribute('is', this.tag);
      }

      if (this.model?._default_ && this.element.constructor.bbnCfg) {
        const modelProp = this.element.constructor.bbnCfg.model?.prop || 'value';
        this.model[modelProp] = this.model._default_;
        Object.defineProperty(this.model, 'name', {
          value: modelProp,
          writable: false,
          configurable: false
        });
        delete this.model._default_;
      }
      
      // Additional setup for anonymous components (bbn-anon)
      if ((realTag === 'bbn-anon') && this.cfg) {
        // Ensure basic mixin is included in configuration
        if (this.cfg.mixins && !this.cfg.mixins.includes(bbn.cp.mixins.basic)) {
          this.cfg.mixins.push(bbn.cp.mixins.basic);
        }

        const tpl = stringToTemplate(this.cfg.template, true);
        // Define properties for configuration, template, mapping, and inline templates
        Object.defineProperties(this.element, {
          'bbnCfg': { value: this.cfg, writable: false, configurable: false },
          'bbnTpl': { value: tpl.res, writable: false, configurable: false },
          'bbnMap': { value: tpl.map, writable: false, configurable: false },
          'bbnInlineTemplates': { value: tpl.inlineTemplates, writable: false, configurable: false }
        });
      }
      if (this.isComponent) {
        let realSlots = tag === 'bbn-anon' ? retrieveSlots(this.element.bbnTpl || this.items) : bbn.fn.clone(this.element.constructor.bbnSlots);
        if (!Object.keys(realSlots || {}).length) {
          // Ensure a default slot is always available
          realSlots = { default: [] }; 
        }
        Object.defineProperty(this.element, 'bbnRealSlots', {
          value: realSlots, writable: false, configurable: false
        });
        // Alias for accessing slots directly
        Object.defineProperty(this.element, 'bbnSlots', {
          get() { return this.bbnRealSlots; }
        });
      }
    }
  }

  // Assign a unique ID and schema to the element for tracking and management
  Object.defineProperties(this.element, {
    'bbnId': { value: this.id, writable: false, configurable: false },
    'bbnSchema': { value: this, writable: true, configurable: true },
    'bbnComponentId': { value: this.component.$cid, writable: false, configurable: false }
  });
  // Additional properties for loop handling and directives
  if (this.hash) {
    Object.defineProperties(this.element, {
      'bbnHash': { value: this.hash, writable: false, configurable: false },
      'bbnIndex': { value: this.loopIndex, writable: false, configurable: false }
    });
  }
  if (!this.comment && this.directives) {
    Object.defineProperty(this.element, 'bbnDirectives', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
  }

  // Register the element in the component's tracking system

  if (!this.comment) {
    for (let i = 0; i < this.attributes.length; i++) {
      if (!(this.attributes[i] instanceof bbnDirectiveAttr)) {
        await this.attributes[i].attrUpdate(true);
      }
    }
  }
  
  await this.nodeInsert(this.element, after);

  if (!this.comment) {
    for (let i = 0; i < this.attributes.length; i++) {
      if (this.attributes[i] instanceof bbnDirectiveAttr) {
        await this.attributes[i].attrUpdate(true);
      }
    }
  }

  // Return the created or modified element
  this.numBuild++;
  return this.element;
};
