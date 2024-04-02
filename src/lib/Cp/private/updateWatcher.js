export default function updateWatcher(cp, name, v, init) {
  if ((init || cp.$isInit) && cp.$watcher?.[name]) {
    let lev = 0;
    const bits = name.split(".");
    for (let i = bits.length - 1; i > -1; i--) {
      let name = bits.join('.');
      if (cp.$watcher[name]?.handler) {
        if (!bbn.fn.isFunction(cp.$watcher[name].handler)) {
          throw Error(bbn._("Watchers must be function, wrong parameter for %s", name));
        }

        const hash = bbnData.hash(v);
        if ((!lev || cp.$watcher[name].deep) && (hash !== cp.$watcher[name].hash)) {
          let oldDataObj = bbnData.getObject(cp.$watcher[name].value);
          let oldV = oldDataObj ? oldDataObj.value : cp.$watcher[name].value;
          cp.$watcher[name].value = lev ? bbn.fn.getProperty(cp, name) : v;
          cp.$watcher[name].hash = bbnData.hash(cp.$watcher[name].value);
          cp.$watcher[name].num++;
          if (!init) {
            cp.$watcher[name].handler.apply(cp, [cp.$watcher[name].value, oldV]);
          }
        }
      }
      bits.pop();
      lev++
    }
  }
}
