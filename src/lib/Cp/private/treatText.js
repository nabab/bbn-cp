import setExpResult from "./setExpResult.js";
import createText from "./createText.js";

export default function treatText(cp, node, hash, parent, data, go = false) {
  bbn.fn.checkType(cp, bbnCp, "No component in treatText");
  if (node.text) {
    const ele = cp.$retrieveElement(node.id, hash);
    if (!ele) {
      go = true;
    }

    const val = cp.$currentMap[node.id].exp ? setExpResult(cp, cp.$currentMap[node.id], hash, data) : node.text;
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
