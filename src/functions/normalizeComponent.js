import bbn from "@bbn/bbn";
import "../cp.js";
import bbnData from '../lib/Data/Data.js';

/**
 * Normalizes the configuration of a component, ensuring it adheres to the expected structure and types.
 * This function also merges configuration from mixins and adds additional properties necessary for the component's lifecycle.
 * @param {Object} cfg - The Vue-like configuration object for the component.
 * @param {string} clsName - The class name of the component (for logging and error messages).
 * @returns {Object} The normalized configuration object for the component.
 */
export default function normalizeComponent(cfg, clsName) {
  // Check if the configuration object is valid.
  if (!bbn.fn.isObject(cfg)) {
    bbn.fn.log(cfg, clsName);
    throw new Error("Components definition must be objects");
  }

  // Initialize the result object with standard component properties.
  const res = bbnData.immunizeValue(bbn.fn.createObject({
    props: bbn.fn.createObject(),
    data: [],
    computed: bbnData.immunizeValue(bbn.fn.createObject()),
    methods: bbn.fn.createObject(),
    watch: bbn.fn.createObject(),
    components: bbn.fn.createObject(),
    componentNames: bbn.fn.createObject(),
    model: bbn.fn.createObject({
      prop: "value",
      event: "input"
    }),
    extension: null,
    statics: [],
    __bbnComponent: true // Internal flag to mark as a bbn component.
  }));

  const cn = clsName || cfg.tag || 'unknown';

  // Process mixins to merge their configurations into the component.
  if (cfg.mixins) {
    bbn.fn.checkType(cfg.mixins, 'array', bbn._("The mixins property must be an array in %s", cn));
    cfg.mixins.forEach(mixin => {
      bbn.fn.checkType(mixin, 'object', bbn._("A mixin should be an object in %s", cn));
      let cp = bbn.cp.normalizeComponent(mixin);
      // Merge each property of the mixin into the component config.
      bbn.fn.each(Object.keys(cp).sort(), name => {
        // Handle array properties like data and statics.
        if (bbn.fn.isArray(cp[name]) && ['data', 'statics', ...bbn.cp.hooks].includes(name)) {
          res[name] = res[name] || [];
          res[name].push(...cp[name]);
        }
        // Merge object properties.
        else if ((bbn.fn.isObject(cp[name]) && bbn.fn.numProperties(cp[name])) || (bbn.fn.isArray(cp[name]) && cp[name].length)) {
          res[name] = res[name] || bbn.fn.createObject();
          Object.assign(res[name], cp[name]);
        }
      });
    });
  }

  // Process and validate each property of the component configuration.
  bbn.fn.each(Object.keys(cfg).sort(), name => {
    switch (name) {
      case 'props':
        // Normalize and validate props.
        let props = bbn.fn.clone(cfg.props);
        // Convert array of prop names to object format.
        if (bbn.fn.isArray(props)) {
          let tmp = props;
          props = bbn.fn.createObject();
          tmp.forEach(a => {
            props[a] = bbn.fn.createObject();
          });
        }

        bbn.fn.checkType(props, 'object', bbn._("The props property must be an object in %s", cn));
        // Process each prop.
        for (let propName in props) {
          // Normalize shorthand prop types to object format.
          if (bbn.fn.isArray(props[propName]) || bbn.fn.isFunction(props[propName])) {
            // We transform it into an object
            props[propName] = bbn.fn.createObject({
              type: props[propName]
            });
          }
          // Now the prop should be an object
          bbn.fn.checkType(props[propName], 'object', `The prop ${propName} for ${clsName} is a ${typeof props[propName]}`);
          // Ensure type is an array.
          if (props[propName].type && !bbn.fn.isArray(props[propName].type)) {
            props[propName].type = [props[propName].type];
          }

          res.props[propName] = props[propName];
        }

        break;

      case 'data':
        // Normalize and validate data.
        if (!bbn.fn.isArray(cfg[name])) {
          cfg[name] = [cfg[name]];
        }
        bbn.fn.each(cfg[name], (cf) => {
          // Convert object format to function format.
          if (!bbn.fn.isFunction(cf)) {
            bbn.fn.checkType(cf, 'object', bbn._("The data must be an object or a function in %s", cn));
            let tmp = cf;
            cf = function () {
              return tmp;
            };
          }
          bbn.fn.checkType(cf, 'function', bbn._("The data must be an object or a function in %s", cn));
          res[name].push(cf);
        });
        break;

      case 'computed':
        // Validate computed properties.
        bbn.fn.checkType(cfg.computed, 'object', bbn._("The computed must be an object in %s", cn));
        for (let computedName in cfg.computed) {
          if ((typeof (cfg.computed[computedName]) !== 'function') && !cfg.computed[computedName]?.get) {
            throw new Error(bbn._("The computed must be a single function or an object with at least a get function (check %s in %s)", computedName, cn));
          }

          res.computed[computedName] = bbn.fn.createObject({
            get: cfg.computed[computedName].get || cfg.computed[computedName],
            set: cfg.computed[computedName].set || null
          });
        }

        break;

      case 'methods':
        // Validate methods.
        bbn.fn.checkType(cfg[name], 'object', bbn._("The methods must be an object in %s", cn));
        for (let methName in cfg[name]) {
          bbn.fn.checkType(cfg[name][methName], 'function', bbn._("Methods must be functions, check %s in %s", methName, cn));
          res[name][methName] = cfg[name][methName];
        }
        break;

      case 'watch':
        // Validate watchers.
        bbn.fn.checkType(cfg.watch, 'object', bbn._("The watch must be an object in %s", cn));
        for (let watchName in cfg.watch) {
          const tmp = cfg.watch[watchName];
          bbn.fn.checkType(tmp?.handler || tmp, 'function', bbn._("Watchers must be functions, see %s in %s", watchName, cn));
          res.watch[watchName] = tmp;
        }
        break;

      case 'components':
        // Check if 'components' in the config is an object.
        bbn.fn.checkType(cfg.components, 'object', bbn._("The components must be an object in %s", cn));

        // Iterate over each component defined in the 'components' section.
        for (let originalName in cfg.components) {
          // Generate a camelCase version of the component name for internal use.
          let componentName = bbn.fn.camelize(originalName);
          // Convert the camelCase name to kebab-case for use in templates and registration.
          let indexName = bbn.fn.camelToCss(componentName);

          // Validate that each component's definition is an object.
          bbn.fn.checkType(cfg.components[originalName], 'object', bbn._("Components definitions must be objects (check %s in %s)", componentName, cn));

          // Normalize the component configuration recursively.
          res.components[originalName] = bbn.cp.normalizeComponent(cfg.components[originalName], clsName);

          // Generate a unique tag name for the sub-component.
          let subName = (clsName || 'bbnsub-' + bbn.fn.randomString(10, 20, 'nl')) + bbn.fn.substr(componentName, 0, 1).toUpperCase() + bbn.fn.camelize(bbn.fn.substr(componentName, 1));
          let subTag = bbn.fn.camelToCss(subName);

          // Store the generated tag name in componentNames for reference.
          res.componentNames[indexName] = subTag;
          if (indexName !== originalName) {
            res.componentNames[originalName] = subTag;
          }

          // Ensure all variations of the component name point to the same tag.
          if (![indexName, componentName].includes(originalName)) {
            res.componentNames[originalName] = subTag;
          }
        }

        break;

      case 'model':
        // Validate model configuration.
        if (cfg.model) {
          bbn.fn.checkType(cfg.model, 'object', bbn._("Model configuration must be objects, check %s", cn));
          if (!['input', 'change'].includes(cfg.model.event) || !bbn.fn.isString(cfg.model.prop)) {
            throw new Error(bbn._("The model configuration must have an event (input or change) and a prop (check %s)", cfg.model, cn));
          }
          res.model = cfg.model;
        }
        break;

      case 'extension':
        // Validate extension.
        if (cfg.extension) {
          bbn.fn.checkType(cfg.extension, 'object', bbn._("Extensions must be objects, check %s", cn));
          res.extension = cfg.extension;
        }
        break;

      case 'render':
        // Validate render function.
        bbn.fn.checkType(cfg.render, 'function', bbn._("Render property must be a function, check %s", cn));
        res.render = cfg.render;
        break;

      case 'template':
        // Validate template string.
        bbn.fn.checkType(cfg.template, 'string', bbn._("The template must be a string, check %s", cn));
        res.template = cfg.template;
        break;

      case 'statics':
        // Validate and process static properties.
        if (cfg.statics) {
          if (!bbn.fn.isArray(cfg.statics)) {
            cfg.statics = [cfg.statics];
          }

          bbn.fn.each(cfg.statics, fn => {
            bbn.fn.checkType(fn, ['object', 'function'], bbn._("The statics property must be an object or a function in %s", cn));
            res.statics.push(fn);
          });
        }

        break;

      case 'iface':
        if (cfg.iface) {
          bbn.fn.checkType(cfg.iface, ['object', 'function'], bbn._("The iface property must be an object or a function in %s", cn));
          res.iface = cfg.iface;
        }

        break;

      /** 
       * @todo Add the possibility to change the tag using Customized built-in elements 
       * See createElement
       */
      case 'tag':
        if (cfg.tag) {
          bbn.fn.checkType(cfg.tag, 'string', bbn._("Tags must be strings (check %s)", cn));
          res.tag = cfg.tag;
        }

        break;


      /* Idea if we were putting a proxy on bbnCp;
      case 'getter':
        if (cfg.getter) {
          bbn.fn.checkType(cfg.getter, 'function', bbn._("Getters be functions (check %s)", cn));
          res.getter = cfg.getter;
        }

        break;

      case 'setter':
        if (cfg.getter) {
          bbn.fn.checkType(cfg.setter, 'function', bbn._("Setters be functions (check %s)", cn));
          res.setter = cfg.setter;
        }

        break;
      */

      default:
        if (bbn.cp.hooks.includes(name)) {
          bbn.fn.each(bbn.fn.isArray(cfg[name]) ? cfg[name] : [cfg[name]], fn => {
            bbn.fn.checkType(fn, 'function')
            if (!res[name]) {
              res[name] = [];
            }

            res[name].push(fn);
          });
        }
        else if (!["mixins", "componentNames", "name", "__bbnComponent"].includes(name)) {
          if (name.indexOf('__bbn') !== 0) {
            throw new Error(bbn._("Unrecognized index %s in the config object for %s", name, cn));
          }
        }

    }
  });

  // If there are no props we add the source prop
  if (!bbn.fn.numProperties(res.props)) {
    res.props.source = bbn.fn.createObject();
  }

  return res;
}
