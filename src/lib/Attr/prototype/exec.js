import bbnAttr from "../Attr.js";
import bbnConditionAttr from "../Condition.js";

const getArgs = (attr, data) => {
  return attr.args ? attr.args.map(a => {
    let res;
    try {
      // Process each argument using retrieveArgument.
      res = attr.retrieveArgument(a, attr.node.hash, data);
    }
    catch(e) {
      // Log and rethrow any errors encountered during argument processing.
      bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, attr.node.component, this]);
      throw Error(e.message + ' (' + bbn._("Expression") + ': ' + attr.exp + ')');
    }

    return res; // Return the processed argument.
  }) : [];
};

bbnAttr.prototype.attrExec = function(data) {
  if (!this.fn) {
    return;
  }

  const newData = data ? [data] : [];
  if (this.node.data) {
    newData.push(this.node.data);
  }

  bbnData.startWatching();
  const args = getArgs(this, newData);
  const seq = bbnData.stopWatching();
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
  bbnData.startWatching();
  try {
    val = this.fn.bind(this.node.component)(...args);
  }
  catch (e) {
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

  seq.push(...bbnData.stopWatching());
  const res = {val, seq};
  if (!(this instanceof bbnConditionAttr) && !(this instanceof bbnModelAttr)) {
    bbn.cp.results.set(this, {args, res});
  }

  return res;
};

