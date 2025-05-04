import bbnAttr from "../Attr.js";

/**
 * Retrieves the arguments for evaluating the given attribute with the given data.
 * 
 * @param {bbnAttr} attr 
 * @param {Object} data 
 * @param {Array} real 
 * @returns {Array}
 */
const getArgs = (attr, data, real) => {
  return (real ? real : attr.args).map(a => {
    let res;
    try {
      // Process each argument using retrieveArgument.
      res = attr.retrieveArgument(a, attr.node.hash, data);
    }
    catch(e) {
      // Log and rethrow any errors encountered during argument processing.
      bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, attr.node.component, attr, data]);
      throw new Error(e.message + ' (' + bbn._("Expression") + ': ' + attr.exp + ')');
    }

    return res; // Return the processed argument.
  });
};

/**
 * Executes the attribute's function with the given data if applicable.
 * 
 * @param {Object} data 
 * @returns 
 */
bbnAttr.prototype.attrExec = function(data) {
  // If the attribute does not have a function, return.
  if (!this.attrFn) {
    return;
  }

  const usedVars = [];//data?.$event?.detail?.args?.length ? this.args.slice() : (data?.$event ? ['$event'] : []);
  for (let i = 0; i < this.args.length; i++) {
    if (this.args[i] in window) {
      bbn.fn.log("ARGUMENT " + this.args[i] + " IN WINDOW");
      usedVars.push(this.args[i]);
    }
  }

  const newData = data ? [data] : [];
  const node = this.node;
  const cp = node.component;
  if (node.data) {
    newData.push(node.data);
  }

  let val;
  let isDone = false;
  const seq = [];
  let attempts = 0;
  while (!isDone) {
    let stFn = '\'use strict\';\n';
    let fn;
    let args = [];
    try {
      attempts++;
      if (this instanceof bbnEventAttr) {
        args = getArgs(this, newData, usedVars);
        stFn += '  const $_bbnData = {';
        bbn.fn.each(usedVars, arg => {
          let isInData = false;
          for (let i = 0; i < newData.length; i++) {
            if (arg in newData[i]) {
              isInData = true;
              break;
            }
          }

          if (!isInData && (arg in cp.$namespaces) && (cp.$namespaces[arg] !== 'method')) {
            stFn += `    ${arg}: bbnData.hash(${arg}),\n`;
          }
        });
        stFn += `  };\n`;
        stFn += `  ${this.exp}` + (this.exp in cp.$methods ? '(...($event?.detail?.args || [$event]))' : '') + `\n`;
        bbn.fn.each(usedVars, arg => {
          let isInData = false;
          for (let i = 0; i < newData.length; i++) {
            if (arg in newData[i]) {
              isInData = true;
              break;
            }
          }

          if (!isInData && (arg in cp.$namespaces) && (cp.$namespaces[arg] !== 'method')) {
            stFn += `  if ($_bbnData['${arg}'] !== bbnData.hash(${arg})) {\n`;
            stFn += `    this['${arg}'] = ${arg};\n`;
            stFn += `  }\n`;
          }

        });
      }
      else {
        bbnData.startWatching(this);
        args = getArgs(this, newData, usedVars);
        stFn += 'const $_bbnRes = (' + (this.exp || (node.type === 'else' ? 'true' : '')) + ')\n';
        stFn += `return $_bbnRes;\n`;
      }

      if (!fn) {
        if (this.argNames) {
          fn = new Function(...[...usedVars, ...this.argNames.map(b => b.name)], stFn);
        }
        else {
          fn = new Function(...usedVars, stFn);
        }
      }

      val = fn.bind(cp)(...args);
      /*
      if (bbn.fn.isFunction(val) && data?.$event) {
        if (data.$event.detail?.args?.length) {
          val = val(...data.$event.detail.args);
        }
        else {
          val = val(data.$event);
        }
      }
        */
      //val = makeFn(this, usedArgs).bind(cp)(...args);
      if (!(this instanceof bbnEventAttr)) {
        seq.push(...bbnData.stopWatching(this));
      }
      isDone = true;
      //bbn.fn.log(["ECEC", stFn, usedVars, this]);
    }
    catch (e) {
      if (!(this instanceof bbnEventAttr)) {
        bbnData.stopWatching(this);
      }
      if (e instanceof ReferenceError) {
        const varName = e.message.split(' ')[0];
        //bbn.fn.log("ADDING " + varName + " TO " + stFn);
        usedVars.push(varName);
      }
      else {
        isDone = true;
        bbn.fn.log(
          "*****************",
          "Error in attrExec",
          "*****************",
          e,
          stFn,
          "COMPONENT: " + this.node.component.$options.name,
          this.node.component,
          "ARGUMENTS",
          usedVars,
          args,
          "FUNCTION: " + this.exp,
          "ATTRIBUTE " + this.name,
          this,
          "*****************",
        );
        throw e;
      }
    }
  }

  return {val, seq};
};

