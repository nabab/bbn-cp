import bbnAttr from "./Attr.js";

const dispatch = function(ele, type) {
  const ev = new CustomEvent(type, bbn.fn.createObject({
    cancelable: false,
    detail: {
      __bbnEvent: true,
      __bbnCid: ele.bbnComponentId,
      args: [ele]
    }
  }));
  ele.dispatchEvent(ev);
}

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnTransitionAttr extends bbnAttr
{
  prevStyle = null;
  prepareTransition(type, ele) {
    if (!ele) {
      ele = this.node.element;
    }

    if (ele?.classList) {
      const name = this.name || 'bbn';
      ele.classList.add(name + "-" + type + "-from");
      ele.classList.add(name + "-" + type + "-active");
      if (this.multiple) {
        ele.classList.add(name + "-move");
      }
      if ((type === 'leave') && this.helper && this.position) {

        const pos = ele.getBoundingClientRect();
        ele.style.transition = 'none';
        ele.style.left = this.position.left;
        ele.style.top = this.position.top;
        ele.style.width = this.position.width;
        ele.style.height = this.position.height;
        ele.style.position = 'fixed';
        ele.style.transition = this.position.transition;
      }
    }
  }

  executeTransition(type, ele) {
    const node = this.node;
    if (!ele) {
      ele = node.element;
    }

    bbn.fn.checkType(ele, HTMLElement);
    if (!['enter', 'leave'].includes(type)) {
      throw new Error("The type must be 'enter' or 'leave'");
    }
  
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        const transition = ele?.bbnSchema?.transition;
        if (!transition || !ele?.classList) {
          //bbn.fn.log("NO TRANSITION", ele);
          return resolve(true);
        }
  
        transition.num++;
        transition.type = type;
        const num = transition.num;
        const proms = [];
        const name = transition.name || 'bbn';
        if (transition.running) {
          //bbn.fn.log("TRANSITION RUNNING", type);
          if (node.oldElement) {
            const element = node.element;
            const oldElement = node.oldElement;
            this.node.element = oldElement;
            this.node.oldElement = element;
            //bbn.fn.log(["SWITCHING ELEMENTS", element, oldElement]);
          }
          const stype = type === 'leave' ? 'enter' : 'leave';
          ele.classList.add(name + "-" + type + "-to");
          ele.classList.add(name + "-" + type + "-active");
          ele.classList.remove(name + "-" + stype + "-to");
          ele.classList.remove(name + "-" + stype + "-active");
          transition.animations.forEach(a => a.reverse());
        }
        else {
          dispatch(ele, 'before' + type);
          //bbn.fn.log("DISPATCHING " + 'before' + type)
          ele.classList.add(name + "-" + type + "-to");
          ele.classList.remove(name + "-" + type + "-from");
          dispatch(ele, type);
          transition.running = true;
        }

        transition.animations = ele.getAnimations();
        transition.animations.forEach(a => proms.push(a.finished));
        Promise.all(proms).then(() => {
          if (num !== transition.num) {
            return resolve(false);
          }
  
          requestAnimationFrame(() => {
            transition.running = false;
            transition.num = 0;

            dispatch(ele, 'after' + type);
            //bbn.fn.log("DISPATCHING " + 'after' + type, num)
            if (type === 'leave') {
              if (ele.tagName) {
                node.nodeClean();
              }

              if (!ele) {
                debugger;
              }

              node.nodeRemove(ele, true);
            }
            else {
              if (transition.multiple) {
                ele.classList.remove(name + "-move");
              }
      
              ele.classList.remove(name + "-" + type + "-active");
              ele.classList.remove(name + "-" + type + "-to");
              if (this.helper) {
                const pos = ele.getBoundingClientRect();
                this.position = bbn.fn.createObject({
                  left: pos.left + 'px',
                  top: pos.top + 'px',
                  width: pos.width + 'px',
                  height: pos.height + 'px',
                  transition: ele.style.transition,
                  oldStyle: ele.style.cssText
                });
              }
            }

            if (node?.oldElement) {
              node.nodeRemove(node.oldElement, true);
            }

            resolve(true);
          });
        }).catch(e => {
          bbn.fn.log(e);
        })
      });
    });
  }
}
