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
    throw new Error("The component doesn't have a component ID");
  }

  // Check if the component exists in the index.
  if (!bbn.cp.componentsIndex.has(cid)) {
    // Throw an error if the component is not found in the index.
    bbn.fn.log(["The component is already removed", cid]);
  }
  else {
    bbn.cp.componentsIndex.delete(cid);
  }

  // If the component exists, remove it from the global components index.
}
