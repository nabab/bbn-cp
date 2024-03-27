import disconnected from "../lib/Cp/private/disconnected.js";

/**
 * Launches the component's disconnectedCallback
 * @param {HTMLElement} ele 
 */
export default function disconnectedCallback(ele) {
  if (ele.bbn) {
    disconnected(ele.bbn)
  }
}
