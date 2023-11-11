import bbnData from "../Data.js";

// Returns the full path of a data object in a component
bbnData.prototype.getImpacted = function(key) {
  const seq = [];
  if (key) {
    seq.push(key);
  }
  const res = [];
  bbn.fn.each(this.refs, it => {
    let bits = seq.slice();
    bits.unshift(it.path);
    if (it.parent) {
      let all = it.parent.getImpacted();
      bbn.fn.each(all, a => {
        res.push({
          cp: it.component,
          path: a.path.concat(bits)
        });
      })
    }
    else {
      res.push({
        cp: it.component,
        path: bits
      });
    }

  });

  return res;
}
