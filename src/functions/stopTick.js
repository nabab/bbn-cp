/**
 * @name bbn.cp.stopTick
 * @package @bbn/bbn-cp
 * 
 * @description Stops the tick of the application.
 */
export default function stopTick() {
  if (!bbn.cp.interval) {
    throw new Error(bbn._("The tick is not started"));
  }

  clearInterval(bbn.cp.interval);
  bbn.cp.interval = null;
}
