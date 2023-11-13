const expToFn = (cp, loopVars, a, node, withReturn = true) => {
  if (a.exp) {
    const deps = [];
    bbn.fn.each(Object.keys(cp.$namespaces), arg => {
      if (a.exp.match(new RegExp((arg.indexOf('$') === 0 ? '' : '\\b') + bbn.fn.escapeRegExp(arg) + '\\b'))) {
        deps.push(arg);
      }
    });
    const args = deps.slice();
    bbn.fn.iterate(loopVars, (v, k) => {
      if (node.id.indexOf(k) === 0) {
        args.push(...v);
      }
    });
    a.fn = new Function(...args, withReturn ? 'return (' + a.exp + ')' : a.exp);
    a.args = args;
    return args;
  }

  return [];
};


export default function mapDependencies(cp) {
  if (cp.$el.constructor.bbnMapped) {
    return;
  }

  const loopVars = {};
  bbn.fn.iterate(cp.$currentMap, node => {
    if (node.loop) {
      loopVars[node.id] = [
        ...node.loop.item ? [node.loop.item] : [],
        ...node.loop.index ? [node.loop.index] : []
      ];
    }

    const deps = [];
    if (node.loop) {
      const args = expToFn(cp, loopVars, node.loop, node);
      deps.push(...args);
    }

    if (node.condition) {
      const args = expToFn(cp, loopVars, node.condition, node);
      deps.push(...args);
    }

    if (node.forget) {
      const args = expToFn(cp, loopVars, node.forget, node);
      deps.push(...args);
    }

    if (node.attr) {
      bbn.fn.iterate(node.attr, a => {
        if (a.exp) {
          const args = expToFn(cp, loopVars, a, node);
          deps.push(...args);
        }
      });
    }
    else if (node.exp) {
      node.exp = '`' + node.exp + '`';
      const args = expToFn(cp, loopVars, node, node);
      deps.push(...args);
    }

    if (node.events) {
      bbn.fn.iterate(node.events, a => {
        if (a.exp) {
          const args = expToFn(cp, loopVars, a, node, false);
          deps.push(...args);
        }
      });
    }

    if (node.model) {
      bbn.fn.iterate(node.model, a => {
        if (a.exp) {
          const args = expToFn(cp, loopVars, a, node);
          deps.push(...args);
        }
      });
    }

    node.dependencies = bbn.fn.unique(deps);
  });
  Object.defineProperty(cp.$el.constructor, 'bbnMapped', {
    value: true,
    writable: false,
    configurable: false
  });
}
