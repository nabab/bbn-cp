import {bbn} from "@bbn/bbn/dist/index.js";

/**
* Init anon component
*/
export default async function createApp(ele, obj) {
  if (!bbn.isTesting) {
    await import('@bbn/bbn-css/dist/css/bbn-css-' + (bbn.env.theme || 'default') + '.css');
  }
  //bbn.fn.log("CP?", bbn.cp);
  bbn.cp.startTick();
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
      throw new Error(e);
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


  if (bbn.fn.isString(ele)) {
    ele = document.body.querySelector(ele);
  }

  /*
  bbn.cp.addPrefix('bbn', async tag => {
    const pUrl = bbn.env.cdn + 'lib/bbn-vue/master/src/components/?components=';
    const url = pUrl + tag.substr(4) + '&v=3280&test=1&lang=fr';
    // Request
    const d = await bbn.fn.ajax(url, 'text').then(r => r);
    return d;
  });
  */
      
  // ele must be an HTMLElement
  bbn.fn.checkType(ele, HTMLElement, "The createApp function should be given a HTMLElement");
  // Its content is its template
  let tmp = bbn.cp.stringToTemplate(ele.outerHTML, true, 'bbn-anon');
  const cpTpl = tmp.res;
  const cpMap = tmp.map;
  const schema = bbn.fn.clone(cpTpl[0]);
  delete schema.slots;
  const placeholder = document.createComment("bbn-component placeholder");
  const parent = ele.parentNode;
  let cls = ele.style.cssText;
  if (cls) {
    cls = cls.trim()
  }

  parent.replaceChild(placeholder, ele);
  // Adding basicComponent mixin
  if (!obj.mixins) {
    obj.mixins = [];
  }
  if (!obj.mixins.includes(bbn.cp.mixins.basic)) {
    obj.mixins.push(bbn.cp.mixins.basic);
  }

  // The component config (= Vue-like object) that we freeze
  const cpCfg = Object.freeze(bbn.cp.normalizeComponent(obj, 'bbnCpRoot'));

  // If subcomponents are defined we init them too
  if (cpCfg.components) {
    for (let n in cpCfg.components) {
      bbn.cp.define(cpCfg.componentNames[n], cpCfg.components[n], cpCfg.components[n].template);
    }
  }

  const slots = bbn.cp.retrieveSlots(cpTpl);
  if (!slots.default) {
    slots.default = [];
  }

  const cp = Object.assign(
    document.createElement("bbn-anon"),
    {
      bbnId: '0',
      bbnCfg: cpCfg,
      bbnTpl: cpTpl,
      bbnSlots: slots,
      bbnMap: cpMap,
      bbnSchema: schema
    }
  );
  if (cls) {
    cp.style.cssText = cls;
  }

  parent.replaceChild(cp, placeholder);
  /*
  bbn.fn.each(ele.childNodes, node => {
    cp.appendChild(node);
  });*/
  return cp.bbn;
  
}
