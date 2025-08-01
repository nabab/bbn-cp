/**
 * Launches the component's connectedCallback
 * @param {HTMLElement} cp 
 */
export default function connectedCallback(ele) {
  if (ele.classList.has('bbn-is-moving')) {
    return;
  }

  if (ele.bbnComponent) {
    ele.bbnComponent.$components.add(ele);
  }

  if (ele.bbnId && !ele.bbn) {
    ele.bbn = ele;
    if (ele.bbnConnected) {
      ele.$connected();
    }
  }
}
