/**
 * Recursively maps template items to a map object.
 * 
 * @param {Object} map - The map object to populate.
 * @param {Array} items - The array of template items to map.
 */
const createMap = (map, items) => {
  // Iterate over each item in the template array.
  bbn.fn.each(items, a => {
    if (a.tag && !['component'].includes(a.tag)) {
      a.templateElement = document.createElement(a.tag.toUpperCase());
      bbn.fn.each(a.attr, attr => {
        if (attr.name.indexOf('bbn-') && !attr.exp && (a.templateElement[attr.name] !== undefined)) {
          a.templateElement.setAttribute(attr.name, attr.value);
        }
      });
    }
    else if (a.text) {
      a.templateElement = document.createTextNode(a.text.exp ? '' : a.text.value);
    }
    else {
      a.templateElement = document.createElement('SPAN');
    }
    // Add each item to the map with its ID as the key.
    map[a.id] = a;

    // If the item has child items, recursively map them as well.
    if (a.items) {
      createMap(map, a.items);
      bbn.fn.each(a.items, item => {
        a.templateElement.appendChild(item.templateElement);
      });
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
