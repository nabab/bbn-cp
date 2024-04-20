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
      const eventName = node.model[name].modifiers.includes('lazy') ? 'change' : 'input';
      ele.addEventListener(eventName, async e => {
        const cpSource = bbn.cp.getComponent(ele.bbnComponentId).bbn;
        if (!cp.$isMounted) {
          //return;
        }
        
        if (name === '_default_') {
          name = ele?.bbn?.$cfg?.model?.prop || 'value';
        }

        let eventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
        let m = node.model[name];
        if (eventValue && m.modifiers?.length) {
          for (let i = 0; i < m.modifiers.length; i++) {
            switch (m.modifiers[i]) {
              case 'decimal':
                eventValue = parseFloat(eventValue);
                break;
              case 'number':
                eventValue = parseInt(eventValue);
                break;
              case 'trim':
                eventValue = eventValue.trim();
                break;
              case 'lowercase':
              case 'lower':
                eventValue = eventValue.toLowerCase();
                break;
              case 'uppercase':
              case 'upper':
              case 'capitalize':
                eventValue = eventValue.toUpperCase();
                break;
            }
          }
        }

        let modelValue = m.value;
        let oldValue = modelValue;
        if (oldValue !== eventValue) {
          //bbn.fn.log(['Modfel change', oldValue, m, m.exp, JSON.stringify(Object.keys(node.model)), eventValue, name, cpSource.$namespaces[m.exp]])
          if (Object.hasOwn(data, m.exp)) {
            data[m.exp] = eventValue;
          }
          else if (Object.hasOwn(cpSource.$namespaces, m.exp)) {
            switch (cpSource.$namespaces[m.exp]) {
              case 'props':
                setProp(cpSource, m.exp, eventValue);
                break;
              case 'data':
              case 'computed':
                cpSource[m.exp] = eventValue;
                break;
              default:
                throw new Error("Invalid namespace " + cpSource.$namespaces[m.exp]);
            }
          }
          else {
            bbnData.startWatching();
            setExpResult(cpSource, m, hash, data, true);
            const dataObj = bbnData.getLastUsed();
            if (!dataObj) {
              throw new Error("Invalid model variable " + m.exp);
            }

            dataObj.data.value[dataObj.name] = eventValue;
            //bbn.fn.log(["MODEL THROUGH BBN DATA", dataObj.name]);
          }

          await cpSource.$tick();
          if (cp !== cpSource) {
            await cp.$tick();
          }
        }
      });
    }
  }

  
  return null;
}
