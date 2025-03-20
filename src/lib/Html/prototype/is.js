import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Checks if the component corresponds to the selector
 * @method is
 * @fires bbn.cp.is
 * @param {String} selector 
 * @return {Function}
 */
bbnProtoHtml.$is = function(selector){
    return this.$el.matches(selector);
  }