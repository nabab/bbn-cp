import bbn from "@bbn/bbn";

/**
 * Removes a component from the global components index.
 * 
 * @param {string} cid - The component ID to be removed.
 * @throws {Error} If the component ID is not provided or the component does not exist.
 */
export default function removeComponent(cid) {
  // Validate that the component ID is provided.
  if (!cid) {
    throw Error("The component doesn't have a component ID");
  }

  // Retrieve the component from the global components index using the provided ID.
  const cp = bbn.cp.componentsIndex.get(cid);

  // Check if the component exists in the index.
  if (!cp) {
    // Throw an error if the component is not found in the index.
    throw Error("The component is already removed");
  }

  // If the component exists, remove it from the global components index.
  bbn.cp.componentsIndex.delete(cid);
}
