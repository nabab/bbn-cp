/**
 * Adds a new component to the static global #components property
 */
export default function addComponent(ele) {
  const cid = ele.bbnCid;
  if (!cid) {
    throw new Error("The component doesn't have a component ID")
  }

  const cp = this.componentsIndex.get(cid);
  if (cp) {
    if (cp !== ele) {
      bbn.fn.log(ele, cp);
      throw new Error("The component already exists")
    }
  }
  else {
    this.componentsIndex.set(cid, ele);
  }
}
