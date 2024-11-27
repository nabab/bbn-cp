import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import deleteNodes from "../Cp/private/deleteNodes.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnConditionAttr extends bbnAttr
{
  attrSet() {
    if (this.node.loop) {
      return;
    }

    const allIfs = this.node.parent.items.filter(a => (a.conditionId === this.node.conditionId));
    let conditionValue;
    let isTrue = false;
    let isPassed = false;
    for (let i = 0; i < allIfs.length; i++) {
      const ai = allIfs[i];
      if (ai.condition.id === this.id) {
        isPassed = true;
        if (this.type === 'else') {
          if (this.value !== !isTrue) {
            this.attrSetResult(!isTrue);
          }
          //bbn.fn.log(["ON COND", this.value, this.attrGetValue()])
        }
        else if (isTrue) {
          if (this.value) {
            this.attrSetResult(false);
          }
        }
        else {
          this.attrGetValue();
        }

        conditionValue = this.value;
        if (conditionValue) {
          isTrue = true;
        }
      }
      else {
        const node = this.node.component.$retrieveElement(ai.id, this.node.hash)?.bbnSchema;

        if (node?.condition) {
          if (isTrue || (node.condition.type === 'else')) {
            if (node.condition.value !== !isTrue) {
              node.condition.attrSetResult(!isTrue);
            }
          }
          else {
            node.condition.attrGetValue();
          }

          if (node.condition.value) {
            isTrue = true;
            if (node.isCommented) {
              if (node.forget) {
                node.forget.attrUpdate();
              }
              else {
                node.setComment(false);
              }
            }
          }
          else if (!node.isCommented) {
            node.setComment(true);
            deleteNodes(node.component, node.id, node.hash);
          }
        }
      }
    }

    if (conditionValue && this.node.isCommented) {
      if (this.node.forget) {
        this.node.forget.attrUpdate();
      }
      else {
        this.node.setComment(false);
      }
    }
    else if (!conditionValue && !this.node.isCommented) {
      this.node.setComment(true);
      deleteNodes(this.node.component, this.node.id, this.node.hash);
    }
  }

  attrUpdate(init) {
    const node = this.node;
    const cp = node.component;
    if (!init) {
      if (node.isOut) {
        bbn.fn.log("CONDITION IS OUT");
        return;
      }
      
      this.attrSet();

      /*
      bbn.fn.log([
        "UPDATE ATTR CONDIFION",
        this,
        "ID: " + this.id, 
        "HASH: " + this.hash,
        "isChanged: " + this.isChanged,
        "numBuild: " + this.node.component.$numBuild,
        "VALUE: " + this.value,
        "EXP: " + this.exp,
        "GET VALUE: " + this.attrGetValue(),
        "SET RESULT: " + this.attrSetResult(),
        this.node.data,
        this.node.component[this.exp],
        this.result
      ])
      */
    }


    // If the condition is true, treat the element.

    // Special handling for specific node tags like 'template', 'transition', 'slot'.
    if (node.forget?.value || ['template', 'transition', 'slot'].includes(this.node.tag)) {
      if (node.items) {
        if (!this.attrGetValue()) {
          deleteNodes(cp, node.id, node.hash);
        }
        else if ((node.tag === 'template') && !node.element) {
          node.nodeInit();
        }
      }
    }
    else {
      const isComment = !this.attrGetValue(init);
      if (!isComment && this.node.forget) {
        node.forget.attrUpdate();
      }
    }
  }
}
