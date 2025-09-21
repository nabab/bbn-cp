import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnConditionAttr extends bbnAttr
{
  keep = false;
  #isConditionUpdating = false;
  get isConditionUpdating() {
    return this.#isConditionUpdating;
  }

  constructor(def, node, name) {
    super(def, node, name);
    if (def.keep) {
      this.keep = true;
    }
  }

  attrSet() {
    const node = this.node;
    const cp = node.component;

    if (node.loop) {
      return;
    }

    const allIfs = this.node.parent.items.filter(a => (a.conditionId === node.conditionId));
    const isOrigin = allIfs.filter(a => cp.$retrieveNode(a.id, node.hash)?.condition?.isConditionUpdating).length === 0;
    if (isOrigin) {
      this.#isConditionUpdating = true;
      for (let i = 0; i < allIfs.length; i++) {
        const n = cp.$retrieveNode(allIfs[i].id, node.hash);
        if (n?.condition) {
          n.condition.setLastRequest();
        }
      }

      bbn.cp.numTicks++;
    }

    let conditionValue;
    let isTrue = false;
    let isPassed = false;

    if (isOrigin) {
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
              let num = otherCondNode.nodeClean();
              //bbn.fn.log(["CLEANING OTHER COND", num]);
            }
          }
        }
      }
    }
    else {
      conditionValue = this.attrGetValue();
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
      if (node.transition) {
        requestAnimationFrame(() => {
          if (!node.transition.running) {
            node.nodeClean();
          }
        });
      }
      else {
        let num = node.nodeClean();
        //bbn.fn.log(["CLEANING CONDITION", num]);
      }
    }

    if (isOrigin) {
      this.#isConditionUpdating = false;
    }
  }

  attrUpdate(init) {
    const node = this.node;
    if (!init) {
      if (node.isOut) {
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
          let num = node.nodeClean();
          //bbn.fn.log(["FORGET CONDITION", num]);
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
