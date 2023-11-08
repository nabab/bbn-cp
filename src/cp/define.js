import bbn from "@bbn/bbn";

/**
* Defines a component with the Object config and the HTML template
* @param name The tag name of the component
* @param obj The Vue-like configuration object
* @param tpl The template as string or array from stringToTemplate
*/
export default function define(name, obj, tpl, css) {
  if (bbn.cp.known.includes(name)) {
    return;
  }
  if (!name) {
    bbn.fn.warning("BOO");
    bbn.fn.log(obj);
    throw new Error("The name of the component is mandatory");
  }

  // Template string becomes a DOM array
  let tmp = bbn.cp.stringToTemplate(tpl, true);
  // Name of the class based on the tag name
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
  const cls = cpCfg.tag && bbn.cp.tagExtensions[cpCfg.tag] ? bbn.cp.tagExtensions[cpCfg.tag] : 'bbnHTML';
  bbn.cp.statics[name] = bbnData.immunizeValue(bbn.fn.createObject({
    tpl: tmp.res,
    map: tmp.map,
    cls: publicName + 'HTML',
    fn: publicName + 'Cp',
    cfg: cpCfg,
    models: bbn.cp.retrieveModels(tmp.res),
    slots: bbn.cp.retrieveSlots(tmp.res),
    tag: cpCfg.tag,
  }));
  if (!bbn.cp.statics[name].slots.default) {
    bbn.cp.statics[name].slots.default = [];
  }

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

  // If subcomponents are defined we init them too
  if (cpCfg.components) {
    for (let n in cpCfg.components) {
      bbn.cp.define(cpCfg.componentNames[n], cpCfg.components[n], cpCfg.components[n].template || '');
      //cpProto.$options.components[n] = cpCfg.components[n];
    }
  }
  // Generating a basic HTML class based on the component config
  //bbn.fn.log('generateHTMLClass', publicName, cls, '-------');
  window[publicName] = bbn.cp.generateHTMLClass(publicName, (new Function(`return ${cls};`))());
  // Generating the code for the private class based on the component config
  //const privateClassCode = makePrivateClass(privateName, cpCfg);
  //bbn.fn.log('generateCpClass', publicName);
  window[publicName + 'Cp'] = bbn.cp.generateCpClass(publicName, cpCfg);
  //bbn.fn.log("fnCode", fnCode);
  //bbn.fn.log(makePrivateFunction(privateName, cpCfg));
  // Evaluating that code: defining the private class
  // Retrieving the class object

  // Getting the class object from the Window (seems impossible otherwise)
  //bbn.fn.log(publicName);
  const args = [name, window[publicName]];
  if (cpCfg.tag) {
    args.push({extends: cpCfg.tag});
  }

  // Adding the newly defined component to the known array
  bbn.cp.known.push(name);
  // Assigning the public class to the component's tag
  customElements.define(...args);
}
