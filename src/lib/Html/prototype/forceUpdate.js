import bbnProtoHtml from "../../Html/Proto.js";
import initResults from "../private/initResults.js";

bbnProtoHtml.$forceUpdate = async function (fn) {
  for (let n in this.$namespaces) {
    if (this.$namespaces[n] === 'computed') {
      this.$computed[n].computedUpdate();
    }
  }
}