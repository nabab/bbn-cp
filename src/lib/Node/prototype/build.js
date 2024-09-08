import bbn from "@bbn/bbn";
import bbnNode from "../Node.js";
import addUnknownComponent from "../../Cp/private/addUnknownComponent.js";
import fetchComponents from "../../Cp/private/fetchComponents.js";
import bbnConditionAttr from "../../Attr/Condition.js";
import retrieveSlots from "../../../internals/retrieveSlots.js";
import stringToTemplate from "../../../internals/stringToTemplate.js";

bbnNode.prototype.build = async function(after) {
  const parent = this.parentElement || this.component.$el;
  const cp = this.component;
  // Check if the node represents a component and not a comment
  // Retrieve the source component based on node's componentId or default to cp
  // Attempt to retrieve an existing element with the same ID and hash
  let hash = this.hash;

  const oldEle = this.component.$retrieveElement(this.id, hash);
  // Flag to determine if the existing element should be replaced
  let ele; // Variable to hold the new or existing element
  // Create the appropriate DOM element based on the node type
  if (this.comment) {
    // Create a comment node for placeholders
    ele = document.createComment(" ***_BBN_*** ");
  }
  else {
    const realTag = this.realTag;
    let tag = realTag;
    if (this.attr?.is) {
      this.attr.is.getValue();
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
      ele = document.createElementNS("http://www.w3.org/2000/svg", tag);
      // Set the SVG content
      ele.innerHTML = this.component.$currentMap[this.id].content;
    }
    else {
      // Handle component elements or standard HTML elements
      const constructorArgs = [tag];
      if (isDiff) {
        // Handle custom elements with 'is' attribute
        constructorArgs.push({ is: this.tag });
      }

      // Create the element
      ele = Object.assign(
        document.createElement(...constructorArgs),
        {}
      );

      if (isDiff) {
        // Set the 'is' attribute for custom elements
        ele.setAttribute('is', this.tag);
      }

      if (this.model?._default_ && ele.constructor.bbnCfg) {
        const modelProp = ele.constructor.bbnCfg.model?.prop || 'value';
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
        Object.defineProperties(ele, {
          'bbnCfg': { value: this.cfg, writable: false, configurable: false },
          'bbnTpl': { value: tpl.res, writable: false, configurable: false },
          'bbnMap': { value: tpl.map, writable: false, configurable: false },
          'bbnInlineTemplates': { value: tpl.inlineTemplates, writable: false, configurable: false }
        });
      }
      if (this.isComponent) {
        let realSlots = tag === 'bbn-anon' ? retrieveSlots(ele.bbnTpl || this.items) : bbn.fn.clone(ele.constructor.bbnSlots);
        if (!Object.keys(realSlots || {}).length) {
          // Ensure a default slot is always available
          realSlots = { default: [] }; 
        }
        Object.defineProperty(ele, 'bbnRealSlots', {
          value: realSlots, writable: false, configurable: false
        });
        // Alias for accessing slots directly
        Object.defineProperty(ele, 'bbnSlots', {
          get() { return this.bbnRealSlots; }
        });
      }
    }
  }

  // Assign a unique ID and schema to the element for tracking and management
  Object.defineProperties(ele, {
    'bbnId': { value: this.id, writable: false, configurable: false },
    'bbnSchema': { value: this, writable: true, configurable: true },
    'bbnComponentId': { value: this.component.$cid, writable: false, configurable: false }
  });
  // Additional properties for loop handling and directives
  if (this.hash) {
    Object.defineProperties(ele, {
      'bbnHash': { value: this.hash, writable: false, configurable: false },
      'bbnIndex': { value: this.loopIndex, writable: false, configurable: false }
    });
  }
  if (!this.comment && this.directives) {
    Object.defineProperty(ele, 'bbnDirectives', {
      value: bbn.fn.createObject(),
      writable: false,
      configurable: false
    });
  }

  // Register the element in the component's tracking system

  this.insert(ele, after);
  if (!this.comment) {
    for (let i = 0; i < this.attributes.length; i++) {
      await this.attributes[i].update(true);
    }
  }

  // Return the created or modified element
  this.numBuild++;
  return ele;
};
