import bbn from "@bbn/bbn";
import treatArgument from "./treatArgument.js";

/**
 * Attaches event listeners to a specified element based on defined events and configurations.
 * It processes each event, applies any specified modifiers, and binds the event handler to the component.
 * 
 * @param {Object} cp - The context provider (component instance) containing methods and properties.
 * @param {HTMLElement} ele - The HTML element to which the event listeners will be attached.
 */
export default function treatEvents(cp, ele) {
  // Determine the id for the element, defaulting to '0' if it's the component's root element.
  let id = ele.bbnId;
  if (ele === cp.$el) {
    id = '0';
  }

  // Iterate over each event defined for the element.
  bbn.fn.iterate(cp.$currentMap[id].events, (ev, n) => {
    // Configuration object for the event listener.
    let cfg = {};
    if (ev.once) {
      cfg.once = true;
    }
    if (ev.passive) {
      cfg.passive = true;
    }
    if (ev.capture) {
      cfg.capture = true;
    }

    // Add the event listener to the element.
    ele.addEventListener(n, e => {
      // Check for any specified modifiers and apply them.
      if (ev.modifiers.length) {
        if (n.indexOf('key') === 0) {
          // For keyboard events, check if the key matches any specified modifiers.
          if (!e.key || !ev.modifiers.includes(e.key.toLowerCase())) {
            return;
          }
        }
        else if (n.indexOf('mouse') === 0) {
          // For mouse events, check for specific button modifiers (right or left click).
          if (ev.modifiers.includes('right') && e.button !== 2) {
            return;
          }
          else if (ev.modifiers.includes('left') && e.button !== 0) {
            return;
          }
        }
      }

      // If specified, prevent the default action for the event.
      if (ev.prevent) {
        e.preventDefault();
      }

      // If specified, stop the propagation of the event.
      if (ev.stop) {
        e.stopImmediatePropagation();
      }

      // If an expression is defined for the event, execute it.
      if (ev.exp) {
        const args = [];
        // Process each argument for the event handler.
        bbn.fn.each(ev.args, a => {
          if (a === '$event') {
            args.push(e); // Pass the event object itself.
          }
          else {
            // Process and push other arguments.
            args.push(treatArgument(cp, a, ele.bbnSchema.loopHash));
          }
        });
        // Bind the event handler to the component and execute it with the processed arguments.
        ev.fn.bind(cp)(...args);
      }
    }, cfg);
  });
}
