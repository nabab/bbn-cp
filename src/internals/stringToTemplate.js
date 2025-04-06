import analyzeElement from './analyzeElement.js';
import removeSelfClosing from "./removeSelfClosing.js";
import "../cp.js";
/**
 * Create a new DOM parser and parse the given HTML string.
 * @return {HTMLElement}
 */
const parser = new DOMParser();
const createMap = (map, items) => {
  bbn.fn.each(items, a => {
    map[a.id] = a;
    if (a.tag && !['template', 'transition', 'component', 'slot'].includes(a.tag)) {
      a.templateElement = document.createElement(a.tag.toUpperCase());
      bbn.fn.each(a.attributes, attr => {
        if (attr.name.indexOf('bbn-') && !attr.exp && (a.templateElement[attr.name] !== undefined)) {
          a.templateElement.setAttribute(attr.name, attr.value);
        }
      });
    }
    else if (a.text) {
      a.templateElement = document.createTextNode(a.text.exp ? '' : a.text.value);
    }
    else {
      a.templateElement = document.createElement('SPAN');
    }
    a.templateElement.bbnId = a.id;

    if (a.items) {
      createMap(map, a.items);
      bbn.fn.each(a.items, item => {
        a.templateElement.appendChild(item.templateElement);
      });
    }
  });
};


/**
 * Transforms a HTML string into a template array
 * 
 * @param {String} str 
 * @returns {Array}
 */
export default function stringToTemplate(str, withMap, name) {
  /*
  if (name === 'apst-adherent-widget-contact') {
    bbn.fn.warning("GO!!");
    bbn.fn.log(str);
  }*/
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
    throw new Error("Impossible to parse the template");
  }

  let num = 0;
  const todo = Array.from(
    doc.documentElement.querySelector('body').childNodes
  );
  todo.filter(a => a.tagName && (a.tagName.toLowerCase() === 'script')).forEach(a => {
    if (a.id) {
      const content = a.innerHTML.trim();
      if (!content.indexOf('<')) {
        inlineTemplates['#' + a.id] = content;
      }
    }
  });
  let res = todo.filter(n => (!n.tagName && n.textContent && n.textContent.trim()) || (n.tagName && (n.tagName.toLowerCase() !== 'script')))
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
        && (res[0].condition
            || res[0].loop
            || res[0].model
            || res[0].forget
            || (bbn.cp.isComponent(res[0]) && (res[0].tag !== name))
            || (!bbn.cp.isComponent(res[0]) && !['div', 'span', name].includes(res[0].tag))
        )
    )
  ) {
    return stringToTemplate('<div>' + str + '</div>', withMap, name);
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
