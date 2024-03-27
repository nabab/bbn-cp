export default function getExpState(cp, _name, _hash) {
  if (!_hash) {
    _hash = '_root';
  }
  if (!cp.$expResults[_name]?.[_hash]) {
    bbn.fn.log("STATE", cp.$expResults);
    throw new Error(_name + '  ---  ' + _hash + ' are not defined in ' + cp.$options.name);
  }

  return cp.$expResults[_name][_hash].state;
}