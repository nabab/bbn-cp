import bbnCp from "../Cp.js";

bbnCp.prototype.$_setInternalResult = function (_name, _res, _hash) {
  if (!this.$currentResult[_name]) {
    this.$currentResult[_name] = bbn.fn.createObject();
  }
  if (!_hash) {
    _hash = '_root';
  }
  // If not set it's new
  if (!this.$currentResult[_name][_hash]) {
    this.$currentResult[_name][_hash] = bbn.fn.createObject({
      state: 'NEW',
      value: _res
    });
    this.$currentResult[_name][_hash].old = bbnData.hash(this.$currentResult[_name][_hash].value);
  }
  else if (this.$currentResult[_name][_hash].state === 'DEL') {
    this.$currentResult[_name][_hash].value = _res;
    this.$currentResult[_name][_hash].state = 'NEW';
  }
  // If it's a temporary value, we set it
  else if (this.$currentResult[_name][_hash].state === 'TMP') {
    this.$currentResult[_name][_hash].value = _res;
    const _o = bbnData.hash(this.$currentResult[_name][_hash].value);
    if (!bbn.fn.isSame(this.$currentResult[_name][_hash].old, _o)) {
      this.$currentResult[_name][_hash].state = 'MOD';
    }
    else {
      this.$currentResult[_name][_hash].state = 'OK';
    }

    this.$currentResult[_name][_hash].old = _o;
  }

  return this.$currentResult[_name][_hash].value;
}
