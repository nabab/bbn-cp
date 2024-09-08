import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnDirectiveAttr extends bbnAttr
{
  inserted = false;

  update(init) {
    //bbn.fn.log("UPDATE ATTR DIRECTIVE " + this.name)
  
    if (!this.inserted) {
      // Check if the "inserted" function exists on this directive
      if (bbn.fn.isFunction(bbn.cp.directives[this.name].inserted)) {
        // Set the directive as initialized
        // Initialize the directive
        bbn.cp.directives[this.name].inserted(this.node.element, this);
        this.inserted = true;
      }
      else {
        throw new Error(bbn._("Unrecognized directive %s", this.name));
      }
    }
    else if (this.isChanged) {
      // Call the 'update' function of the directive with the target element and directive info.
      bbn.cp.directives[this.name].update(this.node.element, this);
    }
  }
}