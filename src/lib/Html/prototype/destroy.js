import bbnProtoHtml from "../../Html/Proto.js";
import removeComponent from "../../../internals/removeComponent.js";
import onHook from "../private/onHook.js";
import unregisterChild from "../private/unregisterChild.js";

bbnProtoHtml.$destroy = function() {
  if (this.$isDestroyed || !this.$isInit) {
    return;
  }

  Object.defineProperty(this, '$isDestroying', {
    value: true,
    writable: false,
    configurable: false
  });

  this.bbnComponent.$components.remove(this);
  unregisterChild(this);
  this.bbnConnected = false;
  if (this.$parent) {
    if (this.$parent.bbnSlots) {
      for (let n in this.$parent.bbnSlots) {
        let idx = this.$parent.bbnSlots[n].indexOf(this);
        if (idx > -1) {
          this.$parent.bbnSlots[n].splice(idx, 1);
        }
      }
    }

    const idx = this.$parent.$children.indexOf(this);
    if (idx > -1) {
      this.$parent.$children.splice(idx, 1);
    }
  }

  while (this.bbnData?.length) {
    const d = this.bbnData.pop();
    d.unset();
  }

  for (let n in this.$refs) {
    delete this.$refs[n];
  }

  for (let n in this.$deps) {
    delete this.$deps[n];
  }

  this.$components.removeAll();
  this.$internal.nodeClean(true);
  const hasDestroyEvent = this.bbnSchema.events?.['hook:destroyed'];
  const node = this.bbnSchema;
  Object.defineProperty(this, '$isDestroyed', {
    value: true,
    writable: false,
    configurable: false
  });

  for (let i = 0; i < node.attributes.length; i++) {
    if (node.attributes[i] instanceof bbnEventAttr) {
      this.removeEventListener(node.attributes[i].name, node.attributes[i].handler, node.attributes[i].cfg);
    }

    if (node.attributes[i] instanceof bbnModelAttr) {
      const eventName = node.attributes[i].modifiers.includes('lazy') ? 'change' : 'input';
      this.removeEventListener(eventName, node.attributes[i].handler);
    }
  }

  if (node && (node.element === this)) {
    node.element = null;
  }
  //bbn.fn.log("DISCONNECTED: " + cp.$el.tagName + ' / ' + cp.$el.bbnSchema.id);
  for (let idx in this.$nodes) {
    delete this.$nodes[idx];
  }

  //bbn.fn.log("DESTROY: " + this.tagName + ' / ' + this.bbnCid + ' / ' + this.$isDestroyed);
  onHook(this, 'destroyed');
  if (hasDestroyEvent) {
    const destroyed = new Event('hook:destroyed');
    this.dispatchEvent(destroyed);
  }

  removeComponent(this.bbnCid);
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
  else {
    this.remove();
  }
}
