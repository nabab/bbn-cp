import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Checks if the component has a property (or whatever) with the given name
 * @method $has
 * @fires bbnProtoHtml.$has
 * @param {String} propName
 * @return {Function}
 */
bbnProtoHtml.$has = function(propName){
  return propName in this.$namespaces;
}
