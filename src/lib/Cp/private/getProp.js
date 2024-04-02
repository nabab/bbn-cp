import setProp from './setProp.js';

export default function getProp(cp, name) {
  if (Object.hasOwn(cp.$el.bbnSchema.props || {}, name) && (cp.$el.bbnSchema.props[name] !== cp.$props[name])) {
    setProp(cp, name, cp.$el.bbnSchema.props[name]);
  }

  //let v = bbnData.getValue(cp.$props[name]);

  /** @todo build2
  if (cp.$currentComputed && !cp.$computed[cp.$currentComputed].dependencies.includes(name)) {
    cp.$computed[cp.$currentComputed].dependencies.push(name);
  }
 */

  /*
  if (!bbn.fn.isPrimitive(v) && (typeof v === 'object') && [Array, Object, undefined].includes(v.constructor)) {
    const hash = bbn.fn.hash(v);
    if (cp.$oldValues[name] !== hash) {
      if (cp.$isInit) {
        if (cp.$watcher?.[name]?.handler) {
          if (!bbn.fn.isFunction(cp.$watcher[name].handler)) {
            throw Error(bbn._("Watchers must be function, wrnmg parameter for %s", name));
          }
          const oldV = cp.$watcher[name].value;
          cp.$watcher[name].value = v;
          cp.$watcher[name].handler.apply(cp, [v, oldV]);
        }

        cp.$oldValues[name] = hash;
        cp.$tick();
      }
    }
  }
  */

  return cp.$props[name];
}
