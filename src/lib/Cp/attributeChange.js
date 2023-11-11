import bbnCp from "../Cp.js";

/**
 * Reacts to change of attributes by emitting an update event
 * 
 * @todo The event updated shouldn't be here but during DOM creation process
 * @param {String} name The attribute's name
 * @param {String} oldValue The attribute's old value
 * @param {String} newValue The attribute's new value
 * @returns {undefined}
 */
bbnCp.prototype.$attributeChange = function (name, oldValue, newValue) {
  /*
  const realName = name.indexOf(':') === 0 ? name.substr(1) : name;

  bbn.fn.log("ATTR------------>")
  if (this.acceptedAttributes.includes(realName)) {
    this.bbn.$attr[name] = newValue;
    this.bbn.$setProp(name, newValue);
    if (this.bbn.$isMounted) {
      this.bbn.$tick();
      const updated = new Event('updated');
      this.bbn.$onHook('updated');
      this.dispatchEvent(updated);
    }
  }
  */
}