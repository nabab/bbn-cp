import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnConditionAttr extends bbnAttr
{
  attrSet() {
    const node = this.node;
    const cp = node.component;

    if (node.loop) {
      return;
    }

    const allIfs = this.node.parent.items.filter(a => (a.conditionId === node.conditionId));
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
        const otherCondNode = cp.$retrieveElement(ai.id, node.hash)?.bbnSchema;
        if (otherCondNode?.condition) {
          if (isTrue || (otherCondNode.condition.type === 'else')) {
            if (otherCondNode.condition.value !== !isTrue) {
              otherCondNode.condition.attrSetResult(!isTrue);
            }
          }
          else {
            otherCondNode.condition.attrGetValue();
          }

          if (otherCondNode.condition.value) {
            isTrue = true;
            if (otherCondNode.isCommented) {
              if (node.forget) {
                otherCondNode.forget.attrUpdate();
              }
              else {
                otherCondNode.nodeSwitch(false);
              }
            }
          }
          else if (!otherCondNode.isCommented) {
            otherCondNode.nodeSwitch(true);
            otherCondNode.nodeClean();
          }
        }
      }
    }

    if (conditionValue && node.isCommented) {
      if (node.forget) {
        node.forget.attrUpdate();
      }
      else {
        node.nodeSwitch(false);
      }
    }
    else if (!conditionValue && !node.isCommented) {
      node.nodeSwitch(true);
      node.nodeClean();
    }
  }

  attrUpdate(init) {
    const node = this.node;
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

    // Special handling for specific node tags like 'template', 'slot'.
    if (node.forget?.value || ['template', 'slot'].includes(this.node.tag)) {
      if (node.items) {
        if (!this.attrGetValue()) {
          bbn.fn.log(["DELETE NODES7", node.id, node.component, node, node.element]);
          node.nodeClean();
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
