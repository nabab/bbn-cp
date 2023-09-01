(() => {
  const eventInstructions = ['stop', 'prevent', 'passive'];
  const parser = new DOMParser();

  bbn.fn.autoExtend('cp', {
    /**
     * Create an object of the HTML element with all the VUE prefixes
     * replaced by BBN prefixes
     * @return {Object} res
     */
    analyzeElement(ele, map, inlineTemplates, idx) {
      if (!ele.getAttributeNames) {
        throw new Error("Only tags can be analyzed");
      }

      const attr = ele.getAttributeNames().sort();
      if (!map) {
        map = bbn.fn.createObject();
      }

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
        const modelValue = main.length > 1 ? main[1] : '_default_';
        if (main[1] === '_default_') {
          throw new Error("The name '_default_' is reserved for the default value of the model");
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
          let o = bbn.fn.createObject({modifiers: []});
          bbn.fn.each(modifiers, modifier => {
            if (eventInstructions.includes(modifier)) {
              o[modifier] = true;
            }
            else {
              o.modifiers.push(modifier);
            }
          });
          o.action = value;
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
          bbn.fn.warning(bbn._("The attribute %s can't be defined more than once", name));
          return;
        }
        // create the attribute object
        if (!['bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget', 'bbn-model'].includes(a)) {
          res.attr[name] = bbn.fn.createObject({
            id: idx + '-' + name
          });
        }


        // Dynamic attributes
        if (a.indexOf(':') === 0) {
          res.attr[name].exp = value;
          res.attr[name].hash = bbn.fn.hash(value);
        }
        // Special attributes
        else if (a.indexOf('bbn-') === 0) {
          switch (a) {
            case 'bbn-for':
              if (attr['bbn-elseif'] || attr['bbn-else']) {
                throw new Error(bbn._("bbn-for can't be used with bbn-else-if or bbn-else"));
              }

              // Retrieving the expression used by loop
              const match = value.match(/\s(in|of)\s/);
              if (!match) {
                throw new Error(bbn._("Invalid loop expression"));
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
                  throw new Error(bbn._("Invalid loop expression"));
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
                throw new Error(bbn._("Invalid loop expression"));
              }

              res.loop = bbn.fn.createObject({
                exp: valueExp,
                item: args.value,
                index: args.index || null,
                hash: bbn.fn.hash(valueExp),
                original: value
              });
              break;
            case 'bbn-if':
            case 'bbn-elseif':
            case 'bbn-else':
              if (res.condition) {
                throw new Error(bbn._("There can't be more than one conditional expressions on the same tag"));
              }

              let type = a.substr(4);
              let hash = bbn.fn.hash(value);
              res.condition = bbn.fn.createObject({
                type,
                exp: value,
                hash
              });

              break;
            case 'bbn-model':
              if (!res.model) {
                res.model = bbn.fn.createObject();
              }
              res.model[modelValue] = bbn.fn.createObject({
                exp: value,
                hash: bbn.fn.hash(value),
                modifiers: modifiers
              });
              break;
            case 'bbn-cloak':
              res.cloak = bbn.fn.createObject({
                exp: value,
                hash: bbn.fn.hash(value)
              });
              break;
            case 'bbn-pre':
              res.pre = ele.innerHTML;
              break;
            case 'bbn-forget':
              res.forget = bbn.fn.createObject({
                exp: value,
                hash: bbn.fn.hash(value)
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
                  exp: value,
                  hash: bbn.fn.hash(value),
                  modifiers: !!directiveMod ? bbn.fn.map(directiveMod, m => bbn.fn.substr(m, 1)) : [],
                  arg: !!directiveArg ? bbn.fn.substr(directiveArg[0], 1) : null,
                  oldValue: undefined,
                  lastUpdate: null
                });

              }
              else {
                res.attr[name].exp = value;
                res.attr[name].hash = bbn.fn.hash(value);
              }
          }
        }
        // Regular attributes
        else {
          res.attr[name].hash = bbn.fn.hash(value);
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
      else {
        childNodes = ele.childNodes;
      }

      if (!res.pre && (ele.tagName === 'TEMPLATE')) {
        let before = '<body>';
        let after = '</body>';
        let target = 'body';
        let tpl = bbn.cp.removeSelfClosing(ele.innerHTML);
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
        childNodes = doc.documentElement.querySelector(target).childNodes;
      }
      
      let num = 0;
      Array.from(childNodes).forEach(node => {
        if (node instanceof Comment) {
          
          return;
        }

        if (node && node.getAttributeNames) {
          let tmp = bbn.cp.analyzeElement(node, map, inlineTemplates, idx + '-' + num);
          res.items.push(tmp.res);
          num++;
        }
        // No text nodes in the slots
        else if (node.textContent) {
          const checkEmpty = bbn.fn.removeExtraSpaces(node.textContent);
          const txt = node.textContent
                      // escaping dollars
                      //.replace(/\$/g, (_, g) => '\\$')
                      // replacing double curly braces by dollar and single
                      .replace(/{{(.+?)}}/gs, (_, g1) => '${' + g1 + '}');
          if (checkEmpty) {
            let isDynamic = txt.indexOf('${') > -1;
            let hash = bbn.fn.hash(txt);
            const item = bbn.fn.createObject({
              id: idx + '-' + num,
              text: txt,
              hash: hash
            });
            if (isDynamic) {
              item.exp = txt;
            }
            res.items.push(item);
            map[idx + '-' + num] = item;
            num++;
          }
        }
        else {
          bbn.fn.log("Unknown node", node)
        }
      });
      let isIf = false;
      let conditionId =null;
      bbn.fn.each(res.items, (item, idx) => {
        if (item.condition) {
          if (item.condition.type === 'if') {
            conditionId = bbn.fn.randomString(32);
            item.conditionId = conditionId;
            isIf = true;
          }
          else if (!isIf) {
            throw new Error(bbn._("There can't be an elseif or an else without an if"));
          }
          else {
            item.conditionId = conditionId;
          }
          if (item.condition.type === 'else') {
            isIf = false;
          }
        }
        else {
          isIf = false;
        }
      });
      if (res.condition) {
        res.conditionId = bbn.fn.randomString(32);
      }

      map[idx] = bbn.fn.clone(res);
      delete map[idx].items;
      return {
        res,
        map,
        inlineTemplates
      };
    }
  })
})();
