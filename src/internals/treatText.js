import bbn from "@bbn/bbn";
import sr from "../internals/sr.js";

export default function treatText (cp, node, hash, go) {
  if (node.text) {
    const ele = cp.$retrieveElement(node.id, hash);
    const val = node.exp ? sr(cp, node, hash) : node.text;
    if (go || (node.exp && cp.$_getInternalState(node.id, hash) !== 'OK')) {
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

    return ele;
  }

  return null;
}
