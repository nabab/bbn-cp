/**
 * Launches the component's connectedCallback
 * @param {bbnCp} cp 
 */
export default function connectedCallback(ele) {
  if (ele.bbnId && !ele.bbn) {
    ele.bbn = new (ele.bbnFn || ele.constructor.bbnFn)(ele);
    if (ele.bbnConnected) {
      ele.bbn.$connected();
    }
  }
}
