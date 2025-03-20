/**
 * Register the given child of the component into the $children array
 */
export default function announceComponent(cp, child) {
  bbn.fn.checkType(child, HTMLElement, "The child must be an object");
  cp.$components.add(child);
}
