import bbnCp from "../Cp.js";

bbnCp.prototype.$_getInternalValue = function (_r, _name, _hash) {
  if (!_hash) {
    _hash = '_root';
  }
  if (!_r[_name]?.[_hash]) {
    bbn.fn.log("VALUE", _r);
    throw new Error(_name + '  --- ' + _hash + ' are not defined in ' + this.$options.name);
  }

  return _r[_name][_hash].value;
}