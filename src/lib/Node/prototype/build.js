import bbn from "@bbn/bbn";
import bbnNode from "../Node.js";
import addUnknownComponent from "../../Cp/private/addUnknownComponent.js";
import fetchComponents from "../../Cp/private/fetchComponents.js";
import generateHtmlClass from "../../../internals/generateHtmlClass.js";
import stringToTemplate from "../../../internals/stringToTemplate.js";
import announceComponent from "../../Cp/private/announceComponent.js";

bbnNode.prototype.nodeBuild = function(after) {
  if (!this.isValid) {
    return;
  }

  /*
  if (this.tag === 'td') {
    bbn.fn.log("BUILDING TD " + this.id + " " + this.hash);
    bbn.fn.startChrono("CHRONO")
  }*/
  if (this.tag === 'template') {
    //bbn.fn.log("BUILDING TEMPLATE " + this.id + " " + this.hash);
  }

  const cp = this.component;
  // Check if the node represents a component and not a comment
  // Retrieve the source component based on node's componentId or default to cp
  // Attempt to retrieve an existing element with the same ID and hash
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
    if (this.attr?.is) {
      this.attr.is.attrGetValue();
    }

    const realTag = this.realTag;
    let tag = this.tag === 'component' ? realTag : this.tag;
    const isDiff = realTag !== tag;
    
    // Special handling for components and unknown components
    // Attempt to add unknown component for dynamic fetching if needed
    if (this.isComponent && addUnknownComponent(cp, tag)) {
      // Fetch component definitions if the component is unknown
      fetchComponents(cp);
    

      // Determine the class to use based on the tag name.
      const cls = realTag && bbn.cp.tagExtensions[realTag] ? bbn.cp.tagExtensions[realTag] : 'bbnHtml';
      // Generate and globally expose HTML and Cp classes.
      const publicName = bbn.fn.camelize(tag);
      window[publicName] = generateHtmlClass(publicName, bbn.cp.tagExtensions[realTag] ? realTag : null);
      // Define arguments for custom element registration.
      const args = [tag, window[publicName]];
      if (isDiff) {
        args.push({ extends: realTag });
      }

      // Assigning the public class to the component's tag
      //bbn.fn.log(['define', ...args]);
      customElements.define(...args);
      /*
      if (!components?.[realTag] && !bbn.cp.known.includes(realTag)) {
        bbn.fn.log(components);
        throw new Error(bbn._("impossible to get the component %s", realTag));
      }

      if (components?.[realTag]?.tag) {
        tag = components[realTag].tag;
      }
        */
    }
  
    /*
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
      */
    if (tag === 'svg') {
      // Create an SVG element for vector graphics
      this.element = document.createElementNS("http://www.w3.org/2000/svg", tag);
      // Set the SVG content
      this.element.innerHTML = cp.$currentMap[this.id].content;
    }
    else {
      // Handle component elements or standard HTML elements
      const constructorArgs = [realTag];
      if (isDiff) {
        // Handle custom elements with 'is' attribute
        constructorArgs.push({ is: tag });
      }

      // Create the element
      const clone = cp.$currentMap[this.id].templateElement.tagName.toLowerCase() === realTag;
      this.element = clone ? cp.$currentMap[this.id].templateElement.cloneNode() : Object.assign(
        document.createElement(...constructorArgs),
        {}
      );

      if (isDiff) {
        // Set the 'is' attribute for custom elements
        this.element.setAttribute('is', tag);
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
        announceComponent(cp, this.element);
      }
    }
  }

  const node = this;
  // Assign a unique ID and schema to the element for tracking and management
  Object.defineProperties(this.element, {
    'bbnId': { value: this.id, writable: false, configurable: false },
    'bbnComponent': { value: cp, writable: false, configurable: false },
    'bbnSchema': {
      get() {
        return node;
      }
    },
    'bbnComponentId': { value: cp.$cid, writable: false, configurable: false }
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
        this.attributes[i].attrUpdate(true);
      }
    }
  }
  
  this.nodeInsert(this.element, after);

  if (!this.comment) {
    for (let i = 0; i < this.attributes.length; i++) {
      if (this.attributes[i] instanceof bbnDirectiveAttr) {
        this.attributes[i].attrUpdate(true);
      }
    }
  }

  // Return the created or modified element
  this.numBuild++;
  return this.element;
};
