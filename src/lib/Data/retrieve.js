import bbnData from "../Data.js";

/**
 * Retrieves a bbnData object from its unique id
 * 
 * @param {Symbol} id 
 * @returns 
 */
bbnData.retrieve = function(id) {
  return bbn.cp.dataInventory.get(id);
}
