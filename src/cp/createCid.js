/**
 * Creates a unique ID for a component
 */
export default function createCid() {
  let cid = 'bbncp-' + bbn.fn.randomString(24, 32).toLowerCase();
  while (this.componentsIndex.has(cid)) {
    cid = 'bbncp-' + bbn.fn.randomString(24, 32).toLowerCase();
  }

  return cid;
}
