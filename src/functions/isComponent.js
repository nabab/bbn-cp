/**
 * Returns true if the given argument is component, under the form of a bbnSchema object, an HTML element or directly a component
 * @param {Object} node 
 * @returns 
 */
export default function isComponent(node) {
  if (!node) {
    return false;
  }

  if ((node instanceof HTMLElement) && node.bbnCid) {
    return true;
  }

  if (bbn.fn.isObject(node) && node.__bbnComponent) {
    return true;
  }

  // Node object
  if (node.props?.is) {
    if (bbn.fn.isObject(node.props.is)) {
      return true;
    }

    return node.props.is.indexOf('-') > -1;
  }

  if (node.attr?.is?.value) {
    return bbn.fn.isObject(node.attr.is.value) || (node.attr.is.value.indexOf('-') > -1);
  }

  if (node.tag) {
    if (node.tag.indexOf('bbns-') === 0) {
      return false;
    }

    return node.tag.indexOf('-') > -1;
  }

  return false;
}
