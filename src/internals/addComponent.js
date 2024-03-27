/**
 * Adds a new component to the static global #components property
 * @var {HTMLElement} ele
 * @return void
 */
export default function addComponent(ele) {
  const cid = ele.bbnCid;
  if (!cid) {
    throw new Error("The component doesn't have a component ID")
  }

  const cp = bbn.cp.componentsIndex.get(cid);
  if (cp) {
    if (cp !== ele) {
      bbn.fn.log(ele, cp);
      throw new Error("The component already exists")
    }
  }
  else {
    bbn.cp.componentsIndex.set(cid, ele);
  }
}
