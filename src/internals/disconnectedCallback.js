import disconnected from "../lib/Cp/private/disconnected.js";

/**
 * Launches the component's disconnectedCallback
 * @param {HTMLElement} ele 
 */
export default function disconnectedCallback(ele) {
  if (ele.bbnComponent.$components.includes(ele)) {
    ele.bbnComponent.$components.splice(ele.bbnComponent.$components.indexOf(ele), 1);
  }

  if (ele.bbn) {
    disconnected(ele.bbn)
  }
}
