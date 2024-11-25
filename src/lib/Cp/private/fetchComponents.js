/**
 * Deletes the given property from the given object using static method
 * @returns {Array|null}
 */
export default async function fetchComponents (cp) {
  if (bbn.cp.unknown.length) {
    while (bbn.cp.unknown.length) {
      let unknown = bbn.cp.unknown[0];
      await bbn.cp.fetchComponents([unknown]);
    }

    return true;
  }

  return false;
}