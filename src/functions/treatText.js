import bbn from "@bbn/bbn";
import sr from "../internals/sr.js";

export default function treatText (node, hash, go) {
  if (node.text) {
    const val = sr(cp, node, hash);
    if (go || (cp.$_getInternalState(node.id, hash) !== 'OK')) {
      const ele = cp.$retrieveElement(node.id, hash);
      if (ele && (ele.textContent !== val)) {
        ele.textContent = val;
      }
      else {
        go = true;
      }
    }
    if (go) {
      return cp.$createText({
        id: node.id,
        hash: node.hash,
        text: val,
        loopHash: hash
      });
    }
  }

  return null;
}
