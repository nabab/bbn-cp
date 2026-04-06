import bbnData from "../../Data.js";
import bbnAttr from "../Attr.js";
import bbnConditionAttr from "../Condition.js";
import bbnModelAttr from "../Model.js";

/**
 * Retrieves the arguments for evaluating the given attribute with the given data.
 * 
 * @param {bbnAttr} attr 
 * @param {Object} data 
 * @returns {Array}
 */
const getArgs = (attr, data) => {
  const v = attr.args ? attr.args.map(a => {
    let res;
    try {
      // Process each argument using retrieveArgument.
      res = attr.retrieveArgument(a, attr.node.hash, data);
    }
    catch(e) {
      bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, attr.node.component, attr, data]);
      debugger;
      // Log and rethrow any errors encountered during argument processing.
      throw new Error(e.message + ' (' + bbn._("Expression") + ': ' + attr.exp + ')');
    }

    return res; // Return the processed argument.
  }) : [];

  return v;
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

  const newData = data ? [data] : [];
  if (this.node.data) {
    newData.push(this.node.data);
  }
  else {
    let node = this.node.parent;
    while (node) {
      if (node.data) {
        newData.push(node.data);
        break;
      }

      node = node.parent;
    }
  }

  const loopOk = !this.node.loop || (this.constructor.name === 'bbnLoopAttr');
  if (loopOk) {
    bbnData.startWatching(this);
  }

  const args = getArgs(this, newData);

  const seq = [];
  if (loopOk) {
    seq.push(...bbnData.stopWatching(this));
  }

  let val;
  if (loopOk) {
    bbnData.startWatching(this);
  }
  try {
    val = this.attrFn.bind(this.node.component)(...args);
  }
  catch (e) {
    if (loopOk) {
      bbnData.stopWatching(this);
    }

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

  if (loopOk) {
    seq.push(...bbnData.stopWatching(this));
  }

  const res = {val, seq};

  return res;
};

