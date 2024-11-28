import tryMount from "./tryMount.js";

/**
 * Unregister the given child of the component from the $children array
 */
export default function unregisterChild(child) {
  if (child.$parent) {
    let idx = child.$parent.$children.indexOf(child);
    if (idx > -1) {
      child.$parent.$children.splice(idx, 1);
    }
  }

  if (child.$origin) {
    let idx = child.$origin.$components.indexOf(child);
    if (idx > -1) {
      child.$origin.$components.splice(idx, 1);
    }
    if (!child.$origin.$isMounted) {
      tryMount(child.$origin);
    }
  }
}