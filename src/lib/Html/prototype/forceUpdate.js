import bbnProtoHtml from "../../Html/Proto.js";
import initResults from "../private/initResults.js";

bbnProtoHtml.$forceUpdate = async function (fn) {
  await bbn.cp.startTick();
  await bbn.cp.nextFrame();
  /*
  for (let n in this.$namespaces) {
    if (this.$namespaces[n] === 'computed') {
      this.$computed[n].computedUpdate();
    }
  }*/
}