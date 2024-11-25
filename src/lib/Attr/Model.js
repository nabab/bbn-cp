import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import setProp from "../Cp/private/setProp.js";
import initResults from "../Cp/private/initResults.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnModelAttr extends bbnAttr
{
  attrUpdate(init) {
    if (!this.name || !this.node.parentElement || (!init && this.node.isOut)) {
      return;
    }

    if (!init) {
      this.attrSet();
    }
  
    //bbn.fn.log(["UPDATE ATTR MODEL " + this.name, init, this.node, this.isChanged, this.attrGetValue()]);
    if (this.isChanged) {
      const value = this.attrGetValue();
      if (this.node.props[this.name] !== value) {
        this.node.props[this.name] = value;
      }

      if (this.node.element?.bbn?.$props && Object.hasOwn(this.node.element.bbn.$props, this.name)) {
        setProp(this.node.element.bbn, this.name, value);
      }

      if (this.node.element && !this.node.comment && !bbn.fn.isFocused(this.node.element) && (this.node.element[this.name] !== undefined)) {
        if (value) {
          if (this.node.element[this.name] !== value) {
            this.node.element[this.name] = value;
          }
        }
        else if (this.node.element[this.name]) {
          this.node.element[this.name] = '';
        }
      }
    }

    if (init && this.node.element) {
      const eventName = this.modifiers.includes('lazy') ? 'change' : 'input';
      const ele = this.node.element;
      //bbn.fn.log(["FROM MODEL INIT", eventName, this.name, this.attrGetValue()]);
      ele.addEventListener(eventName, e => {
        const node = this.node;
        const cp = node.component;
        const data = node.data;
        initResults(cp);
        //bbn.fn.log(["FROM MODEL EVENT", eventName, ele, e.target, e]);
        if (!this.node.parentElement) {
          e.stopImmediatePropagation();
          return;
        }
        if (node.isComponent && (ele !== e.target)) {
          e.stopImmediatePropagation();
          return;
        }

        if (!cp.$isMounted) {
          //return;
        }

        let eventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
        let m = this;
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
              case 'string':
                eventValue = eventValue.toString();
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
          const varName = bbn.fn.firstVarElement(m.exp);
          //bbn.fn.log(['Modfel change', oldValue, m, m.exp, varName, JSON.stringify(Object.keys(this.node.model)), eventValue, this.name, cpSource.$namespaces[m.exp], this.result.seq])
          if (m.exp === varName) {
            if (data && varName in data) {
              data[varName] = eventValue;
            }
            else if (Object.hasOwn(cp.$namespaces, varName)) {
              switch (cp.$namespaces[varName]) {
                case 'props':
                  setProp(cp, varName, eventValue);
                  break;
                case 'data':
                case 'computed':
                  cp[varName] = eventValue;
                  break;
                default:
                  throw new Error("Invalid namespace 1: " + cp.$namespaces[m.exp]);
              }
            }
            else {
              bbn.fn.log(last, this, eventValue, oldValue, cp);
              throw new Error("Invalid model variable 5: " + m.exp);
            }
          }
          else {
            this.result.num--;
            this.attrSetResult();
            const res = this.result;
            if (res?.seq?.length) {
              const last = res.seq[res.seq.length - 1];
              if (last.data) {
                last.data.value[last.name] = eventValue;
                //bbn.fn.log(["SETTING DATA", eventValue, last, last.data.value, res.seq])
              }
              else if ((Object.hasOwn(last.component.$namespaces, last.name))) {
                switch (last.component.$namespaces[last.name]) {
                  case 'props':
                    setProp(last.component, last.name, eventValue);
                    break;
                  case 'data':
                  case 'computed':
                    last.component[last.name] = eventValue;
                    break;
                  default:
                    throw new Error("Invalid namespace 2: " + last.component.$namespaces[m.exp]);
                }
              }
              else {
                bbn.fn.log(last, this, eventValue, oldValue, cp);
                throw new Error("Invalid model variable 6: " + m.exp);
              }
            }
            else {
              throw new Error("Invalid model variable (no sequence): " + m.exp);
            }
          }
        }
      });
    }
  }
}