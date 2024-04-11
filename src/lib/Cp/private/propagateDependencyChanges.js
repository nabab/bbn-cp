export default function propagateDependencyChanges(cp, name, hash) {
  bbn.fn.iterate(cp.$computed, (v, n) => {
    if (v.dependencies && v.dependencies.includes(name)) {
      cp.$computed[n].update();
    };
  });
  let shouldTick = false;
  bbn.fn.iterate(cp.$currentMap, (v, n) => {
    if (v.dependencies && v.dependencies.includes(name)) {
      if (bbn.cp.isComponent(v)) {
        if (cp.$elements[v.id]) {
          if (bbn.fn.isDom(cp.$elements[v.id])) {
            if (cp.$elements[v.id].bbn) {
              cp.$elements[v.id].bbn.$tick();
            }
            else if (!shouldTick) {
              shouldTick = true;
            }
          }
          else if (hash && cp.$elementsv[v.id][hash]) {
            if (bbn.fn.isDom(cp.$elements[v.id][hash])) {
              if (cp.$elements[v.id][hash].bbn) {
                cp.$elements[v.id][hash].bbn.$tick();
              }
              else if (!shouldTick) {
                shouldTick = true;
              }
            }
          }
        }
      }
    }
  });
  if (shouldTick) {
    bbn.fn.log("SHOULD TICK ON " + cp.$options.name)
    cp.$tick();
  }
}
