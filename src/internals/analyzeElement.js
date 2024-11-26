import bbn from "@bbn/bbn";
import removeSelfClosing from "./removeSelfClosing.js";
import stringToTemplate from "./stringToTemplate.js";

const eventInstructions = ['stop', 'prevent', 'passive'];
const parser = new DOMParser();
const noSpaceTags = [
  'table',
  'tr',
  'td',
  'th',
  'thead',
  'tbody',
  'tfoot',
  'ul',
  'ol',
  'li',
  'dl',
  'dt',
  'dd',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'footer',
  'section',
  'article',
  'aside',
  'nav',
  'main',
  'div',
  'hr',
  'p',
  'pre',
  'blockquote',
  'address',
  'figure',
  'figcaption',
  'legend',
  'caption',
  'details',
  'summary',
  'menu',
  'dialog',
  'script',
  'style',
  'noscript',
  'iframe',
  'code'
];


/**
 * Creates a template object based on the HTML element
 * @var {HTMLElement} ele - The HTML element to analyze
 * @var {Object} inlineTemplates - An object passing inline templates
 * @var {String} idx - The unique index of the element
 * @return {Object} res - An object representing the node
 */
export default function analyzeElement(ele, inlineTemplates, idx, componentName) {
  if (!ele.getAttributeNames) {
    throw new Error(bbn._("Only tags can be analyzed (check %s)", componentName));
  }

  bbn.fn.checkType(inlineTemplates, 'object', "Inline templates must be an object");
  bbn.fn.checkType(idx, 'string', "The index must be a string");

  const attr = ele.getAttributeNames().sort();

  if (!inlineTemplates) {
    inlineTemplates = bbn.fn.createObject();
  }

  let res = bbn.fn.createObject({
    id: idx,
    tag: ele.tagName.toLowerCase(),
    attr: bbn.fn.createObject(),
    events: bbn.fn.createObject(),
    items: []
  });

  if ((res.tag === 'component') && (attr.indexOf(':is') > -1)) {
    let is = ele.getAttribute(':is').trim();
    const bits = is.split('.');
    if ((bits[0] === '$options')
      && (bits[1] === 'components')
      && (bits.length === 3)
    ) {
      res.tag = bits[2];
      attr.splice(attr.indexOf(':is'), 1);
    }
  }

  attr.forEach(attrName => {
    const main = attrName.indexOf(':') > 0 ? attrName.split(':') : [attrName];
    const modifiers = main[0].split('.');
    let modelValue = main.length > 1 ? main[1] : '_default_';
    if (main[1] === '_default_') {
      throw new Error(_("The name '_default_' is reserved for the default value of the model (check %s)", componentName));
    }

    if ((modelValue === '_default_') && ['input', 'select', 'textarea'].includes(res.tag)) {
      modelValue = 'value';
    }

    let a = bbn.fn.camelToCss(modifiers.splice(0, 1)[0]);
    // replaces v- by bbn-
    if (a.indexOf('v-') === 0) {
      a = 'bbn-' + a.substr(2);
    }
    // replaces else-if by elseif
    if ('bbn-else-if' === a) {
      a = 'bbn-elseif';
    }
    if (a === 'bbn-on') {
      a = '@' + main[1];
    }

    let value = ele.getAttribute(attrName).trim();

    // Events
    if (a.indexOf('@') === 0) {
      let o = bbn.fn.createObject({id: res.id + '-' + a, modifiers: []});
      bbn.fn.each(modifiers, modifier => {
        if (eventInstructions.includes(modifier)) {
          o[modifier] = true;
        }
        else {
          o.modifiers.push(modifier);
        }
      });
      o.exp = value;
      if (o.exp.indexOf('=>') > -1) {
        let analyzed;
        try {
          analyzed = bbn.fn.analyzeFunction(o.exp);
        }
        catch (e) {}
        if (analyzed && analyzed.isArrow) {
          o.exp = '(' + o.exp + ')(' + (analyzed.argString || '') + ')';
          o.argNames = analyzed.args;
        }
      }
      let eventName = a.substr(1);
      if (main[1]) {
        eventName += ':' + main[1];
      }

      res.events[eventName] = o;
      return;
    }

    /** @var {String} name The attribute's real name */
    let tmp = a.indexOf(':') === 0 ? a.substr(1) : a;
    const name = tmp.indexOf('bbn-') === 0 ? tmp : bbn.fn.camelize(tmp);
    if (res.attr[name] !== undefined) {
      bbn.fn.warning(bbn._("The attribute %s can't be defined more than once (check %s)", name, componentName));
      return;
    }
    // create the attribute object
    if (!['bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget', 'bbn-model', 'bbn-bind', 'bbn-slot'].includes(a)) {
      res.attr[name] = bbn.fn.createObject({
        id: idx + '-' + name
      });
    }


    // Dynamic attributes
    if (a.indexOf(':') === 0) {
      res.attr[name].exp = value;
    }
    // Special attributes
    else if (a.indexOf('bbn-') === 0) {
      switch (a) {
        case 'bbn-for':
          if (attr['bbn-elseif'] || attr['bbn-else']) {
            throw new Error(bbn._("bbn-for can't be used with bbn-else-if or bbn-else (check %s)", componentName));
          }

          // Retrieving the expression used by loop
          const match = value.match(/\s(in|of)\s/);
          if (!match) {
            throw new Error(bbn._("Invalid loop expression (check %s)", componentName));
          }
    
          const itemExp = value.substr(0, match.index).trim();
          const valueExp = value.substr(match.index + match[0].length).trim();
          /** @var {Object} args An object with the name of the loop argument(s) used by the function */
          let args = bbn.fn.createObject();
          /** @todo Could do better! */
          // The first part of the expression is between parenthesis
          // which should mean there are 2 variables
          if (itemExp.indexOf(')') > -1) {
            /** @var {Array} tmp first part of the expression without the parenthesis and split by coma */
            let tmp = bbn.fn.substr(itemExp, 1, -1).split(',');
            // There's at least one expression
            if (!tmp.length) {
              throw new Error(bbn._("Invalid loop expression (check %s)", componentName));
            }
    
            // That would be the value's name'
            args.value = tmp[0].trim();
            // There is a second expression
            if (tmp.length === 2) {
              // The index name variable used by the function
              args.index = tmp[1].trim();
            }
          }
          // No parenthesis, there is just the value's name
          else {
            args.value = itemExp;
          }

          // No value no chocolate
          if (!args.value) {
            throw new Error(bbn._("Invalid loop expression (check %s)", componentName));
          }

          res.loop = bbn.fn.createObject({
            exp: valueExp,
            id: res.id + '-loop',
            item: args.value,
            index: args.index || null,
            original: value
          });
          
          res.loopItem = bbn.fn.createObject({
            exp: args.value,
            id: res.id + '-loop-item',
            original: args.value
          });
          if (args.index) {
            res.loopIndex = bbn.fn.createObject({
              exp: args.index,
              id: res.id + '-loop-index',
              original: args.index
            });
          }
          break;
        case 'bbn-if':
        case 'bbn-elseif':
        case 'bbn-else':
          if (res.condition) {
            throw new Error(bbn._("There can't be more than one conditional expressions on the same tag (check %s)", componentName));
          }

          let type = a.substr(4);
          res.condition = bbn.fn.createObject({
            type,
            id: res.id + '-bbn-condition',
            exp: a === 'bbn-else' ? 'true' : value,
            // Adding prefix as conditions can be set to false even when the expression is not
          });
          if (!value && (type !== 'else')) {
            throw new Error(bbn._("The condition must have an expression (check %s)", componentName));
          }

          break;
        case 'bbn-model':
          if (!res.model) {
            res.model = bbn.fn.createObject();
          }
          res.model[modelValue] = bbn.fn.createObject({
            id: res.id + '-model-' + modelValue,
            exp: value,
            modifiers: modifiers
          });
          break;
        case 'bbn-slot':
          res.slot = bbn.fn.createObject({
            id: res.id + '-slot-' + (modelValue === '_default_' ? 'default' : modelValue),
            slotName:  modelValue === '_default_' ? 'default' : modelValue,
            slotValue: value,
          });
          break;
        case 'bbn-cloak':
          res.cloak = bbn.fn.createObject({
            id: res.id + '-cloak',
            exp: value,
          });
          break;
        case 'bbn-pre':
          const tpl = stringToTemplate(ele.innerHTML, true);
          res.pre = bbn.fn.createObject({
            id: res.id + '-pre',
            content: ele.innerHTML,
            template: tpl.res,
          });
          break;
        case 'bbn-forget':
          res.forget = bbn.fn.createObject({
            id: res.id + '-forget',
            exp: value,
          });
          break;
        case 'bbn-bind':
          res.bind = bbn.fn.createObject({
            id: res.id + '-bind',
            exp: value,
          });
          break;
        default:
          if (bbn.cp.directives[a]) {
            if (!res.directives) {
              res.directives = bbn.fn.createObject();
            }

            let directiveArg = attrName.match(new RegExp(/\:{1}([a-z]+)/g));
            let directiveMod = attrName.match(new RegExp(/\.{1}([a-z]+)/g));
            res.directives[a] = bbn.fn.createObject({
              id: res.id + '-directive-' + a,
              exp: value,
              modifiers: !!directiveMod ? bbn.fn.map(directiveMod, m => bbn.fn.substr(m, 1)) : [],
              arg: !!directiveArg ? bbn.fn.substr(directiveArg[0], 1) : null,
              oldValue: undefined,
              lastValue: undefined,
              lastUpdate: null
            });

          }
          else {
            res.attr[name].exp = value;
          }
      }
    }
    // Regular attributes
    else {
      res.attr[name].value = value;
    }
  });


  let childNodes;
  if (Object.hasOwn(res.attr, 'inlineTemplate')) {
    if (!inlineTemplates[res.tag]) {
      inlineTemplates[res.tag] = ele.innerHTML;
      delete res.attr.inlineTemplate;
    }
    childNodes = [];
  }
  else if (res.tag === 'svg') {
    childNodes = [];
    res.content = ele.innerHTML;
  }
  else if (res.pre) {
    childNodes = [];
  }
  else if (ele.tagName === 'TEMPLATE') {
    let before = '<body>';
    let after = '</body>';
    let target = 'body';
    let tpl = removeSelfClosing(ele.innerHTML);
    let tag1 = tpl.match(/<([a-zA-Z-]+)(>|.*?[^?]>)/s);
    if (tag1 && tag1[1]) {
      switch (tag1[1].toLowerCase()) {
        case 'thead':
        case 'tbody':
        case 'tfoot':
        case 'tr':
          before += '<table>';
          after = '</table>' + after;
          target = 'table';
          break;
        case 'td':
        case 'th':
          before += '<table><tr>';
          after = '</tr></table>' + after;
          target = 'tr';
          break;
        case 'col':
          before += '<table><colgroup>';
          after = '</colgroup></table>' + after;
          target = 'colgroup';
          break;
        case 'li':
          before += '<ul>';
          after = '</ul>' + after;
          target = 'ul';
          break;
      }
    }
    const doc = parser.parseFromString(
      // There shouldn't be self-closing in the embedded HTML except if in template
      before + tpl + after,
      "text/html"
    );
    childNodes = Array.prototype.slice.apply(doc.documentElement.querySelector(target).childNodes);
  }
  else {
    childNodes = Array.prototype.slice.apply(ele.childNodes);
  }
  
  let num = 0;
  let lastEmpty = false;
  let prevTag;
  const div = document.createElement('div');
  // removing elements between if and else
  for (let i = 0; i < childNodes.length; i++) {
    if (!childNodes[i] || childNodes[i] instanceof Comment) {
      childNodes.splice(i, 1);
      i--;
    }

    if (childNodes[i].getAttributeNames) {
      if (childNodes[i].getAttributeNames().filter(a => ['bbn-else', 'v-else', 'bbn-elseif', 'bbn-else-if', 'v-else-if'].includes(a)).length) {
        let j = i-1;
        while (childNodes[j] && !childNodes[j].getAttributeNames) {
          childNodes.splice(j, 1);
          j--;
          i--;
        }
      }
    }
  }

  bbn.fn.each(childNodes, (node, i) => {
    if (node instanceof Comment) {
      return;
    }

    if (node && node.getAttributeNames) {
      let tmp = analyzeElement(node, inlineTemplates, idx + '-' + num, componentName);
      if (!childNodes[i+1]?.getAttributeNames && childNodes[i+1]?.textContent && !bbn.fn.removeExtraSpaces(childNodes[i+1].textContent)) {
        tmp.spaced = true;
      }

      prevTag = tmp.res.tag;
      res.items.push(tmp.res);
      num++;
      lastEmpty = false;
    }
    // No text nodes in the slots
    else if (node.textContent) {
      const n2 = node.cloneNode(true);
      div.appendChild(n2);
      const txt = div.innerHTML
                  // escaping dollars
                  //.replace(/\$/g, (_, g) => '\\$')
                  // replacing double curly braces by dollar and single
                  .replace(/{{(.+?)}}/gs, (_, g1) => '${' + g1 + '}')
                  .replace(/\n/g, '')
                  .replace(/\t/g, '');
      div.removeChild(n2);
      const isEmpty = !bbn.fn.removeExtraSpaces(txt);
      if (!isEmpty || (!lastEmpty && prevTag && !noSpaceTags.includes(prevTag))) {
        let isDynamic = txt.indexOf('${') > -1;
        lastEmpty = isEmpty;
        const item = bbn.fn.createObject({
          id: idx + '-' + num,
          text: {
            id: idx + '-' + num + '-text',
            content: isEmpty ? ' ' : txt.replace(/&nbsp;/g, '\u00A0'),
            empty: isEmpty,
          },
        });
        if (isDynamic) {
          item.text.exp = txt;
          item.text.value = '';
        }
        else {
          item.text.value = item.text.content;
        }

        // Prevent starting with empty
        if (!isEmpty || res.items.length) {
          res.items.push(item);
        }

        num++;
      }
      else {
        lastEmpty = isEmpty;
      }
    }
    else {
      bbn.fn.log("Unknown node", node)
      lastEmpty = false;
    }
  });

  // Trimming result
  while (res.items.length && res.items[res.items.length - 1].text?.empty) {
    res.items.pop();
  }
  
  let isIf = false;
  let conditionId = null;
  for (let i = 0; i < res.items.length; i++) {
    let item = res.items[i];
    if (item.condition) {
      if (item.condition.type === 'if') {
        conditionId = bbn.fn.randomString(32);
        item.conditionId = conditionId;
        isIf = true;
      }
      else if (!isIf) {
        throw new Error(bbn._("There can't be an elseif or an else without an if (check %s)", componentName));
      }
      else {
        item.conditionId = conditionId;
      }
      if (item.condition.type === 'else') {
        isIf = false;
      }
    }
  }

  return {
    res,
    inlineTemplates
  };
}
