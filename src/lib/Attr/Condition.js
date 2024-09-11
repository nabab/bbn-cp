import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import removeDOM from "../Cp/private/removeDOM.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnConditionAttr extends bbnAttr
{
  async set() {
    if (this.node.loop) {
      return;
    }

    const allIfs = this.node.parent.items.filter(a => (a.conditionId === this.node.conditionId));
    let conditionValue;
    let isTrue = false;
    let isPassed = false;
    const num = ++bbn.cp.numTicks;
    for (let i = 0; i < allIfs.length; i++) {
      const ai = allIfs[i];
      if (ai.condition.id === this.id) {
        isPassed = true;
        if (this.type === 'else') {
          if (this.value !== !isTrue) {
            this.setResult(!isTrue);
          }
          //bbn.fn.log(["ON COND", this.value, this.getValue()])
        }
        else if (isTrue) {
          if (this.value) {
            this.setResult(false);
          }
        }
        else {
          this.getValue();
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
              node.condition.setResult(!isTrue);
            }
          }
          else {
            node.condition.getValue();
          }

          if (node.condition.value) {
            isTrue = true;
            if (node.isCommented) {
              if (node.forget) {
                bbn.cp.queueUpdate({element: node.forget, num});
              }
              else {
                await node.setComment(false);
              }
            }
          }
          else if (!node.isCommented) {
            await node.setComment(true);
          }
        }
      }
    }

    if (conditionValue && this.node.isCommented) {
      if (this.node.forget) {
        bbn.cp.queueUpdate({element: this.node.forget, num});
      }
      else {
        await this.node.setComment(false);
      }
    }
    else if (!conditionValue && !this.node.isCommented) {
      await this.node.setComment(true);
    }
  }

  async update(init) {
    if (!init) {
      if (this.node.isOut) {
        return;
      }
      
      await this.set();

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
        "GET VALUE: " + this.getValue(),
        "SET RESULT: " + this.setResult(),
        this.node.data,
        this.node.component[this.exp],
        this.node.component.$expResults[this.id]
      ])
      */
    }


    // If the condition is true, treat the element.

    // Special handling for specific node tags like 'template', 'transition', 'slot'.
    if (this.node.forget?.value || ['template', 'transition', 'slot'].includes(this.node.tag)) {
      if (this.node.items) {
        if (!this.getValue()) {
          // Iterate over each item in the node.
          bbn.fn.each(this.node.items, it => {
            let e = this.node.component.$retrieveElement(it.id, this.node.hash);
            // Remove the element if it exists and is not a comment.
            if (e) {
              removeDOM(this.node.component, e);
            }
          });
        }
        else if (this.node.tag === 'template') {
          this.node.init();
        }
      }
    }
    else {
      const isComment = !this.getValue(init);
      if (!isComment && this.node.forget) {
        await this.node.forget.update();
      }
      else {
        await this.node.setComment(isComment);
      }
    }
  }
}
