import bbn from '@bbn/bbn';
import analyzeElement from './analyzeElement.js';
import removeSelfClosing from "./removeSelfClosing.js";

/**
 * Create a new DOM parser and parse the given HTML string.
 * @return {HTMLElement}
 */
const parser = new DOMParser();
const createMap = (map, items) => {
  bbn.fn.each(items, a => {
    map[a.id] = a;
    if (a.items) {
      createMap(map, a.items);
    }
  });
};

const updateRoot = (ar, lower) => {
  bbn.fn.each(ar, a => {
    if (lower) {
      if (a.id.indexOf('0-')) {
        throw Error("The root element cannot have a lower id");
      }
      a.id = a.id.substr(2);
    }
    else {
      a.id = '0-' + a.id;
    }
    bbn.fn.iterate(a, (value, prop) => {
      if (['attr', 'model', 'directives'].includes(prop)) {
        bbn.fn.iterate(value, v => {
          v.id = lower ? v.id.substr(2) : '0-' + v.id;
        });
      }
      else if (['loop', 'condition', 'forget'].includes(prop)) {
        value.id = lower ? value.id.substr(2) : '0-' + value.id;
      }
    });

    if (a.items) {
      a.items = updateRoot(a.items);
    }
  });

  return ar;
};


/**
 * Transforms a HTML string into a template array
 * 
 * @param {String} str 
 * @returns {Array}
 */
export default function stringToTemplate(str, withMap, name) {
  const map = bbn.fn.createObject();
  const inlineTemplates = bbn.fn.createObject();

  if (bbn.fn.isString(str)) {
    str = str.trim();
  }

  if (!str) {
    if (withMap) {
      return {
        res: [],
        map,
        inlineTemplates
      }
    }

    return [];
  }
  const doc = parser.parseFromString(
    // There shouldn't be self-closing in the embedded HTML except if in template
    removeSelfClosing(str),
    "text/html"
  );
  const errorNode = doc.querySelector("parsererror");

  // If the HTML string cannot be parsed, It throw an error
  if (errorNode) {
    throw Error("Impossible to parse the template");
  }

  let num = 0;
  let res = Array.from(
    doc.documentElement.querySelector('body').childNodes
  )
  .filter(n => n.tagName && (n.tagName.toLowerCase() !== 'script'))
  .map(a => {
    const tmp = analyzeElement(a, inlineTemplates, num.toString(), name);
    num++;
    return tmp.res;
  });

  if ((res.length === 1) && (res[0]?.tag === 'template')) {
    bbn.fn.log("TEMPLATE", res);
    //res = updateRoot(res[0].items, true);
  }

  if ((res.length > 1)
    || (res.length
        && (res[0].attr?.['bbn-if']
            || res[0].attr?.['bbn-for']
            || res[0].attr?.['bbn-model']
            || res[0].attr?.['bbn-forget']
            || (bbn.cp.isComponent(res[0]) && (res[0].tag !== name))
            || (!bbn.cp.isComponent(res[0]) && !['div', 'span', name].includes(res[0].tag))
        )
    )
  ) {
    res = [{
      id: '0',
      tag: 'div',
      items: updateRoot(res)
    }];
  }

  if (withMap) {
    const map = bbn.fn.createObject();
    createMap(map, res);

    return {
      res,
      map,
      inlineTemplates
    }
  }

  return res;
}
