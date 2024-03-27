import bbn from "@bbn/bbn";
import setProp from "./setProp.js";
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
      const modelVarName = m.exp;
      const modelVarBits = bbn.fn.removeEmpty(modelVarName
              .replace(/\[([^\[\]]*)\]/g, '.$1.')
              .split('.'));
      const modelVarRoot = modelVarBits.shift();
      const eventName = m.modifiers.includes('lazy') ? 'change' : 'input';
      //.value = node.props[name];

      //bbn.fn.log("treatModel VALUE: " + m.value + " (" + name + ")", node)

      let modelValue = m.value;
      ele.addEventListener(eventName, e => {
        let eventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
        let oldValue = modelValue;
        if (oldValue !== eventValue) {
          //bbn.fn.log(["MOSWL LISTENER", modelVarRoot, modelVarName, modelVarBits, eventValue]);
          if (modelVarRoot === modelVarName) {
            if (Object.hasOwn(data, modelVarRoot)) {
              data[modelVarRoot] = eventValue;
            }
            else if (Object.hasOwn(node.props, modelVarRoot)) {
              //bbn.fn.log("IS A PROP " + _bbnRealName, cp.$options.name, oldValue, eventValue);
              setProp(cp, modelVarRoot, eventValue);
            }
            else if (Object.hasOwn(cp, modelVarRoot)) {
              cp[modelVarRoot] = eventValue;
            }
            else {
              throw new Error("Invalid model variable " + modelVarName);
            }
          }
          else if (Object.hasOwn(data, modelVarRoot)) {
            const obj = modelVarBits.length > 1 ? bbn.fn.getProperty(data[modelVarRoot], ...modelVarBits.slice(0, -1)) : data[modelVarRoot];
            obj[modelVarBits[modelVarBits.length - 1]] = eventValue;
          }
          else if (cp.$namespaces[modelVarRoot]) {
            let obj = cp[modelVarRoot];
            bbn.fn.each(modelVarBits, (v, i) => {
              if (!Object.hasOwn(obj, v) && Object.hasOwn(data, v)) {
                modelVarBits[i] = data[v];
                obj = obj[data[v]];
              }
              else {
                obj = obj[v];
              }
            });
            //bbn.fn.log(["MOSWL LISTENER 2", obj]);
            obj = modelVarBits.length > 1 ? bbn.fn.getProperty(cp[modelVarRoot], ...modelVarBits.slice(0, -1)) : cp[modelVarRoot];
            obj[modelVarBits[modelVarBits.length - 1]] = eventValue;
          }
          else {
            throw new Error("Invalid model variable " + modelVarName);
          }
          modelValue = eventValue;
          cp.$tick();

          if (ele.bbn) {
            ele.bbn.$tick();
          }

        }
      });
    }
  }

  
  return null;
}
