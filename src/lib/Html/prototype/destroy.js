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

  for (const dataInst of [...this.$dataInstances]) {
    dataInst.unset();
  }

  for (let n in this.$refs) {
    delete this.$refs[n];
  }

  for (let n in this.$deps) {
    delete this.$deps[n];
  }

  for (const dataDep of [...this.$dataDeps]) {
    for (let n in dataDep.deps) {
      for (let i = 0; i < dataDep.deps[n].length; i++) {
        if (dataDep.deps[n][i].component === this) {
          dataDep.deps[n].splice(i, 1);
          i--;
        }
      }
    }
    this.$dataDeps.delete(dataDep);
  }

  this.$components.removeAll();
  if (!this.$isCreated) {
    return;
  }
  //bbn.fn.log("DESTROYING: " + this.tagName + ' / ' + this.bbnCid);
  this.$internal.nodeClean(true);
  const hasDestroyEvent = this.bbnSchema.events?.['hook:destroyed'];
  const node = this.bbnSchema;
  Object.defineProperty(this, '$isDestroyed', {
    value: true,
    writable: false,
    configurable: false
  });
  for (let i = 0; i < bbn.cp.queue.length; i++) {
    if (bbn.cp.queue[i].component === this) {
      bbn.cp.queue.splice(i, 1);
      i--;
    }
  }

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

  //bbn.fn.log("DESTROY: " + this.tagName + ' / ' + this.bbnCid + ' / ' + this.$isDestroyed);
  onHook(this, 'destroyed');
  if (hasDestroyEvent) {
    const destroyed = new Event('hook:destroyed');
    this.bbnSchema.events['hook:destroyed'].handler.bind(this.bbnComponent)(destroyed);
  }

  removeComponent(this.bbnCid);
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
  else {
    this.remove();
  }
}
