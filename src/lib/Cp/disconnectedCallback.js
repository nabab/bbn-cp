import bbnCp from "../Cp.js";
import removeComponent from "../../internals/removeComponent.js";

/**
 * Shuts everything down
 * @returns 
 */
bbnCp.prototype.$disconnectedCallback = function () {
  //bbn.fn.log("Before disconnected callback from " + this.$el.tagName + ' / ' + this.$el.bbnSchema.id);
  if (!this.$el.isConnected) {
    Object.defineProperty(this, '$isInit', {
      value: false,
      writable: false,
      configurable: true
    });
    //bbn.fn.log("Disconnected callback from " + this.$el.tagName);
    // Sending beforeDestroy event
    const beforeDestroy = new Event('beforedestroy');
    this.$onHook('beforeDestroy');
    this.$el.dispatchEvent(beforeDestroy);
    
    Object.defineProperty(this, '$isDestroyed', {
      value: true,
      writable: false,
      configurable: true
    });
    // Sending destroyed event through a timeout
    // Deleting from elements prop
    while (this.$values.length) {
      let id = this.$values[this.$values.length -1];
      const data = bbnData.retrieve(id);
      if (!data) {
        throw new Error(bbn._("Impossible to find a piece of data in %s", this.$options.name));
      }
      else {
        //bbn.fn.log('Removing 1 loop data for ' + this.$cid + ' in ' + this.$options.name + ' / path: ' + data.path);
        data.removeComponent(this);
      }
    }

    removeComponent(this.$el.bbnCid);
    /*
    this.$el.childNodes.forEach(node => {
      this.$removeDOM(node);
    });
    this.$removeFromElements(this.$el.bbnId, this.$el.bbnHash);
    */
    // Setting back $isinit
    const destroyed = new Event('destroyed');
    this.$onHook('destroyed');
    this.$el.dispatchEvent(destroyed);
  }
}