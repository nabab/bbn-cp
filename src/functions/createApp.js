import { bbn } from "@bbn/bbn";
import stringToTemplate from "../internals/stringToTemplate.js";
import retrieveSlots from "../internals/retrieveSlots.js";

/**
* Initializes an anonymous component with given element and configuration object.
 * 
 * Considerations:
 * - Asynchronous Nature: The function is asynchronous, allowing for dynamic imports and AJAX requests. Ensure that consumers of this function handle its asynchronous nature correctly.
 * - Error Handling: Robust error handling is important, especially in AJAX requests and dynamic imports.
 * - Performance: Consider the performance implications of dynamic imports and AJAX requests, especially if createApp is called frequently.
 * - Component Lifecycle Management: Ensure that the lifecycle of components (especially dynamic ones) is well-managed to avoid memory leaks or dangling references.
 * - Testing: Extensive testing, especially in different environments and with various component configurations, will be crucial for reliability.
 * 
 * @param {HTMLElement|string} ele - The target element or its selector for the app creation.
 * @param {Object} obj - The configuration object for the app.
 * @returns {Object} The initialized component.
*/
export default async function createApp(ele, obj) {
  if (bbn.cp.app) {
    throw new Error("The createApp function can only be called once");
  }
  
  if (!bbn.isTesting) {
    await import('@bbn/bbn-css/dist/css/bbn-css-' + (bbn.env.theme || 'default') + '.css');
  }

  // If 'ele' is a string, find the corresponding HTML element.
  if (bbn.fn.isString(ele)) {
    ele = document.body.querySelector(ele);
  }

  // Check if 'ele' is a valid HTMLElement.
  bbn.fn.checkType(ele, HTMLElement, "The createApp function should be given a HTMLElement");

  let translations;
  if (bbn.env.lang) {
    try {
      const lang = bbn.env.lang || 'en';
      translations = await import(`../i18n/${lang}.js`);
      if (translations.default) {
        translations = cpLang.default;
      }

      if (translations && bbn.fn.numProperties(translations)) {
        bbn.fn.translate(translations);
      }
    }
    catch (err) {}
  }

  // Add prefix handling for component names.
  // Define how to handle 'bbn-' prefixed components.
  bbn.cp.addPrefix('bbn-', async components => {
    const res = bbn.fn.createObject({
      components: []
    });
    //bbn.fn.log("COMPONENTS", components);
    for (let cp of components) {
      if (cp === 'bbn-anon') {
        continue;
      }
      // Request needs to be done as a string explicitly
      // @see https://stackoverflow.com/questions/42908116/webpack-critical-dependency-the-request-of-a-dependency-is-an-expression
      const definition = await import(
        /* webpackChunkName: "components/[request]" */
        `../components/${cp.substr(4)}/${cp.substr(4)}.js`
      );
      //bbn.fn.log(["DEFINITION", definition]);
      for (let n in definition) {
        if (n === 'default') {
          res.components.push(definition.default);
        }
        else if (!window[n]) {
          window[n] = definition[n];
        }
      }
    }

    return res;
  });

  // Its content is its template
  let tmp = stringToTemplate(obj.template || ele.outerHTML, true, 'bbn-anon');
  const cpTpl = tmp.res;
  const cpMap = tmp.map;
  const schema = bbn.fn.clone(cpTpl[0]);
  delete schema.slots;
  const placeholder = document.createComment("bbn-component placeholder");
  const parent = ele.parentNode;
  let cls = ele.style.cssText;
  if (cls) {
    cls = cls.trim();
  }

  parent.replaceChild(placeholder, ele);
  bbn.fn.iterate(tmp.inlineTemplates, (tpl, tag) => {
    if (!obj.components[tag]) {
      throw new Error("Impossible to find the sub component %s", tag);
    }
    obj.components[tag].template = tpl;
  });

  // Freeze the component configuration.
  const cpCfg = Object.freeze(bbn.cp.normalizeComponent(obj, 'bbnCpRoot'));

  // Initialize subcomponents if defined.
  if (cpCfg.components) {
    for (let n in cpCfg.components) {
      bbn.cp.define(cpCfg.componentNames[n], cpCfg.components[n], cpCfg.components[n].template);
    }
  }

  // Retrieve slots from the template.
  const slots = retrieveSlots(cpTpl);
  if (!slots.default) {
    slots.default = [];
  }

  // Create the bbn-anon element and set up its properties.
  const cp = Object.assign(
    document.createElement("bbn-anon"),
    {
      bbnId: '0',
      bbnConnected: true,
      bbnCfg: cpCfg,
      bbnTpl: cpTpl,
      bbnSlots: slots,
      bbnMap: cpMap,
      bbnSchema: schema,
      bbnMapped: false
    }
  );
  if (cls) {
    cp.style.cssText = cls;
  }

  // Replace the placeholder with the new component.
  parent.replaceChild(cp, placeholder);

  bbn.cp.app = cp.bbn;
  // Return the bbn property of the component.
  return cp.bbn;
  
}