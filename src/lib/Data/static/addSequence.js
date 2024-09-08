import bbnData from "../Data.js";

bbnData.addSequence = function(component, name, data = null) {
  if (name.toString) {
    name = name.toString();
  }

  if (this.watchStarted && bbn.fn.isString(name)) {
    if (!bbn.fn.getRow(this.watchSequence, d => d?.component === component && d?.name === name & d?.data === data)) {
      this.watchSequence.push({component, name, data});
    }

  }
};
