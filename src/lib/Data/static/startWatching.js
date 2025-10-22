import bbnData from "../Data.js";

bbnData.startWatching = function(from) {
  if (from) {
    if (this.currentWatchers.includes(from)) {
      bbn.fn.log(`WARNING: The attribute is already in the current watchers list`, from);
    }

    this.currentWatchers.unshift(from);
  }

  const currentSequence = this.watchSequence.splice(0);
  this.stoppers.push(() => {
    return this.watchSequence.splice(0, this.watchSequence.length, ...currentSequence);
  });
  if (!this.isWatching) {
    this.lastSequence = null;
    this.isWatching = true;
  }

  this.watchStarted = true;
}
