(() => {
  bbn.fn.autoExtend('cp', {
    /**
     * Check the config of the component (mixins, computed, props, ect...) if everything is valid
     * and add them to their respective namespaces
     */
    normalizeComponent(cfg, clsName) {
      if (!bbn.fn.isObject(cfg)) {
        bbn.fn.log(cfg, clsName);
        throw new Error("Components definition must be objects");
      }

      const res = {
        props: bbn.fn.createObject(),
        data: [],
        computed: bbn.fn.createObject(),
        methods: bbn.fn.createObject(),
        watch: bbn.fn.createObject(),
        components: bbn.fn.createObject(),
        componentNames: bbn.fn.createObject(),
        extension: null,
        static: [],
        _bbnComponent: true
      };

      if (cfg.mixins) {
        //bbn.fn.log("MIXINS", cfg);
        bbn.fn.checkType(cfg.mixins, 'array');
        cfg.mixins.forEach(mixin => {
          bbn.fn.log("MIXIN", mixin);
          bbn.fn.checkType(mixin, 'object');
          let cp = bbn.cp.normalizeComponent(mixin);
          bbn.fn.each(Object.keys(cp).sort(), name => {
            if (bbn.fn.isArray(cp[name]) && ['data', 'static', ...bbn.cp.hooks].includes(name)) {
              if (!res[name]) {
                res[name] = [];
              }

              res[name].push(...cp[name]);
            }
            else if ((bbn.fn.isObject(cp[name]) && bbn.fn.numProperties(cp[name])) || (bbn.fn.isArray(cp[name]) && cp[name].length)) {
              if (!res[name]) {
                res[name] = bbn.fn.createObject();
              }

              // Assigning each category of the mixin to the component
              Object.assign(res[name], cp[name]);
            }
          });
        });
      }

      bbn.fn.each(Object.keys(cfg).sort(), name => {
        switch (name) {
          case 'props':
            // Starting from the defined props
            let props = bbn.fn.clone(cfg.props);
            if (bbn.fn.isArray(props)) {
              let tmp = props;
              props = bbn.fn.createObject();
              tmp.forEach(a => {
                props[a] = bbn.fn.createObject();
              })
            }

            bbn.fn.checkType(props, 'object');
            for (let propName in props) {
              // If it's just an array or a constructor it's the type
              if (bbn.fn.isArray(props[propName]) || bbn.fn.isFunction(props[propName])) {
                // We transform it into an object
                props[propName] = {
                  type: props[propName]
                };
              }
              // Now the prop should be an object
              bbn.fn.checkType(props[propName], 'object', `The prop ${propName} for ${clsName} is a ${typeof props[propName]}`);
              // Type must be an array
              if (props[propName].type && !bbn.fn.isArray(props[propName].type)) {
                props[propName].type = [props[propName].type];
              }

              res.props[propName] = props[propName];
            }

            break;

          case 'data':
            if (!bbn.fn.isArray(cfg[name])) {
              cfg[name] = [cfg[name]];
            }
            bbn.fn.each(cfg[name], (cf, i) => {
              if (!bbn.fn.isFunction(cf)) {
                bbn.fn.checkType(cf, 'object');
                let tmp = cf;
                cf = function() {
                  return tmp;
                };
              }

              bbn.fn.checkType(cf, 'function', bbn._("The data must be an object or a function in %s", clsName));
              res[name].push(cf);
            })
            break;

          case 'computed':
            bbn.fn.checkType(cfg.computed, 'object');
            for (let computedName in cfg.computed) {
              if ((typeof(cfg.computed[computedName]) !== 'function') && !cfg.computed[computedName]?.get) {
                throw new Error(bbn._("The computed must be a single function or an object with at least a get function (check %s in %s)", computedName, clsName));
              }

              res.computed[computedName] = {
                get: cfg.computed[computedName].get || cfg.computed[computedName],
                set: cfg.computed[computedName].set || null
              };
            }

            break;

          case 'methods':
            bbn.fn.checkType(cfg[name], 'object');
            for (let methName in cfg[name]) {
              bbn.fn.checkType(cfg[name][methName], 'function', bbn._("Methods must be functions, check %s in %s", methName, clsName));
              res[name][methName] = cfg[name][methName];
            }

            break;

          case 'watch':
            bbn.fn.checkType(cfg.watch, 'object');
            for (let watchName in cfg.watch) {
              const tmp = cfg.watch[watchName];
              bbn.fn.checkType(tmp?.handler || tmp, 'function', bbn._("Watchers must be functions, see %s in %s", watchName, clsName));
              res.watch[watchName] = tmp;
            }

            break;

          case 'components':
            bbn.fn.checkType(cfg.components, 'object');
            for (let componentName in cfg.components) {
              let indexName = bbn.fn.camelToCss(componentName);
              bbn.fn.checkType(cfg.components[componentName], 'object', bbn._("Components definitions must be objects (check %s in %s)", componentName, clsName));
              res.components[indexName] = bbn.cp.normalizeComponent(cfg.components[componentName], clsName);
              let subName = (clsName || 'bbnsub-' + bbn.fn.randomString(10, 20, 'nl')) + bbn.fn.substr(componentName, 0, 1).toUpperCase() + bbn.fn.camelize(bbn.fn.substr(componentName, 1));
              let subTag = bbn.fn.camelToCss(subName);
              res.componentNames[indexName] = subTag;
              if (indexName !== componentName) {
                res.componentNames[componentName] = subTag;
              }
            }

            break;

          case 'extension':
            if (cfg.extension) {
              bbn.fn.checkType(cfg.extension, 'object', bbn._("Extensions must be objects, check %s", clsName));
              res.extension = cfg.extension;
            }
            break;

          case 'render':
            bbn.fn.checkType(cfg.render, 'function', bbn._("Render property must be a function, check %s", clsName));
            res.render = cfg.render;
            break;

          case 'template':
            bbn.fn.checkType(cfg.template, 'string', bbn._("The template must be a string, check %s", clsName));
            res.template = cfg.template;
            break;

          case 'static':
            if (cfg.static) {
              if (!bbn.fn.isArray(cfg.static)) {
                cfg.static = [cfg.static];
              }

              bbn.fn.each(cfg.static, fn => {
                bbn.fn.checkType(fn, ['object', 'function'], bbn._("The static property must be an object or a function in %s", clsName));
                res.static.push(fn);
              });
            }
            break;

          case 'iface':
            if (cfg.iface) {
              bbn.fn.checkType(cfg.iface, ['object', 'function'], bbn._("The ifaceace property must be an object or a function in %s", clsName));
              res.iface = cfg.iface;
            }
            break;

          /** 
           * @todo Add the possibility to change the tag using Customized built-in elements 
           * See createElement
           */
          case 'tag':
            if (cfg.tag) {
              bbn.fn.checkType(cfg.tag, 'string', bbn._("Tags must be strings (check %s)", clsName));
              res.tag = cfg.tag;
            }
            break;

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
            else if (!["mixins", "componentNames", "name", "_bbnComponent"].includes(name)) {
              throw new Error(`Unrecognize index ${name} in the config object`)
            }

        }
      });

      // If there are no props we add the source prop
      if (!bbn.fn.numProperties(res.props)) {
        res.props.source = bbn.fn.createObject();
      }

      return res;
    }
  })
})();
