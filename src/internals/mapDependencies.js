/**
 * Converts an expression into a function for dynamic value resolution.
 * @param {bbnCp} cp - The component instance.
 * @param {Object} loopVars - The loop variables in the current context.
 * @param {Object} a - The attribute or property object.
 * @param {Object} node - The current node in the template.
 * @param {boolean} type - Indicates if the function is for an event.
 * @returns {Function} A function to evaluate the expression.
 */
const expToFn = (cp, loopVars, a, node, type) => {
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
    if (type === 'event') {
      let stFn = 'const $_bbnData = {';
      bbn.fn.each(args, arg => {
        stFn += `  ${arg}: bbn.fn.hash(${arg}),\n`;
      });
      stFn += `};\n`;
      stFn += `if (bbnData.isWatching) {bbnData.watchStarted = true;}\n`;
      stFn += `${a.exp}\n`;
      stFn += `if (bbnData.watchStarted) {bbnData.watchStarted = false;}\n`;
      bbn.fn.each(args, arg => {
        stFn += `if ($_bbnData['${arg}'] !== bbn.fn.hash(${arg})) {\n`;
        if (loopVars[arg]) {
        }
        else if (Object.hasOwn(cp, arg)) {
          stFn += `  this['${arg}'] = ${arg};\n`;
        }
        stFn += `}\n`;
      });
      a.fn = new Function(...args, stFn);
    }
    else {
      let stFn = `if (bbnData.isWatching) {bbnData.watchStarted = true;}\n`;
      stFn += 'const $_bbnRes = (' + (a.exp || (node.type === 'else' ? 'true' : '')) + ')\n';
      stFn += `if (bbnData.watchStarted) {bbnData.watchStarted = false;}\n`;
      stFn += `return $_bbnRes;\n`;
      a.fn = new Function(...args, stFn);
      if (type === 'model') {
        a.setter = new Function('bbnValue', ...args, a.exp + ' = bbnValue; return bbnValkue;');
      }
    }

    a.args = args;
    return args;
  }

  return [];
};


/**
 * Processes the template of a component and maps dependencies.
 * It adds functions and necessary argument names to resolve dynamic values.
 * 
 * @param {bbnCp} cp - The component instance to process.
 */
export default function mapDependencies(cp) {
  const elemSrc = cp.$el.constructor === bbnAnon ? cp.$el : cp.$el.constructor;
  // Avoid remapping if already done for the component.
  if (elemSrc.bbnMapped) {
    return;
  }

  // Object to store loop variables for each node.
  const loopVars = {};

  // Iterate over each node in the component's map.
  bbn.fn.iterate(cp.$currentMap, node => {
    const deps = [];

    // Process loop-related attributes.
    if (node.loop) {
      const args = expToFn(cp, loopVars, node.loop, node);
      deps.push(...args);
      loopVars[node.id] = [
        ...node.loop.item ? [node.loop.item] : [],
        ...node.loop.index ? [node.loop.index] : []
      ];

      expToFn(cp, loopVars, node.loopItem, node);
      if (node.loopIndex) {
        expToFn(cp, loopVars, node.loopIndex, node);
      }
    }
    // Process condition-related attributes.
    if (node.condition) {
      const args = expToFn(cp, node.condition.type === 'else' ? {} : loopVars, node.condition, node);
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
          const args = expToFn(cp, loopVars, a, node, 'event');
          deps.push(...args);
        }
      });
    }

    if (node.model) {
      bbn.fn.iterate(node.model, a => {
        if (a.exp) {
          const args = expToFn(cp, loopVars, a, node, 'model');
          deps.push(...args);
        }
      });
    }

    if (node.directives) {
      bbn.fn.iterate(node.directives, a => {
        if (a.exp) {
          const args = expToFn(cp, loopVars, a, node);
          deps.push(...args);
        }
      });
    }

    // Store unique dependencies for each node.
    node.dependencies = bbn.fn.unique(deps);
    Object.freeze(node);
  });

  Object.defineProperty(elemSrc, 'bbnMapped', {
    value: true,
    writable: false,
    configurable: false
  });
}
