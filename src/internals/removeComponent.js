import bbn from "@bbn/bbn";

export default function removeComponent(cid) {
  if (!cid) {
    throw new Error("The component doesn't have a component ID")
  }

  const cp = bbn.cp.componentsIndex.get(cid);
  if (!cp) {
    bbn.fn.log(["The component is already removed", cid]);
    //throw new Error("The component is already removed")
  }

  bbn.cp.componentsIndex.delete(cid);
}
