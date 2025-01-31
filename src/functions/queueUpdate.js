import bbn from "@bbn/bbn";

/**
 * Updates the given directives to the target element.
 * 
 * This function is designed to update directives on a specified target element. 
 * It iterates through each directive, checks if there's an associated update 
 * function and if the directive's value has changed since the last update, 
 * and then calls the update function. 
 * This is typically part of a reactive system where directives need to respond 
 * to changes in data or state. The function ensures that each directive is updated 
 * as needed, reflecting any changes in the state or properties it's bound to.
 * 
 * @param {Object} directives - An object containing the directives to be updated.
 * @param {HTMLElement} target - The DOM element to which the directives are applied.
 */
export default function queueUpdate(item) {
  if (!item.num) {
    item.num = bbn.cp.numTicks;
  }

  if (item.element) {
    const idx = bbn.fn.search(bbn.cp.queue, {element: item.element});
    if (idx > -1) {
      bbn.cp.queue.splice(idx, 1);
    }
  }

  bbn.cp.queue.push(item);
  bbn.cp.startTick();
}
