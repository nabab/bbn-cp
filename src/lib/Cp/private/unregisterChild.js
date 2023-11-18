/**
 * Unregister the given child of the component from the $children array
 */
export default function unregisterChild(cp, child) {
  let idx = cp.$children.indexOf(child);
  if (idx > -1) {
    cp.$children.splice(idx, 1);
  }
}