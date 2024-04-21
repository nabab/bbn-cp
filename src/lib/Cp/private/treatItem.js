import getIdBefore from "./getIdBefore.js";
import treatNode from "./treatNode.js";
import treatLoop from "./treatLoop.js";
import cloneNode from "./cloneNode.js";
import setConditionResult from "./setConditionResult.js";
import treatCondition from "./treatCondition.js";
import setExpResult from "./setExpResult.js";
import bbn from "@bbn/bbn";


export default async function treatItem(cp, item, hash, parent, data, hashList = []) {
  if (item.loop) {
    return await treatLoop(cp, item, hash, parent, data, hashList);
  }
  else {
    const ele = cp.$retrieveElement(item.id, hash);
    const node = ele ? ele.bbnSchema : cloneNode(cp, item.id);
    node.loopHash = hash;
    hashList.push(node.id + (hash ? '_' + hash : ''));
    if (node.condition) {
      let isConditionPossible = true;
      // Processing all nodes with the same conditionId
      if (!node.condition.type.indexOf('else')) {
        let id = item.id;
        while (id = getIdBefore(cp, id)) {
          //bbn.fn.log("CHACKING CONDITION " + id);
          const elem = cp.$retrieveElement(id, hash);
          if (!elem) {
            continue;
          }

          const o = elem.bbnSchema;
          if (o.conditionId === node.conditionId) {
            if (cp.$expResults[o.condition.hash]?.[hash || '_root']?.value) {
              isConditionPossible = false;
              break;
            }
          }
          else if (o.tag) {
            break;
          }
        }
      }

      const conditionValue = isConditionPossible ? (
        node.condition.type === 'else' ?
          true : setExpResult(cp, node.condition, hash, data)
      ) : false;
      setConditionResult(cp, node.condition, conditionValue ? true : false, hash, data);
      // Apply the condition to the current node.
      return await treatCondition(cp, conditionValue, node, hash, parent, data, hashList);
    }
    else {
      // Process nodes without conditions.
      return await treatNode(cp, node, hash, parent, data, true, hashList);
    }
  }
}