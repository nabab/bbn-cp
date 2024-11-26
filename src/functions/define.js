import stringToTemplate from "../internals/stringToTemplate.js";
import generateCpClass from "../internals/generateCpClass.js";
import generateHtmlClass from "../internals/generateHtmlClass.js";
import retrieveModels from "../internals/retrieveModels.js";
import retrieveSlots from "../internals/retrieveSlots.js";

/**
* Defines a component with the Object config and the HTML template.
* @param {string} name - The tag name of the component.
* @param {Object} obj - The Vue-like configuration object for the component.
* @param {string|array} tplSt - The template as a string or an array from stringToTemplate.
 * @param {string} [css] - Optional CSS string for the component.
*/
export default function define(name, obj, tplSt, css) {
  // Prevent redefinition if the component is already known.
  if (bbn.cp.known.includes(name)) {
    return;
  }

  // Mandatory check for the component name.
  if (!name) {
    bbn.fn.warning("BOO");
    bbn.fn.log(obj);
    throw new Error("The name of the component is mandatory");
  }

  // Convert the template string to a DOM array.
  let tmp = stringToTemplate(tplSt, true, obj.tag || name);
  // Generate a public class name based on the component tag.
  const publicName = bbn.fn.camelize(name);
  // The component config (= Vue-like object) that we freeze
  bbn.fn.iterate(tmp.inlineTemplates, (tpl, tag) => {
    if (!obj.components[tag]) {
      bbn.fn.log(Object.keys(cpCfg.components).join(", "));
      throw new Error("Impossible to find the sub component %s", tag);
    }
    obj.components[tag].template = tpl;
  });
  const cpCfg = bbn.cp.normalizeComponent(obj, publicName);
  Object.freeze(cpCfg);

  if (!window[publicName]) {
    // Generate and globally expose HTML and Cp classes.
    window[publicName] = generateHtmlClass(publicName, cpCfg.tag || null);
    // Define arguments for custom element registration.
    const args = [name, window[publicName]];
    if (cpCfg.tag) {
      args.push({ extends: cpCfg.tag });
    }

    // Assigning the public class to the component's tag
    //bbn.fn.log(['define', ...args]);
    customElements.define(...args);
  }

  // Store component configuration in bbn.cp.statics.
  bbn.cp.statics[name] = bbnData.immunizeValue(bbn.fn.createObject({
    tpl: tmp.res,
    map: tmp.map,
    cls: publicName + 'HTML',
    fn: publicName + 'Cp',
    cfg: cpCfg,
    models: retrieveModels(tmp.res),
    slots: retrieveSlots(tmp.res),
    tag: cpCfg.tag,
  }));

  // Handle default slot initialization.
  if (!bbn.cp.statics[name].slots.default) {
    bbn.cp.statics[name].slots.default = [];
  }

// Inject component-specific CSS if provided.
  if (css) {
    const styleSheet = document.createElement('style');
    const old = document.getElementById(name + "-bbn-css");
    if (old) {
      document.head.removeChild(old);
    }

    styleSheet.setAttribute("id", name + "-bbn-css");
    styleSheet.textContent = css;
    document.head.append(styleSheet);
  }

  // Initialize subcomponents if defined.
  if (cpCfg.components) {
    for (let n in cpCfg.components) {
      bbn.cp.define(cpCfg.componentNames[n], cpCfg.components[n], cpCfg.components[n].template || '');
      //cpProto.$options.components[n] = cpCfg.components[n];
    }
  }
  
  // Generating the code for the private class based on the component config
  //const privateClassCode = makePrivateClass(privateName, cpCfg);
  //bbn.fn.log('generateCpClass', publicName);
  window[publicName + 'Cp'] = generateCpClass(publicName, cpCfg);
  // Register the component and add it to the known components list.
  bbn.cp.known.push(name);
  const idx = bbn.cp.unknown.indexOf(name);
  if (idx > -1) {
    bbn.cp.unknown.splice(idx, 1);
  }

  const ev = new CustomEvent('bbn-loaded-' + name);
  document.dispatchEvent(ev);
  //bbn.fn.log("fnCode", fnCode);
  //bbn.fn.log(makePrivateFunction(privateName, cpCfg));
  // Evaluating that code: defining the private class
  // Retrieving the class object
  return cpCfg;
}
