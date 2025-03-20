import tryMount from "./tryMount.js";

/**
 * Register the given child of the component into the $children array
 */
export default function registerChild(child) {
  bbn.fn.checkType(child, HTMLElement, "The child must be a bbn component");
  const origin = child.bbnComponent;
  if (!origin.$components.has(child.$el)) {
    bbn.fn.warning("The child is not a child of the component");
    bbn.fn.log([origin.$options.name, child.$options.name, origin, child.$el]);
    return;
  }
}
