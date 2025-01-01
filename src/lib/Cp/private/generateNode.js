import bbn from "@bbn/bbn";
import bbnNode from "../../Node.js";
import bbnTextNode from "../../Node/Text.js";
import bbnComponentNode from "../../Node/Component.js";
import bbnSlotNode from "../../Node/Slot.js";
import bbnTemplateNode from "../../Node/Template.js";
import bbnSvgNode from "../../Node/Svg.js";
import bbnTransitionNode from "../../Node/Transition.js";
import bbnInternalNode from "../../Node/Internal.js";


const allowed = ['id', 'args', 'attr', 'condition', 'conditionId', 'dependencies', 'directives', 'events', 'exp', 'fn', 'forget', 'hash', 'loop', 'loopIndex', 'loopItem', 'model', 'pre', 'tag', 'text'];
export default function generateNode(model, cp, parent, root, rootHash, hash, data)
{
  let node;
  if (!model || !model.id) {
    throw new Error("No model or no id in model");
  }

  if (model.id === '0') {
    node = bbnInternalNode;
  }
  else if (model.text && !model.tag) {
    node = bbnTextNode;
  }
  else if (model.tag === 'component') {
    node = bbnComponentNode;
  }
  else if (model.tag === 'slot') {
    node = bbnSlotNode;
  }
  else if (model.tag === 'template') {
    node = bbnTemplateNode;
  }
  else if (model.tag === 'svg') {
    node = bbnSvgNode;
  }
  else if (model.tag === 'transition') {
    node = bbnTransitionNode;
  }
  else if (model.tag) {
    node = bbnNode;
  }
  else {
    throw new Error("Invalid model");
  }

  return new node(model, cp, parent, root, rootHash, hash || '', data);
}