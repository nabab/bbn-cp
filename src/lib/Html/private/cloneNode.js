
const allowed = ['id', 'args', 'attr', 'bind', 'condition', 'conditionId', 'dependencies', 'directives', 'events', 'exp', 'fn', 'forget', 'hash', 'loopIndex', 'loopItem', 'model', 'pre', 'tag', 'text', 'transition'];
export default function cloneNode(cp, id)
{
  const element = cp.$currentMap[id];
  if (!element) {
    throw new Error("Impossible to find the element " + id + " in " + cp.$options.name);
  }

  const clone = bbn.fn.createObject();
  bbn.fn.each(allowed, a => {
    if (Object.hasOwn(element, a)) {
      clone[a] = bbn.fn.isObject(element[a]) ? bbn.fn.clone(element[a]) : element[a];
    }
  });
  /*
  if (cp.$cfg.componentNames[clone.tag]) {
    clone.tag = cp.$cfg.componentNames[clone.tag];
  }
  clone.props = bbn.fn.createObject();
  clone.comment = false;
  */

  return clone;
}