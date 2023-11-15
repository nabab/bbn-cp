import bbnCp from "../Cp.js";

/**
 * Deletes the given property from the given object using static method
 * @returns {Array|null}
 */
bbnCp.prototype.$fetchComponents = async function () {
  if (this.$root.$unknownComponents.length) {
    let unknown = this.$root.$unknownComponents.splice(0, this.$root.$unknownComponents.length);
    const res = await bbn.cp.fetchComponents(unknown);
    return res;
  }

  return false;
}