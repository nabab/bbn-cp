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
  // Dynamically import CSS based on the theme.
  if (!bbn.isTesting) {
    await import('@bbn/bbn-css/dist/css/bbn-css-' + (bbn.env.theme || 'default') + '.css');
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


  /*
  bbn.cp.addPrefix('appui-', async components => {
    const urlPrefix = 'components/';
    const url = urlPrefix + components.join('/') + '?v=3280&test=1&lang=fr';
    // Request
    const d = await bbn.fn.ajax(url, 'text');
    let tmp;
    try {
      if (bbn.fn.isString(d.data)) {
        tmp = (new Function('return ' + d.data + ';'))();
      }
    }
    catch (e) {
      throw Error(e);
    }

    const res = bbn.fn.createObject({
      components: []
    });

    if (tmp.components) {
      bbn.fn.each(tmp.components, obj => {
        res.components.push(bbn.fn.createObject({
          name: obj.name,
          definition: eval(obj.script),
          template: obj.content,
          css: obj.css || null
        }));
      });
    }

    return res;
  });
  */

  // If 'ele' is a string, find the corresponding HTML element.
  if (bbn.fn.isString(ele)) {
    ele = document.body.querySelector(ele);
  }

  // Check if 'ele' is a valid HTMLElement.
  bbn.fn.checkType(ele, HTMLElement, "The createApp function should be given a HTMLElement");
  // Its content is its template
  let tmp = stringToTemplate(ele.outerHTML, true, 'bbn-anon');
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
  
  // Ensure basicComponent mixin is included.
  if (!obj.mixins) {
    obj.mixins = [];
  }
  if (!obj.mixins.includes(bbn.cp.mixins.basic)) {
    obj.mixins.push(bbn.cp.mixins.basic);
  }

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
  /*
  bbn.fn.each(ele.childNodes, node => {
    cp.appendChild(node);
  });*/

  // Start the tick process for component updates.
  bbn.cp.startTick();

  // Return the bbn property of the component.
  cp.bbn.$connected();
  return cp.bbn;
  
}
