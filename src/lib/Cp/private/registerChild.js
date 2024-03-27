/**
 * Register the given child of the component into the $children array
 */
export default function registerChild(cp, child) {
  bbn.fn.checkType(child, Object, "The child must be an object");
  cp.$children.push(child);
  if (cp.onRegisterChild) {
    cp.onRegisterChild(child);
  }
}