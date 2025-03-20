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
      item.num = bbn.cp.numTicks + 1;
    }

    if (item.element) {
      const idx = bbn.fn.search(bbn.cp.queue, a => a.element === item.element);
      if (idx === -1) {
        bbn.cp.queue.push(item);
      }
    }
    else {
      bbn.cp.queue.push(item);
    }
  }

  bbn.cp.startTick();
}
