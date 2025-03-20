import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Checks if the component has a property (or whatever) with the given name
 * @method $hasSlots
 * @fires bbnProtoHtml.$hasSlots
 * @param {String} name
 * @return {Boolean}
 */
bbnProtoHtml.$hasSlots = function(name = 'default') {
  let res = false;
  if (this.$slots[name]) {
    bbn.fn.each(this.$slots[name], e => {
      if (e && !bbn.fn.isComment(e) && (!(e instanceof Text) || bbn.fn.removeExtraSpaces(e.textContent))) {
        res = true;
        return false;
      }
    });
  }

  return res;
}
