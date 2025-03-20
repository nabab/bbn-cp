import bbnData from "../Data.js";

bbnData.stopWatching = function(from) {
  if (from) {
    bbnData.currentWatchers.shift();
  }

  const res = this.stoppers.pop()();
  this.lastSequence = res.length ? res[res.length - 1] : null;
  this.isWatching = !!this.stoppers.length;
  this.watchStarted = this.isWatching;
  return res;
}
