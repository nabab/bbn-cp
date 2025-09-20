import bbnProtoHtml from "../../Html/Proto.js";

/**
 * Retrieves the elements targeted to the slot, including those in nested slots.
 * @param {String} name 
 * @returns 
 */
bbnProtoHtml.$retrieveSlotItems = function (name) {
  const items = [];
  for (let i = 0; i < this.$slots[name].length; i++) {
    const item = this.$slots[name][i];
    const node = item.bbnSchema;
    if (node?.constructor?.name === 'bbnSlotNode') {
      items.push(...item.bbnComponent.$retrieveSlotItems(node.realName));
    }
    else {
      items.push(item);
    }
  }

  return items;
}
