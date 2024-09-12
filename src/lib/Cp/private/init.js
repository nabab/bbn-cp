import bbn from "@bbn/bbn";
import addNamespace from "./addNamespace.js";

/**
 * Starts everything up
 * @returns 
 */
export default function init(cp) {
  if (Object.hasOwn(cp, '$isInit')) {
    throw Error("Illegal init call");
  }

  /**
   * A reference to the component Object (cp)
   */
  Object.defineProperty(cp, '_self', {
    confifurable: false,
    writable: false,
    value: cp.$el.bbn
  });


  // This will hold all the reactive data
  Object.defineProperty(cp, '$values', {
    value: [],
    writable: false,
    configurable: false
  });

  // This will become true after all is mounted
  Object.defineProperty(cp, '$isInit', {
    value: false,
    writable: false,
    configurable: true
  });

  // This will become true after the data functions are launched and the data is set
  Object.defineProperty(cp, '$isDataSet', {
    value: false,
    writable: false,
    configurable: true
  });

  // This will be true during the construction process (updateComponent)
  Object.defineProperty(cp, '$isCreating', {
    value: false,
    writable: true,
    configurable: true
  });

  // This will be true during the construction process (updateComponent)
  Object.defineProperty(cp, '$isUpdating', {
    value: null,
    writable: true,
    configurable: true
  });

  Object.defineProperty(cp, '$isCreated', {
    value: false,
    writable: true,
    configurable: true
  });

  Object.defineProperty(cp, '$isDestroyed', {
    value: false,
    writable: true,
    configurable: true
  });

  Object.defineProperty(cp, '$isMounted', {
    value: false,
    writable: true,
    configurable: true
  });

  // This will be true during the construction process (updateComponent)
  Object.defineProperty(cp, '$isUpdatingComputed', {
    value: false,
    writable: true,
    configurable: true
  });
  // This will be true during the construction process (updateComponent)
  Object.defineProperty(cp, '$tagUsed', {
    value: [],
    writable: false,
    configurable: true
  });


  /**
   * Object of all the instance properties available directly in the HTML templates.
   * Indexed by name, the value being the type (data, prop, method, computed)
   * @return {Object}
   */
  Object.defineProperty(cp, '$namespaces', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });


  /**
   * Template array
  */
  Object.defineProperty(cp, '$tpl', {
    value: cp.$el.bbnTpl || cp.$el.constructor.bbnTpl,
    writable: false,
    configurable: false
  });

  const _t = cp;

  Object.defineProperty(cp.$options, 'propsData', {
    get() {
      return _t.$el.bbnSchema?.props || {};
    }
  });

  Object.defineProperty(cp.$options, 'components', {
    get() {
      return _t.$cfg.components || {};
    }
  });

  Object.defineProperty(cp, '$props', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });
  Object.defineProperty(cp, '$propsCfg', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });

  /**
   * Object of all available slots nodes in the template.
   * Indexed by name with id as value
   */
  Object.defineProperty(cp, '$availableSlots', {
    get() {
      return cp.$el.bbnSlots || bbnHtml.availableSlots;
    }
  });

  /**
   * Is true if is creating or updating
   */
  Object.defineProperty(cp, '$currentComputed', {
    value: null,
    writable: false,
    configurable: true
  });

  /**
   * Is true if is creating or updating
   */
  Object.defineProperty(cp, '$currentExpression', {
    value: null,
    writable: false,
    configurable: true
  });

  /**
   * Is true if is creating or updating
   */
  Object.defineProperty(cp, '$isBusy', {
    get() {
      return cp.$isCreating || cp.$isUpdating;
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
      return cp.$el.bbnSlots;
    }
  });

  /**
   * The ID of the component, corresponding ot its ID in the template.
   * Components inside a loop have all the same id
   */
  Object.defineProperty(cp, '$id', {
    value: cp.$el.bbnId,
    writable: false,
    configurable: false
  });

  /**
   * Unique ID for each component, used for global registration
   */
  Object.defineProperty(cp, '$cid', {
    value: cp.$el.bbnCid,
    writable: false,
    configurable: false
  });

  /**
   * Unique ID for each component, used for global registration
   */
  Object.defineProperty(cp, '$origin', {
    value: cp.$el.bbnComponentId && (cp.$el.bbnComponentId !== cp.$cid) ? bbn.cp.getComponent(cp.$el.bbnComponentId)?.bbn || cp : cp,
    writable: false,
    configurable: false
  });

  /**
   * Object of DOM building functions indexed on the template ids
   */
  Object.defineProperty(cp, '$fns', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });

  /**
   * The class constructor
   */
  Object.defineProperty(cp, '$cls', {
    value: cp.$el.constructor,
    writable: false,
    configurable: false
  });

  Object.defineProperty(cp, '$events', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });

  /**
 * Array of bbnComponentObject instances direct descendants of the current one
 * @return {Array}
 */
  Object.defineProperty(cp, '$children', {
    value: [],
    writable: false,
    configurable: false
  });

  Object.defineProperty(cp, '$elements', {
    value: bbn.fn.createObject({
      '0': cp.$el
    }),
    writable: false,
    configurable: false
  });

  /** @var {Object} $dataCfg The content of the data */
  Object.defineProperty(cp, '$dataCfg', {
    value: bbn.fn.createObject(),
    writable: false,
    configurable: false
  });

  Object.defineProperty(cp, '$refsElements', {
    value: bbn.fn.createObject(),
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
  //cp.$cls = cp.$el.constructor;
  /**
   * Object referencing all the elements with ref prop
   * Indexed by name, value being the bbnComponentObject if it's a component a HTMLElement otherwise
   * @return {Object}
   */
  Object.defineProperty(cp, '$refs', {
    configurable: false,
    writable: false,
    value: new Proxy(cp.$refsElements, {
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
  const parentNode = cp.$el.parentNode;
  // host is for shadow DOM (not used)
  const parent = parentNode.host ? parentNode.host.closest(".bbn-component") : parentNode.closest(".bbn-component");

  // $parent will always remain the same, it should only be null for root
  Object.defineProperty(cp, '$parent', {
    value: parent ? parent.bbn : null,
    writable: false,
    configurable: false
  });
  /**
   * The highest component in the document's hierarchy
   */
  Object.defineProperty(cp, '$root', {
    value: cp.$parent?.$root || cp,
    writable: false,
    configurable: false
  });

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

  if (cp === cp.$root) {
    cp.$fetchTimeout = null;
    Object.defineProperty(cp, '$unknownComponents', {
      value: [],
      writable: false,
      configurable: false
    });
  }
  Object.defineProperty(cp, '$currentMap', {
    get() {
      return cp.$el.bbnMap || cp.$cls.bbnMap;
    }
  });
  Object.defineProperty(cp, '$expResults', {
    configurable: false,
    writable: false,
    value: bbn.fn.createObject()
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

  // Setting up available props for HTML templates
  addNamespace(cp, '$internal', 'internal');
  addNamespace(cp, '$props', 'internal');
  addNamespace(cp, '$el', 'internal');
  addNamespace(cp, '$root', 'internal');
  addNamespace(cp, '$cid', 'internal');
  addNamespace(cp, '$event', 'internal');
  addNamespace(cp, '$parent', 'internal');
  addNamespace(cp, '$options', 'internal');
  addNamespace(cp, '$namespaces', 'internal');
  addNamespace(cp, '$children', 'internal');
  addNamespace(cp, '$refs', 'internal');
  addNamespace(cp, '$slots', 'internal');
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
  addNamespace(cp, 'findAllByKey', 'method');
  addNamespace(cp, 'findByKey', 'method');
  addNamespace(cp, 'getChildByKey', 'method');
  addNamespace(cp, 'getComponentName', 'method');
  addNamespace(cp, 'getComponents', 'method');
  addNamespace(cp, 'getRef', 'method');
  bbn.fn.iterate(bbnCp.prototype, (a, n) => {
    if (bbn.fn.isFunction(a)) {
      addNamespace(cp, n, 'method');
    }
  });
}