/**
 * Deletes the given property from the given object using static method
 * @returns {Array|null}
 */
export default async function fetchComponent(tag) {
  if (bbn.cp.unknown.length) {
    const last = null;
    while (bbn.cp.unknown.length) {
      let unknown = bbn.cp.unknown[0];
      await bbn.cp.fetchComponent(unknown);
      if (unknown === bbn.cp.unknown[0]) {
        bbn.cp.unknown.shift();
      }
    }

    return true;
  }

  return false;
}