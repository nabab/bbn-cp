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
    // Sending destroyed event through a timeout
    // Deleting from elements prop
    while (cp.$values.length) {
      let id = cp.$values[cp.$values.length -1];
      const data = bbnData.retrieve(id);
      if (!data) {
        throw Error(bbn._("Impossible to find a piece of data in %s", cp.$options.name));
      }
      else {
        //bbn.fn.log('Removing 1 loop data for ' + cp.$cid + ' in ' + cp.$options.name + ' / path: ' + data.path);
        data.removeComponent(cp);
      }
    }

    removeComponent(cp.$el.bbnCid);
    // Setting back $isinit
    const destroyed = new Event('hook:destroyed');
    onHook(cp, 'destroyed');
    cp.$el.dispatchEvent(destroyed);
  }
}
