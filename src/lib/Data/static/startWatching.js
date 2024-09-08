import bbnData from "../Data.js";

bbnData.startWatching = function() {
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
