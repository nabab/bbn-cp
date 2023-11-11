/**
 * Create a new DOM parser and parse the given HTML string.
 * @return {HTMLElement}
 */
const parser = new DOMParser();

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
    bbn.cp.removeSelfClosing(str),
    "text/html"
  );
  const errorNode = doc.querySelector("parsererror");

  // If the HTML string cannot be parsed, It throw an error
  if (errorNode) {
    throw new Error("Impossible to parse the template");
  }

  let num = 0;
  const res = Array.from(
    doc.documentElement.querySelector('body').childNodes
  )
  .filter(n => n.tagName && (n.tagName.toLowerCase() !== 'script'))
  .map(a => {
    const tmp = bbn.cp.analyzeElement(a, map, inlineTemplates, num.toString());
    num++;
    return tmp.res;
  });
  if ((res.length > 1)
    || res[0].attr?.['bbn-if']
    || !res[0].attr?.['bbn-for']
    || !res[0].attr?.['bbn-model']
    || !res[0].attr?.['bbn-forget']
    || (bbn.cp.isComponent(tpl[0]) && (res[0].tag !== name))
  ) {
    res = [{
      tag: 'div',
      items: res
    }];
  }

  if (withMap) {
    return {
      res,
      map,
      inlineTemplates
    }
  }

  return res;
}
