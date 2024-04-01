export default function getExpValue(cp, _name, _hash) {
  if (!_hash) {
    _hash = '_root';
  }
  if (!cp.$expResults[_name]?.[_hash]) {
    bbn.fn.log("VALUE", cp.$expResults);
    throw Error(_name + '  --- ' + _hash + ' are not defined in ' + cp.$options.name);
  }

  return cp.$expResults[_name][_hash].value;
}