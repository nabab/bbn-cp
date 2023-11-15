import bbn from "@bbn/bbn";

/**
 * Creates a unique ID for a component
 */
export default function createCid() {
  let cid = 'bbncp-' + bbn.fn.randomString(24, 32).toLowerCase();
  while (bbn.cp.componentsIndex.has(cid)) {
    cid = 'bbncp-' + bbn.fn.randomString(24, 32).toLowerCase();
  }

  return cid;
}
