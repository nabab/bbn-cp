import bbnData from "../Data.js";

bbnData.addSequence = function(component, name, data = null) {
  if (!this.watchStarted || bbn.env.isEnumerating) {
    return;
  }

  if (name.toString) {
    name = name.toString();
  }

  if (bbn.fn.isString(name)) {
    this.watchSequence.push({component, name, data});
  }
};
