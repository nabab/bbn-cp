export default function stopTick() {
  if (!bbn.cp.interval) {
    throw new Error(bbn._("The tick is not started"));
  }

  clearInterval(bbn.cp.interval);
  bbn.cp.interval = null;
}
