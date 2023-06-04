(() => {
  bbn.fn.autoExtend('cp', {
    /**
    * Create the bbn component private class based on the bbnComponentPrivate
    */
    generateCpClass(publicClass, obj) {
      const tag = bbn.fn.camelToCss(publicClass);
      const proto = publicClass + 'Cp';
      let originalProto = 'bbnCp';
      if (obj.tag && bbn.cp.tagExtensions[obj.tag]) {
        originalProto = bbn.cp.tagExtensions[obj.tag] + 'Cp';
      }

      const sc = document.createElement('script');
      sc.setAttribute('type', 'text/javascript');
      sc.setAttribute('id', proto + 'Definition');
      let code = `
class ${proto} extends bbnCp {
  constructor(ele) {
    super(ele);
    Object.defineProperty(this, '\$options', {
      value: {
        name: '${tag}',
        _componentTag: '${tag}',
        components: bbn.fn.createObject(),` + (
          obj.tag ? `
        tag: '${obj.tag}',` : ''
        ) + `
        get propsData() {
          if (this.\$el) {
            return this.\$el.bbnSchema?.props || {};
          }

          return {};
        }
      },
      writable: false,
      configurable: false
    });
  }

  \$init(el) {`;
      code += `
    bbnCp.prototype.\$init.apply(this, [el]);
    const data = [`;
      if (obj.data?.length) {
        code += `
      function() ` + obj.data.map(a => a.toString().trim().substr(a.toString().trim().indexOf('{'))).join(`,\n      () => `);
      }
      code += `
    ];`;

      code += `
    return this;
  }

  \$setUpProps() {`;
      if (obj.props) {
        code += `
    let cp = this;`;
        for (let n in obj.props) {
          const cfg = obj.props[n];
          code += `
    this.$setUpProp("` + bbn.fn.escapeDquotes(n) + `", {`;
          if (cfg.required) {
            code += `
      required: true,`;
          }

          if (cfg.validator) {
            const src = cfg.validator.toString();
            let parenthesisPos = src.indexOf('(');
            let bracePos = src.indexOf('{');
            if ((bracePos > -1) && (parenthesisPos > -1) && (bracePos > parenthesisPos)) {
              let fn = src.substr(parenthesisPos);
              code += `
      validator` + fn + `,`
            }
            else {
              code += `
      validator: ` + src + `,`
            }
          }

          if (cfg.default !== undefined) {
            if (bbn.fn.isFunction(cfg.default)) {
              let parenthesisPos = cfg.default.toString().indexOf('{');
              if (parenthesisPos > -1) {
                let fn = cfg.default.toString().substr(parenthesisPos);
                code += `
      default: () => ` + fn + `,`
              }
              else {
                code += `
      default: ` + cfg.validator.toString() + `,`
              }
            }
            else {
              code += `
      default: `;
              if (cfg.default === null) {
                code += 'null';
              }
              else {
                code += bbn.fn.isString(cfg.default) ? `"` + bbn.fn.escapeDquotes(cfg.default) + `"` : cfg.default.toString().trim();
              }

              code += `,`;
            }
          }

          if (cfg.type) {
            code += `
      type: [` + cfg.type.map(a => {
            if (a === HTMLElement) {
              return 'HTMLElement';
            }
            return a.name;
          }).join(', ') + `],`
          }

          code += `
    });`
        }

        code += `
  }`;
      }

      if (obj.methods) {
        for (let n in obj.methods) {
          let stFn = obj.methods[n].toString().trim();
          let decl = bbn.fn.removeEmpty(bbn.fn.substr(stFn, 0, stFn.indexOf('(')).trim().split(' '));
          stFn = bbn.fn.substr(stFn, stFn.indexOf('('));
          if (decl.indexOf('function') > -1) {
            decl.splice(decl.indexOf('function'), 1);
          }
          if (decl.indexOf(n) === -1) {
            decl.push(n);
          }
          code += `
  ` + decl.join(' ') + stFn + `\n`;
        }
      }

    if (obj.computed) {
        for (let n in obj.computed) {
          let getFn = obj.computed[n].get.toString().trim();
          code += `
  get ${n}() {` + bbn.fn.substr(getFn, getFn.indexOf('{') + 1, -1) + `}`;
          if (obj.computed[n].set) {
            let setFn = obj.computed[n].set.toString();
            code += `
  set ${n}` + setFn.substr(setFn.indexOf('('));
          }
          code += `\n`;
        }
      }

      const acceptedAttr = bbn.cp.possibleAttributes
        .concat(bbn.cp.possibleAttributes.map(a => ':' + a))
        .concat(Object.keys(obj.props))
        .concat(Object.keys(obj.props).map(a => ':' + a));
      code += `
  static \$acceptedAttributes = ${JSON.stringify(acceptedAttr)};`;

      if (obj.static.length) {
        bbn.fn.log(obj.static, publicClass);
        bbn.fn.each(obj.static, fn => {
          const s = bbn.fn.isFunction(fn) ? fn() : fn;
          if (bbn.fn.isObject(s)) {
            bbn.fn.iterate(s, (v, n) => {
              if (bbn.fn.isFunction(v)) {
                let func = v.toString().trim().substr(v.toString().trim().indexOf('('));
                let arrowPos = func.indexOf('=>');
                let hasArrow = arrowPos > -1;
                if (hasArrow && (func.indexOf('{') > arrowPos)) {
                  func = func.substr(0, arrowPos) + func.substr(arrowPos + 2);
                }
                code += `
  static ${n + func}`;
              }
              else {
                code += `
  static ${n} = ${v && (typeof v === 'object') ? JSON.stringify(v) : (bbn.fn.isString(v) ? '"' + bbn.fn.escapeDquotes(v) + '"' : v.toString())};`;
              }
            });
          }
          else {
            bbn.fn.log(fn);
            throw new Error(bbn._("The static property must be an object or a function"));
          }
        });
      }
      code += `
}
`;

/*
      code += `
      ${fnName} = function(el, a) {
      Object.setPrototypeOf(a, ${proto});
    ${fnName}.name = '` + fnName + `';
    ${fnName}.bbnCls = ` + publicClass + `;
    ${fnName}.availableSlots = bbn.fn.createObject();
    ${fnName}.dataModels = bbn.fn.createObject();
    ${fnName}.proto = "${proto}";
    Object.assign(${fnName}.availableSlots, bbn.cp.retrieveSlots(` + publicClass + `.constructor.bbnTpl))
    Object.assign(${fnName}.dataModels, bbn.cp.retrieveModels(` + publicClass + `.constructor.bbnTpl))
    let iface`;

      if (obj.iface) {
        code += ` = `;
        if (bbn.fn.isObject(obj.iface)) {
          code += JSON.stringify(obj.iface);
        }
        else if (bbn.fn.isFunction(obj.iface)) {
          code += `(function() {` + obj.iface.toString().trim().substr(obj.iface.toString().trim().indexOf('{')) + `})()`;
        }
        else {
          throw new Error(bbn._("The interface property must be an object or a function"));
        }

      }
      code += `;`;

      if (obj.static.length) {
        bbn.fn.each(obj.static, fn => {
          code += `
    bbn.fn.iterate(`;
          if (bbn.fn.isObject(fn)) {
            code += JSON.stringify(fn);
          }
          else if (bbn.fn.isFunction(fn)) {
            let func = 'function' + fn.toString().trim().substr(fn.toString().trim().indexOf('('));
            let arrowPos = func.indexOf('=>');
            let hasArrow = arrowPos > -1;
            if (hasArrow && (func.indexOf('{') > arrowPos)) {
              func = func.substr(0, arrowPos) + func.substr(arrowPos + 2);
            }

            code += `(` + func + `)(iface)`;
          }
          else {
            bbn.fn.log(fn);
            throw new Error(bbn._("The static property must be an object or a function"));
          }

          code += `, (v, n) => {
      ${fnName}[n] = bbn.fn.isFunction(v) ? v.bind(${fnName}) : v;
    });`;
        });
      }

        code += `
  })();
}
catch (e) {
  bbn.fn.log("ERROR", e);
  throw new Error(e);
}

`;
*/

      sc.innerHTML = code;
      document.head.appendChild(sc);
      bbn.fn.log("ENDING GENERATE CP CLASS", proto);
      return code;
    }
  })
})();
