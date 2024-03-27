/**
 * Recursively retrieves model data from the template structure.
 * 
 * @param {Array} tpl - An array of template nodes to analyze.
 * @param {Object} [res] - The result object to accumulate model data.
 * @returns {Object} The updated result object containing model data.
 */
export default function retrieveModels(tpl, res = bbn.fn.createObject()) {
  // Iterate over each node in the template.
  bbn.fn.each(tpl, node => {
    // Process nodes that have a 'model' property.
    if (node.model) {
      // Iterate over each model in the node.
      bbn.fn.iterate(node.model, (a, name) => {
        // Check if the model hash is already in the result object.
        if (!res[a.hash]) {
          // If not, initialize an object for this model hash.
          res[a.hash] = bbn.fn.createObject();
        }

        // Create a structure for this model in the result object.
        res[a.hash][node.id] = bbn.fn.createObject({
          [name]: bbn.fn.createObject({
            _root: bbn.fn.createObject()
          })
        });
      });
    }

    // Recursively process child nodes and slots, if they exist.
    if (node.items) {
      retrieveModels(node.items, res);
    }
    if (node.slots) {
      retrieveModels(node.slots, res);
    }
  });

  // Return the accumulated result object.
  return res;
}
