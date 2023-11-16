import bbnCp from "../Cp.js";

bbnCp.prototype.$_getInternalState = function (_name, _hash) {
  if (!_hash) {
    _hash = '_root';
  }
  if (!this.$currentResult[_name]?.[_hash]) {
    bbn.fn.log("STATE", this.$currentResult, this.$tpl, _name, _hash);
    throw new Error(_name + '  ---  ' + _hash + ' are not defined in ' + this.$options.name);
  }
  return this.$currentResult[_name][_hash].state;
}