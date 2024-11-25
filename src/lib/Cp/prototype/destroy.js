import bbnCp from "../Cp.js";
import onHook from "../private/onHook.js";
import removeComponent from "../../../internals/removeComponent.js";
import unregisterChild from "../private/unregisterChild.js";

bbnCp.prototype.$destroy = function(){
  if (!this.$el.isConnected && !this.$isDestroyed && this.$isInit) {
    Object.defineProperty(cp, '$isInit', {
      value: false,
      writable: false,
      configurable: true
    });
    //bbn.fn.log("Disconnected callback from " + this.$el.tagName);
    // Sending beforeDestroy event
    const beforeDestroy = new Event('hook:beforedestroy');
    onHook(cp, 'beforeDestroy');
    this.$el.dispatchEvent(beforeDestroy);
    
    if (this.$parent) {
      unregisterChild(this.$parent, cp);
    }
    Object.defineProperty(cp, '$isDestroyed', {
      value: true,
      writable: false,
      configurable: true
    });

    //bbn.fn.log("DISCONNECTED: " + this.$el.tagName + ' / ' + this.$el.bbnSchema.id);
    removeComponent(this.$el.bbnCid);
    for (let idx in this.$nodes) {
      if (this.$nodes[idx] instanceof bbnNode) {
        this.$nodes[idx].attributes.splice(0);
      }
      else {
        for (let n in this.$nodes[idx]) {
          this.$nodes[idx][n].attributes.splice(0);
        }
      }
    }
    // Setting back $isinit
    const destroyed = new Event('hook:destroyed');
    onHook(cp, 'destroyed');
    this.$el.dispatchEvent(destroyed);
    //bbn.fn.log("ENDED DISCONNECTED: " + this.$el.tagName + ' / ' + this.$el.bbnSchema.id);
  }
}
