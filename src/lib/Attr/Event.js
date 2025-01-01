import bbn from "@bbn/bbn";
import bbnAttr from "../Attr.js";
import initResults from "../Cp/private/initResults.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnEventAttr extends bbnAttr
{
  attrSet() {

  }

  attrUpdate(init) {
    if (!init) {
      //bbn.fn.log("UPDATE ATTR EVENT " + this.name)
    }
  
    if (init) {
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

      if (this.node.element && init) {//} && !this.node.element.bbnEventsApplied[this.name]) {
        //this.node.element.bbnEventsApplied[this.name] = true;
        this.node.element.addEventListener(this.name, e => {
          const node = this.node;
          const cp = node.component;
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
          if (this.fn) {
            const args = [];
            // Process each argument for the event handler.
            if (this.args?.length) {
              bbn.fn.each(this.args, a => {
                if (a === '$event') {
                  args.push(e); // Pass the event object itself.
                }
                else {
                  // Process and push other arguments.
                  args.push(this.retrieveArgument(a, node.hash, [node.data]));
                }
              });
            }

            if (e.detail?.args) {
              args.push(...e.detail.args);
            }

            //bbn.fn.log(['EVENT', this.name, args, this.exp]);

            if (cp.$namespaces[this.exp] === 'method') {
              if (e.detail?.args) {
                cp.$methods[this.exp].bind(cp)(...e.detail.args);
              }
              else {
                cp.$methods[this.exp].bind(cp)(e);
              }
            }
            else {
              // Bind the event handler to the component and execute it with the processed arguments.
              this.fn.bind(cp)(...args);
            }
          }

        }, cfg);
      }
    }
  }
}