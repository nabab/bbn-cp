import bbn from "@bbn/bbn";

export default function treatArgument (a, cp, hash) {
  if (hash
    && bbn.fn.isObject(cp.$currentResult[a])
    && Object.hasOwn(cp.$currentResult[a], hash)
  ) {
    return cp.$currentResult[a][hash].value;
  }
  else if (bbn.fn.isFunction(cp[a])) {
    return cp[a].bind(cp);
  }
  else if (cp.$has(a)) {
    return cp[a];
  }
  else {
    throw new Error(bbn._("Impossible to find the argument %s in component %s", a, cp.$options.name));
  }
}
