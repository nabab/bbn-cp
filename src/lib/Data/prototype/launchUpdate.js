import bbnData from "../Data.js";
import updateWatcher from "../../Cp/private/updateWatcher.js";
import bbn from "@bbn/bbn";
import propagateDependencyChanges from "../../Cp/private/propagateDependencyChanges.js";


/**
 * Update all the components linked to the data object
 * @param {Boolean} deep 
 */
bbnData.prototype.launchUpdate = function(it) {

  if (it.lastUpdate > this.lastUpdate) {
    this.lastUpdate = it.lastUpdate;
    //bbn.fn.log(['launchUpdate on ' + JSON.stringify(it.path), it]);
    if (it.component.$namespaces[it.path[0]] && it.component.$deps[it.path[0]]) {
      //propagateDependencyChanges(it.component, it.path[0]);
    }
    
  }
}