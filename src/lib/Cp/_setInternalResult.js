import bbnCp from "../Cp.js";

bbnCp.prototype.$_setInternalResult = function (_r, _name, _res, _hash) {
  if (!_r[_name]) {
    _r[_name] = bbn.fn.createObject();
  }
  if (!_hash) {
    _hash = '_root';
  }
  // If not set it's new
  if (!_r[_name][_hash]) {
    _r[_name][_hash] = bbn.fn.createObject({
      state: 'NEW',
      value: _res,
      elements: []
    });
    _r[_name][_hash].old = bbnData.hash(_r[_name][_hash].value);
  }
  else if (_r[_name][_hash].state === 'DEL') {
    _r[_name][_hash].value = _res;
    _r[_name][_hash].state = 'NEW';
  }
  // If it's a temporary value, we set it
  else if (_r[_name][_hash].state === 'TMP') {
    _r[_name][_hash].value = _res;
    const _o = bbnData.hash(_r[_name][_hash].value);
    if (!bbn.fn.isSame(_r[_name][_hash].old, _o)) {
      _r[_name][_hash].state = 'MOD';
    }
    else {
      _r[_name][_hash].state = 'OK';
    }

    _r[_name][_hash].old = _o;
  }

  return _r[_name][_hash].value;
}
