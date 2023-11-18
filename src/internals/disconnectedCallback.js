import disconnected from "../lib/Cp/private/disconnected.js";

/**
 * Launches the component's disconnectedCallback
 * @param {bbnCp} cp 
 */
export default function disconnectedCallback(cp) {
  if (cp.bbn) {
    disconnected(cp.bbn)
  }
}
