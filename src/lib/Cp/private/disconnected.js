import bbn from "@bbn/bbn";
import removeComponent from "../../../internals/removeComponent.js";
import onHook from "./onHook.js";
import unregisterChild from "./unregisterChild.js";

/**
 * Shuts everything down
 * @returns 
 */
export default function disconnected(cp) {
  //bbn.fn.log("Before disconnected callback from " + cp.$el.tagName + ' / ' + cp.$el.bbnSchema.id);
  if (!cp.$el.isConnected && !cp.$isDestroyed && cp.$isInit) {
    Object.defineProperty(cp, '$isInit', {
      value: false,
      writable: false,
      configurable: true
    });
    //bbn.fn.log("Disconnected callback from " + cp.$el.tagName);
    // Sending beforeDestroy event
    const beforeDestroy = new Event('hook:beforedestroy');
    onHook(cp, 'beforeDestroy');
    cp.$el.dispatchEvent(beforeDestroy);
    
    unregisterChild(cp);
    Object.defineProperty(cp, '$isDestroyed', {
      value: true,
      writable: false,
      configurable: true
    });

    //bbn.fn.log("DISCONNECTED: " + cp.$el.tagName + ' / ' + cp.$el.bbnSchema.id);
    removeComponent(cp.$el.bbnCid);
    for (let idx in cp.$nodes) {
      if (cp.$nodes[idx] instanceof bbnNode) {
        cp.$nodes[idx].attributes.splice(0);
      }
      else {
        for (let n in cp.$nodes[idx]) {
          cp.$nodes[idx][n].attributes.splice(0);
        }
      }

      delete cp.$nodes[idx];
    }
    // Setting back $isinit
    const destroyed = new Event('hook:destroyed');
    onHook(cp, 'destroyed');
    cp.$el.dispatchEvent(destroyed);
    //bbn.fn.log("ENDED DISCONNECTED: " + cp.$el.tagName + ' / ' + cp.$el.bbnSchema.id);
  }
  else {
    let idx = cp.$el.bbnComponent.$components.indexOf(cp);
    if (idx === -1) {
      idx = cp.$el.bbnComponent.$components.indexOf(cp.$el);
    }
    if (idx > -1) {
      cp.$el.bbnComponent.$components.splice(idx, 1);
    }
  }
}
