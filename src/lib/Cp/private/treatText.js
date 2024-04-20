import setExpResult from "./setExpResult.js";
import createText from "./createText.js";
import bbn from "@bbn/bbn";

export default function treatText(cp, node, hash, parent, data) {
  bbn.fn.checkType(cp, bbnCp, "No component in treatText");
  if (Object.hasOwn(node, 'text')) {
    const ele = cp.$retrieveElement(node.id, hash);
    const go = !ele;

    if (node.exp) {
      node.text = setExpResult(cp, node, hash, data);
      if (ele && (ele.textContent !== node.text)) {
        ele.textContent = node.text;
      }
    }

    if (go) {
      createText(cp, node, parent);
    }

    return parent;
  }

  return null;
}
