import tryMount from "./tryMount.js";

/**
 * Register the given child of the component into the $children array
 */
export default function registerChild(child) {
  bbn.fn.checkType(child, bbnCp, "The child must be a bbn component");
  const parent = child.$parent;
  const origin = child.$origin;
  const idx = origin.$components.indexOf(child.$el);
  if (idx === -1) {
    bbn.fn.warning("The child is not a child of the component");
    bbn.fn.log([origin.$options.name, child.$options.name, origin, child.$el, origin.$components.indexOf(child)]);
    return;
  }

  origin.$components.splice(idx, 1, child);
  if (parent) {
    parent.$children.push(child);
    parent.$emit('bbn-register-child', child);
  }
  origin.$emit('bbn-register-component', child);
}
