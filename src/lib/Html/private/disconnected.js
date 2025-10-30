import onHook from "./onHook.js";

/**
 * Shuts everything down
 * @returns 
 */
export default function disconnected(cp) {
  if (!cp.$isDestroyed && !cp.$isDestroying && !cp.isConnected && cp.$isInit) {
    if (cp.matches('.bbn-is-moving') || cp.closest('.bbn-is-moving')) {
      return;
    }
    //bbn.fn.log("Disconnected callback from " + cp.$el.tagName);
    //bbn.fn.log("Before disconnected callback from " + cp.$el.tagName + ' / ' + cp.$el.bbnNode.id);
    cp.$destroy();
  }
}
