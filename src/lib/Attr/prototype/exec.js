import bbnAttr from "../Attr.js";
import bbnConditionAttr from "../Condition.js";

/**
 * Retrieves the arguments for evaluating the given attribute with the given data.
 * 
 * @param {bbnAttr} attr 
 * @param {Object} data 
 * @returns {Array}
 */
const getArgs = (attr, data) => {
  return attr.args ? attr.args.map(a => {
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
  }) : [];
};

/**
 * Executes the attribute's function with the given data if applicable.
 * 
 * @param {Object} data 
 * @returns 
 */
bbnAttr.prototype.attrExec = function(data) {
  // If the attribute does not have a function, return.
  if (!this.fn) {
    return;
  }

  const newData = data ? [data] : [];
  if (this.node.data) {
    newData.push(this.node.data);
  }

  bbnData.startWatching(this);
  const args = getArgs(this, newData);
  const seq = bbnData.stopWatching(this);
  if (!(this instanceof bbnConditionAttr) && !(this instanceof bbnModelAttr) && bbn.cp.results.has(this)) {
    const tmp = bbn.cp.results.get(this);
    let isSame = true;
    for (let i = 0; i < args.length; i++) {
      if (tmp.args[i] !== args[i]) {
        isSame = false;
        break;
      }
    }

    if (isSame) {
      //return tmp.res;
    }
  }

  let val;
  bbnData.startWatching(this);
  try {
    val = this.fn.bind(this.node.component)(...args);
  }
  catch (e) {
    bbnData.stopWatching(this);
    bbn.fn.log(
      "*****************",
      "Error in attrExec",
      "*****************",
      e,
      "COMPONENT: " + this.node.component.$options.name,
      this.node.component,
      "ARGUMENTS",
      args,
      "FUNCTION: " + this.exp,
      "ATTRIBUTE " + this.name,
      this,
      "*****************",
    );
    throw e;
  }

  seq.push(...bbnData.stopWatching(this));
  const res = {val, seq};
  if (!(this instanceof bbnConditionAttr) && !(this instanceof bbnModelAttr)) {
    bbn.cp.results.set(this, {args, res});
  }

  return res;
};

