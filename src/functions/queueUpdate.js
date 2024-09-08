import bbnComputed from "../lib/Computed/Computed.js";
import bbnConditionAttr from "../lib/Attr/Condition.js";
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
export default function queueUpdate(element) {
  //if (!bbn.cp.queue.includes(element)) {
    bbn.cp.queue.push(element);
  //}
}
