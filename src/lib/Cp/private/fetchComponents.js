/**
 * Deletes the given property from the given object using static method
 * @returns {Array|null}
 */
export default async function fetchComponents (cp) {
  if (cp.$root.$unknownComponents.length) {
    let unknown = cp.$root.$unknownComponents.splice(0, cp.$root.$unknownComponents.length);
    const res = await bbn.cp.fetchComponents(unknown);
    return res;
  }

  return false;
}