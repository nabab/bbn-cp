export default function getInternalValue(cp, _name, _hash) {
  if (!_hash) {
    _hash = '_root';
  }
  if (!cp.$currentResult[_name]?.[_hash]) {
    bbn.fn.log("VALUE", cp.$currentResult);
    throw new Error(_name + '  --- ' + _hash + ' are not defined in ' + cp.$options.name);
  }

  return cp.$currentResult[_name][_hash].value;
}