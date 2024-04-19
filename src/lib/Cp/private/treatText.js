import setExpResult from "./setExpResult.js";
import createText from "./createText.js";
import bbn from "@bbn/bbn";

export default function treatText(cp, node, hash, parent, data, go = false) {
  bbn.fn.checkType(cp, bbnCp, "No component in treatText");
  if (Object.hasOwn(node, 'text')) {
    const ele = cp.$retrieveElement(node.id, hash);
    if (!ele) {
      go = true;
    }

    const val = node.exp ? setExpResult(cp, node, hash, data) : node.text;
    if (ele && (ele.textContent !== val)) {
      ele.textContent = val;
    }

    if (go) {
      createText(cp, {
        id: node.id,
        hash: node.hash,
        text: val,
        loopHash: hash
      }, parent);
    }

    return parent;
  }

  return null;
}
