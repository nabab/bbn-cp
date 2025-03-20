import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnDirectiveAttr extends bbnAttr
{

  inserted = false;

  attrUpdate(init) {
    if (!this.inserted && !this.node.comment) {
      // Check if the "inserted" function exists on this directive
      if (bbn.fn.isFunction(bbn.cp.directives[this.name].inserted)) {
        // Set the 'oldValue' property of the directive.
        this.oldValue = this.value;
        // Set the 'lastValue' property of the directive.
        this.lastValue = this.value;
        // Initialize the directive
        bbn.cp.directives[this.name].inserted(this.node.element, this);
        // Set the directive as initialized
        this.inserted = true;
      }
      else {
        throw new Error(bbn._("Unrecognized directive %s", this.name));
      }
    }
    else if (this.inserted && this.isChanged) {
      // Update the 'lastUpdate' property of the directive.
      this.lastUpdate = bbn.fn.dateSQL();
      // Update the 'oldValue' property of the directive.
      this.oldValue = this.lastValue;
      // Update the 'lastValue' property of the directive.
      this.lastValue = this.value;
      // Call the 'update' function of the directive with the target element and directive info.
      bbn.cp.directives[this.name].update(this.node.element, this);
    }
  }
}