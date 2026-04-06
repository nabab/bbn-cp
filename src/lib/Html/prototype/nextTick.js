import queueUpdate from "../../../functions/queueUpdate.js";
import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$nextTick = async function(fn){
  const f = fn ? bbn.fn.analyzeFunction(fn) : {hash: 'nextTick'}; 
  const cp = this;
  //await bbn.cp.nextFrame();
  bbn.cp.nextQueue.push({
    num: bbn.cp.numTicks+1,
    component: cp,
    fn() {
      let res;
      if (fn) {
        res = fn();
      }

      return res;
    },
    hash: f.hash,
  });
  bbn.cp.run();
}
