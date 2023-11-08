export default function isComponent(node) {
  if (!node) {
    return false;
  }

  if (node.$options && node.$options._componentTag) {
    return true;
  }

  // HTMLElement
  if (node.bbnCid) {
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
    return node.attr.is.value.indexOf('-') > -1;
  }

  if (node.tag) {
    if (node.tag.indexOf('bbns-') === 0) {
      return false;
    }

    return node.tag.indexOf('-') > -1;
  }

  return false;
}
