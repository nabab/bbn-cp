import bbnData from "../../Data.js";

bbnData.addSequence = function(component, name, data = null) {
  if (name.toString) {
    name = name.toString();
  }

  if (this.watchStarted && bbn.fn.isString(name)) {
    const last = this.watchSequence[this.watchSequence.length - 1];
    // Same object, inner property, we only take the last one, so we remove the previous one
    if (data && last?.data && (data.root?.parent === last.data)) {
      this.watchSequence.pop();
    }

    this.watchSequence.push({component, name, data});
  }
};
