import addNamespace from "./addNamespace.js";
import addComponent from "../../../internals/addComponent.js";

/**
 * Starts everything up
 * @returns 
 */
export default function init(cp) {
  if (cp.$isInit) {
    throw new Error("Illegal init call");
  }

  /**
   * Template array
   */
  Object.defineProperty(cp, '$tpl', {
    value: cp.bbnTpl || cp.constructor.bbnTpl,
    writable: false,
    configurable: false
  });

  const _t = cp;

  Object.defineProperty(cp.$options, 'propsData', {
    get() {
      return _t.bbnSchema?.props || {};
    }
  });

  Object.defineProperty(cp.$options, 'components', {
    get() {
      return _t.$cfg.components || {};
    }
  });

  /**
   * Object of all available slots nodes in the template.
   * Indexed by name with id as value
   */
  Object.defineProperty(cp, '$hash', {
    get() {
      return cp.$el?.bbnHash || '';
    }
  });


  // Setting $eval with the retrived/generated function
  Object.defineProperty(cp, '$oldValues', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });


  Object.defineProperty(cp, '$watcher', {
    value: bbn.fn.createObject(),
    writable: false
  });

  /**
   * Object referencing all the content for each available slot.
   * Indexed by slot's name (default is default), it contains an array of nodes which are the content
   * @return {Object}
   */
  Object.defineProperty(cp, '$slots', {
    get() {
      return cp.bbnSlots;
    }
  });

  /**
   * Object referencing all the content for each available slot.
   * Indexed by slot's name (default is default), it contains an array of nodes which are the content
   * @return {Object}
   */
  const slotElements = bbn.fn.createObject();
  Object.keys(cp.bbnSlots, k => slotElements[k] = null);
  Object.defineProperty(cp, '$slotElements', {
    get() {
      return slotElements;
    }
  });

  /**
   * The ID of the component, corresponding ot its ID in the template.
   * Components inside a loop have all the same id
   */
  Object.defineProperty(cp, '$id', {
    value: cp.bbnId,
    writable: false,
    configurable: false
  });

  /**
   * Unique ID for each component, used for global registration
   */
  Object.defineProperty(cp, '$cid', {
    value: cp.bbnCid,
    writable: false,
    configurable: false
  });

  /**
   * Unique ID for each component, used for global registration
   */
  Object.defineProperty(cp, '$origin', {
    value: cp.bbnComponent,
    writable: false,
    configurable: false
  });


  Object.defineProperty(cp, '$deps', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });

  /**
   * Counts the number of times the component has been repainted through the method updateComponent
   */
  Object.defineProperty(cp, '$numBuild', {
    value: 0,
    writable: true,
    configurable: true
  });

  //Object.defineProperty
  //cp.$event = null;
  //cp.$cls = cp.constructor;

  // $parent will always remain the same, it should only be null for root
  Object.defineProperty(cp, '$_currentParent', {
    configurable: true,
    writable: true,
    value: null
  });

  // $parent will always remain the same, it should only be null for root
  Object.defineProperty(cp, '$parent', {
    get() {
      const ele = this.closest('.bbn-component');
      if (ele !== this.$_currentParent) {
        if (this.$_currentParent) {
          let idx = this.$_currentParent.$children.indexOf(this);
          if (idx > -1) {
            this.$_currentParent.$children.splice(idx, 1);
          }
        }

        if (ele?.$children) {
          ele.$children.push(this);
        }

        this.$_currentParent = ele;
      }

      return this.$_currentParent;
    }
  });
  // Forcing update
  cp.$parent;


  /**
   * The highest component in the document's hierarchy
   */
  Object.defineProperty(cp, '$root', {
    value: cp.bbnIsRoot ? cp : cp.bbnComponent.$root,
    writable: false,
    configurable: false
  });

  if (!cp.bbnIsRoot && (cp.$root === cp)) {
    debugger;
  }

  Object.defineProperty(cp, '$isRoot', {
    value: cp.$root === cp,
    writable: false,
    configurable: false
  });

  Object.defineProperty(cp, '$connectors', {
    value: [],
    writable: false,
    configurable: false
  });

  /**
   * The directives on the root element of the template
   */
  Object.defineProperty(cp, '$directives', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });
  
  Object.defineProperty(cp, '$queue', {
    value: cp.$root === cp ? [] : cp.$root.$queue,
    writable: false,
    configurable: false
  });
  /*
  Object.defineProperty(cp, '$queue', {
    value: [],
    writable: false,
    configurable: false
  });
  */

  Object.defineProperty(cp, '$currentMap', {
    get() {
      return cp.bbnMap || cp.$cls.bbnMap;
    }
  });
  Object.defineProperty(cp, '$schema', {
    configurable: false,
    writable: false,
    value: []
  });
  /**
   * The latest timestamp of the last update launch
   */
  Object.defineProperty(cp, '$lastLaunch', {
    value: 0,
    writable: true
  });

  addComponent(cp);
  if (cp.bbnComponent) {
    cp.bbnComponent.$components.add(cp);
  }

  // $isInit, defined in constructor  is made writable before being set to true
  Object.defineProperty(cp, '$isInit', {
    value: true,
    writable: false,
    configurable: true
  });

  // Setting up available props for HTML templates
  addNamespace(cp, '$internal', 'internal');
  addNamespace(cp, '$props', 'internal');
  addNamespace(cp, '$el', 'internal');
  addNamespace(cp, '$root', 'internal');
  addNamespace(cp, '$cid', 'internal');
  addNamespace(cp, '$event', 'internal');
  addNamespace(cp, '$parent', 'internal');
  addNamespace(cp, '$origin', 'internal');
  addNamespace(cp, '$options', 'internal');
  addNamespace(cp, '$namespaces', 'internal');
  addNamespace(cp, '$children', 'internal');
  addNamespace(cp, '$components', 'internal');
  addNamespace(cp, '$refs', 'internal');
  addNamespace(cp, '$slots', 'internal');
  addNamespace(cp, '$isInit', 'internal');
  addNamespace(cp, '$isCreated', 'internal');
  addNamespace(cp, '$isMounted', 'internal');
  addNamespace(cp, '_self', 'internal');
  addNamespace(cp, '_', 'method');
  addNamespace(cp, '$emit', 'method');
  addNamespace(cp, '$forceUpdate', 'method');
  addNamespace(cp, '$is', 'method');
  addNamespace(cp, '$isComponent', 'method');
  addNamespace(cp, '$nextTick', 'method');
  addNamespace(cp, '$off', 'method');
  addNamespace(cp, '$on', 'method');
  addNamespace(cp, '$once', 'method');
  addNamespace(cp, '$retrieveComponent', 'method');
  addNamespace(cp, '$retrieveElement', 'method');
  addNamespace(cp, 'ancestors', 'method');
  addNamespace(cp, 'closest', 'method');
  addNamespace(cp, 'extend', 'method');
  addNamespace(cp, 'find', 'method');
  addNamespace(cp, 'findAll', 'method');
  addNamespace(cp, 'getComponentName', 'method');
  addNamespace(cp, 'getComponents', 'method');
  addNamespace(cp, 'getRef', 'method');
  bbn.fn.each(Object.keys(bbnProtoHtml), a => {
    if (!cp.$namespaces[a]) {
      addNamespace(cp, a, 'internal');
    }
  });
}