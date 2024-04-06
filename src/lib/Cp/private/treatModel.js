import bbn from "@bbn/bbn";
import setProp from "./setProp.js";
import setExpResult from "./setExpResult.js";
import bbnData from "../../Data/Data.js";
/**
 * Processes an element in the virtual DOM of a web component.
 * It handles the creation and updating of elements, binding properties and events,
 * processing slots, text nodes, and more.
 * 
 * @param {Object} cp - The component instance containing methods and properties.
 * @param {Object} node - The virtual DOM node to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {HTMLElement} parent - The parent element where the processed element will be appended.
 * @param {Object} data - Additional data that might be required for processing the element.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {HTMLElement|null} The processed element or null if no element is processed.
 */
export default async function treatModel(cp, node, hash, ele, data) {
  if (node.model) {
    for (let name in node.model) {
      let m = node.model[name];
      const eventName = m.modifiers.includes('lazy') ? 'change' : 'input';
      ele.addEventListener(eventName, async e => {
        if (!cp.$isMounted) {
          return;
        }

        let modelValue = m.value;
        let eventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
        let oldValue = modelValue;

        if (oldValue !== eventValue) {
          cp.$numBuilds++;
          if (Object.hasOwn(data, m.exp)) {
            data[m.exp] = eventValue;
          }
          else if (Object.hasOwn(cp.$namespaces, m.exp)) {
            cp[m.exp] = eventValue;
          }
          else {
            bbnData.startWatching();
            setExpResult(cp, m, hash, data, true);
            const dataObj = bbnData.getLastUsed();
            if (!dataObj) {
              throw new Error("Invalid model variable " + m.exp);
            }

            dataObj.data.value[dataObj.name] = eventValue;
          }

          m.value = eventValue;
          if (ele.bbn) {
            await ele.bbn.$forceUpdate();
          }

          await cp.$forceUpdate();
        }
      });
    }
  }

  
  return null;
}
