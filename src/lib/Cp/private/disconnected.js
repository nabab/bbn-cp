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
    
    if (cp.$parent) {
      unregisterChild(cp.$parent, cp);
    }
    Object.defineProperty(cp, '$isDestroyed', {
      value: true,
      writable: false,
      configurable: true
    });

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
  }
}
