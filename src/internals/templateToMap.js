/**
 * Recursively maps template items to a map object.
 * 
 * @param {Object} map - The map object to populate.
 * @param {Array} items - The array of template items to map.
 */
const createMap = (map, items) => {
  // Iterate over each item in the template array.
  bbn.fn.each(items, a => {
    // Add each item to the map with its ID as the key.
    map[a.id] = a;

    // If the item has child items, recursively map them as well.
    if (a.items) {
      createMap(map, a.items);
    }
  });
};

/**
 * Converts a template structure into a map for easier access and manipulation.
 * 
 * @param {Array} tpl - The template array to convert.
 * @returns {Object} A map object representing the template structure.
 */
export default function templateToMap(tpl) {
  // Create an empty object to hold the map.
  const map = bbn.fn.createObject();

  // Populate the map using the `createMap` function.
  createMap(map, tpl);

  // Return the populated map.
  return map;
}
