import bbn from "@bbn/bbn";

const expToFn = (cp, loopVars, a, node, isEvent) => {
  if (a.exp) {
    const deps = [];
    bbn.fn.each(Object.keys(cp.$namespaces), arg => {
      if (a.exp.match(new RegExp((arg.indexOf('$') === 0 ? '' : '\\b') + bbn.fn.escapeRegExp(arg) + '\\b'))) {
        deps.push(arg);
      }
    });
    const args = deps.slice();
    if (isEvent) {
      args.push('$event');
    }

    bbn.fn.iterate(loopVars, (v, k) => {
      if (node.id.indexOf(k) === 0) {
        args.push(...v);
      }
    });
    if (isEvent) {
      let stFn = '';
      if (cp.$namespaces[a.exp] === 'method') {
        stFn += a.exp + '($event)';
      }
      else {
        stFn += 'const $_bbnData = {';
        bbn.fn.each(args, arg => {
          stFn += `  ${arg}: bbn.fn.hash(${arg}),\n`;
        });
        stFn += `};\n`;
        stFn += `${a.exp}\n`;
        bbn.fn.each(args, arg => {
          stFn += `if ($_bbnData['${arg}'] !== bbn.fn.hash(${arg})) {\n`;
          if (loopVars[arg]) {
          }
          else if (Object.hasOwn(cp, arg)) {
            stFn += `  this['${arg}'] = ${arg};\n`;
            stFn += `bbn.fn.log(["SEEMS TO WORK", "${arg}", ${arg}]);\n`;
          }
          stFn += `}\n`;
        });
      }
      a.fn = new Function(...args, stFn);
    }
    else {
      a.fn = new Function(...args, 'return (' + (a.exp || (node.type === 'else' ? 'true' : '')) + ')');
    }

    a.args = args;
    return args;
  }

  return [];
};


/**
 * Go once through the template and add functions and needed arguments' names for resolving dynamic values
 * @param {bbnCp} cp 
 * @returns {void} 
 */
export default function mapDependencies(cp) {
  if (cp.$el.constructor.bbnMapped && cp.$el.constructor !== bbnAnon) {
    return;
  }

  const loopVars = {};
  bbn.fn.iterate(cp.$currentMap, node => {
    const deps = [];
    if (node.loop) {
      const args = expToFn(cp, loopVars, node.loop, node);
      deps.push(...args);
      loopVars[node.id] = [
        ...node.loop.item ? [node.loop.item] : [],
        ...node.loop.index ? [node.loop.index] : []
      ];
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
          const args = expToFn(cp, loopVars, a, node, true);
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

    if (node.directives) {
      bbn.fn.iterate(node.directives, a => {
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
