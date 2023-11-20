import bbn from "@bbn/bbn";
import sr from "./sr.js";
import setProp from "./setProp.js";
import getInternalValue from "./getInternalValue.js";

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
              .split('.')
              .filter(t => t !== ''));
      const modelVarRoot = modelVarBits[0];
      const eventName = m.modifiers.includes('lazy') ? 'change' : 'input';
      //let _bbnEventName = '${eventName}';
      //let _bbnRealName = '${name}';
      if (name === '_default_') {
        if (cp.$isComponent(ele)) {
          let modelProp = ele.bbnCfg?.model?.prop || ele.constructor?.bbnCfg?.model?.prop || 'value';
          m = node.model[modelProp];
          m.value = node.props[modelProp] = getInternalValue(cp, m.id, hash);
        }
        else {
          m = node.model.value;
          m.value = node.props.value = getInternalValue(cp, m.id, hash);
        }
      }
      else {
        m.value = node.props[name] = getInternalValue(cp, m.id, hash);
      }

      bbn.fn.log("VALUE: " + m.value)
      if (name === '_default_') {
        let modelCfg = cp.$isComponent(ele) ? ele.bbnCfg?.model || ele.constructor?.bbnCfg?.model : {prop: 'value', event: eventName};
        let realName = modelCfg.prop;
        ele.bbnSchema.model[realName] = ele.bbnSchema.model._default_;
        delete ele.bbnSchema.model._default_;
      }

      let modelValue = m.value;
      ele.addEventListener(eventName, e => {
        let eventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
        let oldValue = modelValue;
        if (oldValue !== eventValue) {
          if (modelVarRoot === modelVarName) {
            if (Object.hasOwn(data, modelVarRoot)) {
              data[modelVarRoot] = eventValue;
            }
            else if (Object.hasOwn(node.props, modelVarRoot)) {
              //bbn.fn.log("IS A PROP " + _bbnRealName, cp.$options.name, "${modelVarRoot}", _bbnEventValue);
              setProp(cp, modelVarRoot, eventValue);
            }
            else {
              cp[modelVarRoot] = eventValue;
            }
          }
          else if (Object.hasOwn(data, modelVarRoot)) {
            const obj = bbn.fn.getProperty(data, ...modelVarBits.slice(0, -1));
            obj[modelVarBits[modelVarBits.length - 1]] = eventValue;
          }
          else if (Object.hasOwn(cp, modelVarRoot)) {
            const obj = bbn.fn.getProperty(cp, ...modelVarBits.slice(0, -1));
            obj[modelVarBits[modelVarBits.length - 1]] = eventValue;
          }
          modelValue = eventValue;

          cp.$forceUpdate();
        }
      });
    }
  }

  
  return null;
}
