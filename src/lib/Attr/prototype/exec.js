import bbnAttr from "../Attr.js";

bbnAttr.prototype.attrExec = function(data) {
  if (!this.fn) {
    return;
  }

  bbnData.startWatching();
  const args = this.args ? this.args.map(a => {
    let res;
    const newData = data ? [data] : [];
    if (this.node.data) {
      newData.push(this.node.data);
    }

    try {
      // Process each argument using retrieveArgument.
      res = this.retrieveArgument(a, this.node.hash, newData);
    }
    catch(e) {
      // Log and rethrow any errors encountered during argument processing.
      bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, this.node.component, this]);
      throw Error(e.message + ' (' + bbn._("Expression") + ': ' + this.exp + ')');
    }

    return res; // Return the processed argument.
  }) : [];
  let val;
  try {
    val = this.fn.bind(this.node.component)(...args);
  }
  catch (e) {
    bbn.fn.log(["ERROR IN EXEC", e, this.node.component, args, this.fn.toString(), this, bbn.cp.queue, bbnComputed.queue, bbnData.queue]);
    throw Error(e.message + ' (' + bbn._("Expression") + ': ' + this.exp + ')');
  }

  const seq = bbnData.stopWatching();
  return {val, seq};
};

