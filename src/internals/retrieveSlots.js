/**
 * Recursively retrieves slot information from the template structure.
 * 
 * @param {Array} tpl - An array of template nodes to analyze for slots.
 * @param {Object} [res] - The result object to accumulate slot information.
 * @returns {Object} The updated result object containing slot information.
 */
export default function retrieveSlots(tpl, res = bbn.fn.createObject()) {
  // Iterate over each node in the template.
  bbn.fn.each(tpl, node => {
    // Check if the node is a 'slot' tag.
    if (node.tag && (node.tag === 'slot')) {
      // Determine the name of the slot, defaulting to 'default' if not specified.
      let idx = node.attr && node.attr.name ? node.attr.name.value : 'default';
      if (!idx) {
        // Throw an error if the slot name is invalid.
        throw Error(bbn._("Invalid slot name"));
      }

      // Initialize an array for the slot if it's not already present in the result object.
      res[idx] = res[idx] || [];
      // Store the slot's ID.
      res[idx].id = node.id;
    }

    // Recursively process child nodes if they exist.
    if (node.items) {
      retrieveSlots(node.items, res);
    }
  });

  // Return the accumulated result object containing slot information.
  return res;
}
