/**
* Create the bbn component private class based on the bbnComponentPrivate
*/
export default function generateCpClass(publicClass, obj) {
  const tag = bbn.fn.camelToCss(publicClass);
  const proto = publicClass + 'Cp';
  const methods = {};
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
Object.defineProperty(this, '\$methods', {
  value: bbn.fn.createObject({`;
  if (obj.methods) {
    for (let n in obj.methods) {
      methods[n] = bbn.fn.analyzeFunction(obj.methods[n]);
      let fn = methods[n];
      code += `
      ${n}: ${fn.isAsync ? 'async ' : ''} function(${fn.argString}) ${fn.body},`;
    }
  }
code+= `
  }),
  writable: false,
  configurable: false
});
}

\$init(el) {
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
this.$setUpProp("${bbn.fn.escapeDquotes(n)}", {`;
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
          const fn = bbn.fn.analyzeFunction(cfg.default);
            code += `
  default: () => ` + fn.body + `,`
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

  if (obj.props) {
    for (let n in obj.props) {
      const cfg = obj.props[n];
      code += `
get ${n}() {
return this.$props["${n}"];
}
`;
    }
  }

  for (let n in methods) {
    let fn = methods[n];
    // for debug
    //let body = fn.body.replace('{', '{bbn.fn.log("' + n + '");');
    let body = fn.body;
    code += `
get ${n}() {
return this.$methods['${n}'].bind(this);
};`;
      
  }

  if (obj.computed) {
    for (let name in obj.computed) {
      const getter = bbn.fn.analyzeFunction(obj.computed[name].get);
      code += `
get ${name}() {
if (!this.$isDataSet) {
  return undefined;
}

if (!Object.hasOwn(this.$computed, "${name}")) {
  this.$computed["${name}"] = bbn.fn.createObject({
    old: undefined,
    val: undefined,
    hash: undefined,
    num: 0,
    update: () => {
      this.$updateComputed(
        "${name}",
        (function () ${getter.body}).bind(this)()
      );
    }
  });
}

if (this.$computed["${name}"].num <= this.$numBuild) {
  this.$computed["${name}"].update();
}

return bbnData.getValue(this.$computed["${name}"].val);
}
`;

      const setter = obj.computed[name].set ? bbn.fn.analyzeFunction(obj.computed[name].set) : null;
      if (setter) {
        code += `
set ${name}(${setter.argString}) ${setter.body}

`
      }
    }
  }

  const acceptedAttr = bbn.cp.possibleAttributes
    .concat(bbn.cp.possibleAttributes.map(a => ':' + a))
    .concat(Object.keys(obj.props))
    .concat(Object.keys(obj.props).map(a => ':' + a));
  code += `
static \$acceptedAttributes = ${JSON.stringify(acceptedAttr)};`;

  //bbn.fn.log(["NO IFACE?", obj])
  if (obj.statics.length) {
    let iface = '""';
    if (obj.iface) {
      if (bbn.fn.isObject(obj.iface)) {
        iface = JSON.stringify(obj.iface, null, 2);
      }
      else if (bbn.fn.isFunction(obj.iface)) {
        let fn = bbn.fn.analyzeFunction(obj.iface);
        iface = '(function(){' + fn.body + '})()';
      }
      else {
        throw new Error(bbn._("The interface property must be an object or a function"));
      }
    }
    code += `
static {
let res;
let iface = ${iface};`;
    bbn.fn.each(obj.statics, f => {
      let fn = bbn.fn.analyzeFunction(f);


      let stFn = fn.toString().trim();
      stFn = bbn.fn.substr(stFn, stFn.indexOf('('));
      code += `
res = ((${fn.argString}) => ` + fn.body + `)(iface);
if (res) {
  if (!bbn.fn.isObject(res)) {
    throw new Error(bbn._("If the static method returns it must be an object"));
  }
  bbn.fn.iterate(res, (v, n) => {
    if (this[n] === undefined) {
      this[n] = bbnData.immunizeValue(v);
    }
    else {
      throw new Error(bbn._("The static method cannot override an existing property"));
    }
  });
}`;
    });
    code += `
}
`;
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

  if (obj.statics.length) {
    bbn.fn.each(obj.statics, fn => {
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
        throw new Error(bbn._("The statics property must be an object or a function"));
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
  window.document.head.appendChild(sc);
  //bbn.fn.log("ENDING GENERATE CP CLASS", proto);
  return code;
}
