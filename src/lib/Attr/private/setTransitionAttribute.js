export default function setTransitionAttribute(node, name, v) {
  if (!name.indexOf('bbn-transition-') && node.transition) {
    const prop = name.replace('bbn-transition-', '');
    node.transition[prop] = v;
    return true;
  }

  return false;
};
