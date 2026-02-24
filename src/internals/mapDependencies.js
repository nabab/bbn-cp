import bbnAnonHtml from "../lib/Html/Anon.js";
/**
 * Converts an expression into a function for dynamic value resolution.
 * @param {HTMLElement} cp - The component instance.
 * @param {Object} loopVars - The loop variables in the current context.
 * @param {Object} a - The attribute or property object.
 * @param {Object} node - The current node in the template.
 * @param {boolean} type - Indicates if the function is for an event.
 * @returns {Function} A function to evaluate the expression.
 */
const expToFn = (cp, loopVars, a, node, type) => {
  if (a.exp) {
    const args = [];
    Object.keys(cp.$namespaces).forEach(arg => {
      const matcher = (arg.indexOf('$') === 0 ? '' : '\\b') + bbn.fn.escapeRegExp(arg) + '\\b';
      const rgxp = new RegExp('^' + matcher + '|[^.]+' + matcher);
      if (a.exp.match(rgxp)) {
        args.push(arg);
      }
    });
    for (let k in loopVars) {
      if (node.id.indexOf(k) === 0) {
        args.push(...loopVars[k]);
      }
    }

    let stFn = '  \'use strict\';\n';
    if (type === 'event') {
      stFn += '  const $_bbnData = {';
      args.forEach(arg => {
        stFn += `    ${arg}: bbnData.hash(${arg}),\n`;
      });
      stFn += `  };\n`;
      stFn += `  ${a.exp}\n`;
      args.forEach(arg => {
        stFn += `  if ($_bbnData['${arg}'] !== bbnData.hash(${arg})) {\n`;
        if (loopVars[arg]) {
        }
        else if (Object.hasOwn(cp, arg)) {
          stFn += `    this['${arg}'] = ${arg};\n`;
        }
        stFn += `  }\n`;
      });
      if (a.argNames) {
        a.attrFn = new Function(...[...args, ...a.argNames.map(b => b.name)], stFn);
      }
      else {
        a.attrFn = new Function(...args, stFn);
      }
      a.stFn = stFn;
    }
    else {
      stFn += '  const $_bbnRes = (' + (a.exp || (node.type === 'else' ? 'true' : '')) + ')\n';
      stFn += `  return $_bbnRes;\n`;
      a.attrFn = new Function(...args, stFn);
      a.stFn = stFn;
      if (type === 'model') {
        a.setter = new Function('bbnValue', ...args, '  \'use strict\';\n  ' + a.exp + ' = bbnValue;\n  return bbnValue;');
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
 * @param {HTMLElement} cp - The component instance to process.
 */
export default function mapDependencies(cp) {
  const elemSrc = cp.constructor === bbnAnonHtml ? cp : cp.constructor;
  // Avoid remapping if already done for the component.
  if (elemSrc.bbnMapped) {
    return;
  }

  if (elemSrc.bbnMapping === undefined) {
    Object.defineProperty(elemSrc, 'bbnMapping', {
      value: true,
      writable: true,
      configurable: false
    });
  }
  else {
    return;
  }
 
  
  // Object to store loop variables for each node.
  const loopVars = {};

  // Iterate over each node in the component's map.
  bbn.fn.iterate(cp.$currentMap, node => {
    // Process loop-related attributes.
    if (node.loop) {
      expToFn(cp, loopVars, node.loop, node);
      loopVars[node.id] = [
        ...(node.loop.item ? [node.loop.item] : []),
        ...(node.loop.index ? [node.loop.index] : [])
      ];

      expToFn(cp, loopVars, node.loopItem, node);
      if (node.loopIndex) {
        expToFn(cp, loopVars, node.loopIndex, node);
      }
      if (node.attr.key) {
        expToFn(cp, loopVars, node.attr.key, node);
      }
    }
    if (node.vars) {
      expToFn(cp, loopVars, node.vars, node);
      if (loopVars[node.id]) {
        loopVars[node.id].push(...node.vars.names);
      }
      else {
        loopVars[node.id] = [...node.vars.names];
      }
    }
    // Process condition-related attributes.
    if (node.condition) {
      expToFn(cp, node.condition.type === 'else' ? {} : loopVars, node.condition, node);
    }

    if (node.forget) {
      expToFn(cp, loopVars, node.forget, node);
    }

    if (node.bind) {
      expToFn(cp, loopVars, node.bind, node);
    }

    if (node.attr) {
      for (const n in node.attr) {
        const a = node.attr[n];
        if (a.exp && (!node.loop || (n !== 'key'))) {
          expToFn(cp, loopVars, a, node);
        }
      }
    }
    else if (node.text?.exp) {
      node.text.exp = '`' + node.text.exp + '`';
      expToFn(cp, loopVars, node.text, node);
    }

    if (node.events) {
      bbn.fn.iterate(node.events, a => {
        if (a.exp) {
          expToFn(cp, loopVars, a, node, 'event');
        }
      });
    }

    if (node.model) {
      bbn.fn.iterate(node.model, a => {
        if (a.exp) {
          expToFn(cp, loopVars, a, node, 'model');
        }
      });
    }

    if (node.directives) {
      bbn.fn.iterate(node.directives, a => {
        if (a.exp) {
          expToFn(cp, loopVars, a, node);
        }
      });
    }

    // Store unique dependencies for each node.
    //node.dependencies.splice(0, node.dependencies.length, ...bbn.fn.unique(deps));
    Object.freeze(node);
  });

  Object.defineProperty(elemSrc, 'bbnMapped', {
    value: true,
    writable: false,
    configurable: false
  });
  Object.defineProperty(elemSrc, 'bbnMapping', {
    value: false,
    writable: false,
    configurable: false
  });
}
