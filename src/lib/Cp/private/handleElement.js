import treatNode from "./treatNode.js";

export default async function handleElement(cp, id, hash) {
  // The properties of the component
  const props = bbn.fn.createObject();
  const element = cp.$retrieveElement(id, hash);
  if (!element) {
    throw new Error("Impossible to find the element " + id + " in " + cp.$options.name);
  }

  bbn.fn.error("TREAT NODE ON HANDLE")
  await treatNode(cp, cp.$currentMap[id], element.bbnHash, element.parentNode, element.bbnLoopVars);
}