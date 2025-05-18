import bbnAttr from "./Attr.js";
import initResults from "../Html/private/initResults.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnEventAttr extends bbnAttr
{
  handler = null;
  cfg = null;
  attrSet() {
    if (!this.handler) {
      // Configuration object for the event listener.
      let cfg = {};
      if (this.once) {
        cfg.once = true;
      }
      if (this.passive) {
        cfg.passive = true;
      }
      if (this.capture) {
        cfg.capture = true;
      }
      if (this.bubbles) {
        cfg.bubbles = true;
      }

      const node = this.node;
      const cp = node.component;
      this.cfg = cfg;
      this.handler = e => {
        initResults(cp);
        //bbn.fn.log("EVENT " + this.name)
        // Check for any specified modifiers and apply them.
        if (this.modifiers.length) {
          if (this.name.indexOf('key') === 0) {
            // For keyboard events, check if the key matches any specified modifiers.
            if (!e.key || (!this.modifiers.includes(e.key.toLowerCase()) && !this.modifiers.includes(e.code.toLowerCase()))) {
              return;
            }
          }
          else if (this.name.indexOf('mouse') === 0) {
            // For mouse events, check for specific button modifiers (right or left click).
            if (this.modifiers.includes('right') && e.button !== 2) {
              return;
            }
            else if (this.modifiers.includes('left') && e.button !== 0) {
              return;
            }
          }
        }

        // If specified, prevent the default action for the event.
        if (this.prevent) {
          e.preventDefault();
        }

        // If specified, stop the propagation of the event.
        if (this.stop) {
          e.stopImmediatePropagation();
        }

        // If an expression is defined for the event, execute it.
        if (this.attrFn) {
          this.attrExec({'$event': e});
        }
      };
    }
  }

  attrUpdate(init) {
    if (!init) {
      //bbn.fn.log("UPDATE ATTR EVENT " + this.name)
    }
  
    if (init) {
      if (this.node.element) {//} && !this.node.element.bbnEventsApplied[this.name]) {
        //this.node.element.bbnEventsApplied[this.name] = true;
        this.node.element.addEventListener(this.name, this.handler, this.cfg);
      }
    }
  }
}