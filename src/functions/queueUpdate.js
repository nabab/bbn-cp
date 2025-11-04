import bbn from "@bbn/bbn";
import bbnComputed from "../lib/Computed.js";

/**
 * 
 * @param  {...Object} items 
 */
export default function queueUpdate(...items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.num) {
      item.num = bbn.cp.numTicks;
    }

    if (item.component.$isDestroyed) {
      continue;
    }

    if (item.element?.setLastRequest) {
      item.element.setLastRequest();
    }

    bbn.cp.queue.push(item);
  }

  bbn.cp.startTick();
}
