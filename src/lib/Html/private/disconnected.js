import onHook from "./onHook.js";

/**
 * Shuts everything down
 * @returns 
 */
export default function disconnected(cp) {
  if (!cp.$isDestroyed && !cp.isConnected && cp.$isInit) {
    if (cp.matches('.bbn-is-moving') || cp.closest('.bbn-is-moving')) {
      return;
    }
    //bbn.fn.log("Disconnected callback from " + cp.$el.tagName);
    // Sending beforeDestroy event
    onHook(cp, 'beforeDestroy');
    if (cp.bbnSchema.events?.['hook:beforedestroy']) {
      const beforeDestroy = new Event('hook:beforedestroy');
      cp.dispatchEvent(beforeDestroy);
    }
    
    //bbn.fn.log("Before disconnected callback from " + cp.$el.tagName + ' / ' + cp.$el.bbnSchema.id);
    cp.$destroy();
  }
}
