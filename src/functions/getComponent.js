/**
 * Retrieves a component in the document based on its id.
 * Every instance of bbnComponentObject is registered through its
 * unique ID in the static #components property
 * @param {Symbol} id 
 * @returns {bbnCp|null} 
 */
export default function getComponent(id) {
  return this.componentsIndex.get(id) || null;
}
