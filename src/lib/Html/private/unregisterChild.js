import tryMount from "./tryMount.js";

/**
 * Unregister the given child of the component from the $children array
 */
export default function unregisterChild(child) {
  if (child.bbnComponent) {
    child.bbnComponent.$components.remove(child);
  }
}