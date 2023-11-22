import bbnCp from "../Cp.js";

/**
 * Returns true if the given node is a component (or an internal component of the current component)
 * @param {Object} node 
 * @returns 
 */
bbnCp.prototype.$isComponent = function (node) {
  if (node.tag && this.$cfg.componentNames[node.tag]) {
    return true;
  }



  return bbn.cp.isComponent(node);
}