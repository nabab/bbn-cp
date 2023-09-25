(() => {
  const $_prep = st => {
    if (st.trim().match(/^\{|\[/)) {
      return '(() => {return ' + st + '})()';
    }

    return st;
  };

  let sp = 2;

  const x = (obj, spaces, content)  => {
    if (!obj) {
      obj = bbn.fn.createObject({text: ''});
    }
    if (content) {
      obj.text += ' '.repeat(spaces) + content + '\n';
    }
    else {
      obj.text += '\n';
    }

    return obj;
  };

  const forbidden = ['bbn-forget', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else'];

  const treatCondition = (cp, node, arr, hashName) => {
    const c = x();
    let tmp = arr.filter(a => (a.conditionId === node.conditionId));
    if (!tmp.length || !node.conditionId) {
      bbn.fn.log("FINISHING HERE ",node.conditionId, node.condition);
      return c.text;
    }

    x(c, sp, `_isCondTrue = false;`);
    x(c, sp, '// Checking the set of conditions (if any other) on the first condition');
    bbn.fn.each(tmp, (cond, j) => {
      x(c, sp, `$_go['${cond.id}'] = false;`);
      // No need to check thge first as _isCondTrue has just been defined
      if (j) {
        x(c, sp, `if (!_isCondTrue) {`);
        sp += 2;
      }
      x(c, sp, `_isCondTrue = _sIr("${cond.condition.hash}", ${cond.condition.type === 'else' ? 'true' : cond.condition.exp}, ${hashName});`);
      if (j) {
        sp -= 2;
        x(c, sp, `}`);
        x(c, sp, `else {`);
        x(c, sp, `  _sIr("${cond.condition.hash}", false, ${hashName});`);
        x(c, sp, `}`);
      }
      x(c, sp, `if (_gIs("${cond.condition.hash}", ${hashName}) !== "OK") {`)
      x(c, sp, `  $_go['${cond.id}'] = true;`);
      x(c, sp, `  let _tmp = _gIv("${cond.condition.hash}", ${hashName});`);
      x(c, sp, `  let _e;`);
      x(c, sp, `  if (!_tmp) {`);
      if (['template', 'transition', 'slot'].includes(cond.tag)) {
        if (cond.items) {
          bbn.fn.each(cond.items, it => {
            x(c, sp, `    _e = _t.$retrieveElement("${it.id}", ${hashName});`);
            x(c, sp, `    if (_e && !bbn.fn.isComment(_e)) {`);
            x(c, sp, `      _t.$removeDOM(_e);`);
            x(c, sp, `    }`);
          });
        }
      }
      else {
        x(c, sp, `    _e = _t.$retrieveElement("${cond.id}", ${hashName});`);
        x(c, sp, `    if (_e && !bbn.fn.isComment(_e)) {`);
        //x(c, sp, `      bbn.fn.log("REMOVING ${cond.id} from node2fn")`);
        x(c, sp, `      let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;`);
        //x(c, sp, `      bbn.fn.log("this is my moment", _e.tagName, _t.$options.name);`);
        x(c, sp, `      _t.$removeDOM(_e);`);
        x(c, sp, `      _e = false;`);
        x(c, sp, `    }`);
        x(c, sp, `    if (!_e) {`);
        x(c, sp, `      _eles['${cond.id}'] = await _t.$createElement({`);
        x(c, sp, `        id: "${cond.id}",`);
        x(c, sp, `        hash: "${cond.condition.hash}",`);
        x(c, sp, `        loopHash: ${hashName},`);
        x(c, sp, `        conditionId: "${cond.conditionId}",`);
        x(c, sp, `        comment: true`);
        x(c, sp, `      }, _parents.at(-1));`);
        x(c, sp, `    }`);
      }

      x(c, sp, `  }`);
      x(c, sp, `}`);
    });

    return c.text;
  };
  /**
   * Generates the code recursively for a loop
   * @param {Object} node 
   * @param {String} rv 
   * @param {String} hashName   
   * @param {Number} sp 
   * @param {Array} done 
   * @returns 
   */
  const treatLoop = (cp, node, hashName) => {
    const clone = bbn.fn.clone(node);
    delete clone.loop;
    const c = x();
    const md5 = bbn.fn.md5(node.id);
    const hash = 'bbnLoopHash_' + md5
    const isNumber = 'bbnLoopIsNumber_' + md5;
    const isArray = 'bbnLoopIsArray_' + md5;
    const varName = 'bbnLoopName_' + md5;
    const listName = 'bbnLoopList_' + md5;
    const parentName = 'bbnLoopParent_' + md5;
    const indexName = node.loop.index || ('bbnLoopIndex_' + md5);
    // Starting the loop

    x(c, sp, `let ${varName} = _sIr('${node.loop.hash}', ${node.loop.exp}, ${hashName});`);
    x(c, sp, `let ${isNumber} = bbn.fn.isNumber(${varName});`);
    x(c, sp, `let ${parentName} = _parents.at(-1);`);
    x(c, sp, `let ${listName} = [];`);
    x(c, sp, `let ${isArray} = bbn.fn.isArray(${varName});`);
    x(c, sp, `if (${isNumber}) {`);
    x(c, sp, `  ${varName} = Object.keys((new Array(${varName})).fill(0)).map(a=>parseInt(a));`);
    x(c, sp, `  //bbn.fn.log("LOOP VALUE", ${varName});`);
    x(c, sp, `}`);
    x(c, sp, `for (let ${indexName} in ${varName}) {`);
    x(c, sp, `  if (${isArray}) {`);
    x(c, sp, `    ${indexName} = parseInt(${indexName});`);
    x(c, sp, `  }`);
    x(c, sp, `  let ${node.loop.item} = ${isNumber} ? ${indexName} : ${varName}[${indexName}];`);
    x(c, sp, `  const ${hash} = (${hashName} ? ${hashName} + '-' : '') + '${node.loop.hash}-${indexName}' + ${node.loop.key ? node.loop.item + '[' + node.loop.key + ']' : indexName};`);
    x(c, sp, `  ${listName}.push(${hash});`);
    x(c, sp, `  _sIr('${node.loop.item}', ${node.loop.item}, ${hash});`);
    x(c, sp, `  //bbn.fn.log(${node.loop.item});`);

    sp += 2;
    c.text += nodesToFunction(
      cp,
      [clone],
      hash
    );
    x(c, sp, `delete $_go['${node.id}'];`);
    sp -= 2;
    // Ending the loop
    x(c, sp, `}`);
    x(c, sp, `Array.from(${parentName}.childNodes).forEach(a => {`);
    x(c, sp, `  if ((!a.bbnHash || (a.bbnHash.indexOf(${hashName}) === 0)) && (a.bbnId === "${node.id}") && (${listName}.indexOf(a.bbnHash) === -1)) {`);
    x(c, sp, `    _t.$removeDOM(a);`);
    x(c, sp, `  }`);
    x(c, sp, `});`);
    return c.text;
  };

  const setProperties = function(node, hashName) {
    const c = x();
    x(c, sp, `_props = bbn.fn.createObject();`);
    // Will GO if the element is new or modified and not forgotten
    if (bbn.fn.numProperties(node.attr)) {
      if (node.attr['bbn-bind']) {
        x(c, sp, `_tmp = _sIr('${node.attr['bbn-bind'].hash}', ${node.attr['bbn-bind'].exp}, ${hashName}) || bbn.fn.createObject();`);
        x(c, sp, `if (!$_go['${node.id}'] && (_gIs('${node.attr['bbn-bind'].hash}', ${hashName}) !== "OK")) {`);
        x(c, sp, `  $_go['${node.id}'] = true;`);
        x(c, sp, `}`);
        x(c, sp, `_tmp2 = bbn.fn.createObject();`);
        for (let n in node.attr) {
          if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
            continue;
          }
          
          if (node.attr[n].exp) {
            x(c, sp, `_tmp2['${n}'] = _sIr('${node.attr[n].hash}', ${node.attr[n].exp}, ${hashName});`);
          }
          else {
            x(c, sp, `_tmp2['${n}'] = '${bbn.fn.escapeSquotes(node.attr[n].value)}';`);
          }
        }
        x(c, sp, `bbn.fn.each(bbn.fn.unique(Object.keys(_tmp).concat(Object.keys(_tmp2))), n => {`);
        x(c, sp, `  let val = _tmp2[n] === undefined ? _tmp?.[n] : _tmp2[n];`);
        x(c, sp, `  if (val === undefined) {`);
        x(c, sp, `    return;`);
        x(c, sp, `  }`);
        x(c, sp, `  if (n === 'class') {`);
        x(c, sp, `    _props[n] = bbn.cp.convertClasses(val);`);
        x(c, sp, `  }`);
        x(c, sp, `  else if (n === 'style') {`);
        x(c, sp, `    _props[n] = bbn.cp.convertStyles(val);`);
        x(c, sp, `  }`);
        x(c, sp, `  else {`);
        x(c, sp, `    _props[n] = val;`);
        x(c, sp, `  }`);
        x(c, sp, `  if (!$_go['${node.id}'] && _node.attr[n] && !Object.hasOwn(_node.attr[n], 'value') && _node.attr[n].hash && (_gIs(_node.attr[n].hash, ${hashName}) !== "OK")) {`);
        x(c, sp, `    $_go['${node.id}'] = true;`);
        x(c, sp, `  }`);
        x(c, sp, `});`);
        //x(c, sp, `bbn.fn.log(["PROPS", _props, _tmp, _tmp2, bbn.fn.unique(Object.keys(_tmp).concat(Object.keys(_tmp2)))]);`);
      }
      // Simpler version
      else {
        for (let n in node.attr) {
          if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
            continue;
          }
          
          if (node.attr[n].exp) {
            x(c, sp, `_tmp = _sIr('${node.attr[n].hash}', ${node.attr[n].exp}, ${hashName});`);
            x(c, sp, `if (_tmp !== undefined) {`);
            if (n === 'class') {
              x(c, sp, `  _props['${n}'] = bbn.cp.convertClasses(_tmp);`);
            }
            else if (n === 'style') {
              x(c, sp, `  _props['${n}'] = bbn.cp.convertStyles(_tmp);`);
            }
            else {
              x(c, sp, `  _props['${n}'] = _tmp;`);
            }
            x(c, sp, `}`);
            x(c, sp, `if (!$_go['${node.id}'] && _node.attr['${n}'] && !Object.hasOwn(_node.attr['${n}'], 'value') && _node.attr['${n}'].hash && (_gIs(_node.attr['${n}'].hash, ${hashName}) !== "OK")) {`);
            x(c, sp, `  $_go['${node.id}'] = true;`);
            x(c, sp, `}`);
          }
          else {
            x(c, sp, `_props['${n}'] = '${bbn.fn.escapeSquotes(node.attr[n].value)}';`);
          }
        }

      }

      x(c, sp, ``);
      x(c, sp, ``);
    }

    return c.text;
  };

  /*
  const setDirectives = function(node, hashName) {
    const c = x();
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(c, sp, `_node.directives['${n}'].value = _sIr('${node.directives[n].hash}', ${node.directives[n].exp}, ${hashName});`);

        }
      }
    }

    return c.text;
  }
  */

  const treatElement = function(cp, node, hashName) {
    const c = x();
    if (node.tag) {
      if (node.model) {
        bbn.fn.iterate(node.model, (m, prop) => {
          x(c, sp, `_sIr('${m.hash}', ${m.exp}, ${hashName});`);
          x(c, sp, `if (!$_go['${node.id}'] && (_gIs('${m.hash}', ${hashName}) !== "OK")) {`);
          x(c, sp, `  $_go['${node.id}'] = true;`);
          x(c, sp, `}`);
        });

        x(c, sp, ``);
        x(c, sp, ``);
      }
      if (bbn.fn.numProperties(node.directives)) {
        for (let n in node.directives) {
          if (node.directives[n].exp) {
            x(c, sp, `_sIr('${node.directives[n].hash}', ${node.directives[n].exp}, ${hashName});`);
            x(c, sp, `if (!$_go['${node.id}'] && (_gIs('${node.directives[n].hash}', ${hashName}) !== "OK")) {`);
            x(c, sp, `  $_go['${node.id}'] = true;`);
            x(c, sp, `}`);
          }
        }
      }

      // Start if ($_go)
      x(c, sp, `if ($_go['${node.id}'] && !_forgotten['${node.id}']?.[${hashName} || '_root']) {`);
      sp += 2;
      x(c, sp, `//  bbn.fn.log("IN TODO " + _t.$options.name);`);
      x(c, sp, `//  bbn.fn.log("DOING ${node.id} ${node.tag}");`);
      x(c, sp, `_tmp = bbn.fn.clone(_node);`);
      x(c, sp, `if (${hashName}) {`);
      x(c, sp, `  _tmp.loopHash = ${hashName};`);
      x(c, sp, `}`);
      x(c, sp, `_tmp.props = _props;`);

      if (node.tag === 'component') {
        x(c, sp, `if (bbn.fn.isObject(_props.is)) {`);
        x(c, sp, `  _tmp.tag = _props.name ? bbn.fn.camelToCss(_props.name) : 'bbn-anon';`);
        x(c, sp, `  _tmp.cfg = bbn.cp.normalizeComponent(_props.is);`);
        x(c, sp, `}`);
        x(c, sp, `else {`);
        x(c, sp, `  _tmp.tag = bbn.fn.camelToCss(_props.is);`);
        x(c, sp, `}`);
      }

      x(c, sp, `isAnew = false;`);
      x(c, sp, `if ((_eles['${node.id}'] !== _t.$el) && !_forgotten['${node.id}']?.[${hashName} || '_root'] && (`);
      x(c, sp, `    !_eles['${node.id}']`);
      x(c, sp, `    || bbn.fn.isComment(_eles['${node.id}'])`);
      x(c, sp, `    || !bbn.cp.isTag(_tmp.tag, _eles['${node.id}'])`);
      x(c, sp, `  )`);
      x(c, sp, `) {`);
      x(c, sp, `  isAnew = true;`);
      x(c, sp, `}`);
      x(c, sp, `if (isAnew) {`);
      if (node.model) {
        for (let n in node.model) {
          x(c, sp, `  _tmp.model['${n}'].value = _tmp.props['${n}'] = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
        }
      }
      if (bbn.fn.numProperties(node.directives)) {
        for (let n in node.directives) {
          if (node.directives[n].exp) {
            x(c, sp, `_tmp.directives['${n}'].value = _gIv('${node.directives[n].hash}', ${hashName});`);
          }
        }
      }
      x(c, sp, `  _eles['${node.id}'] = await _t.$createElement(_tmp, _parents.at(-1));`);
      x(c, sp, `  if (_parents.at(-1) === _t.$el) {`);
      x(c, sp, `    $_final.push({ele: _eles['${node.id}'], position: $_num});`);
      x(c, sp, `  }`);
      x(c, sp, `}`);
      x(c, sp, `else {`);


      if (node.model) {
        x(c, sp, `  _tmp.model = _eles['${node.id}'].bbnSchema.model;`);
        for (let n in node.model) {
          if (n === '_default_') {
            x(c, sp, `  if (_t.$isComponent(_eles['${node.id}'])) {`)
            x(c, sp, `    let modelProp = _eles['${node.id}'].bbnCfg?.model?.prop || _eles['${node.id}'].constructor?.bbnCfg?.model?.prop || 'value';`);
            x(c, sp, `    _tmp.model[modelProp].value = _tmp.props[modelProp] = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
            x(c, sp, `  }`);
            x(c, sp, `  else {`);
            x(c, sp, `    _tmp.model.value.value = _tmp.props.value = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
            x(c, sp, `  }`);
          }
          else {
            x(c, sp, `  _tmp.model['${n}'].value = _tmp.props['${n}'] = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
          }
        }
      }
      if (bbn.fn.numProperties(node.directives)) {
        for (let n in node.directives) {
          if (node.directives[n].exp) {
            x(c, sp, `if (_gIs('${node.directives[n].hash}', ${hashName}) !== "OK") {`);
            x(c, sp, `  _node.directives['${n}'].value = _gIv('${node.directives[n].hash}', ${hashName});`);
            x(c, sp, `  _eles['${node.id}'].bbnSchema.directives['${n}'].value = _gIv('${node.directives[n].hash}', ${hashName});`);
            x(c, sp, `  bbn.cp.updateDirectives({"${n}": _node.directives['${n}']}, _eles['${node.id}']);`);
            x(c, sp, `}`);
          }
        }
      }
      x(c, sp, `  _t.$updateElementFromProps(_tmp, _eles['${node.id}']);`);
      x(c, sp, `}`);
      x(c, sp, `if (_parents.at(-1) === _t.$el) {`);
      x(c, sp, `  $_num++;`);
      x(c, sp, `}`);

      let hasEvents = Object.keys(node.events || {}).length > 0;

      if (node.model || hasEvents) {
        x(c, sp, `if (isAnew) {`);
        sp += 2;
        x(c, sp, `let _bbnCurrentElement = _eles['${node.id}'];`);
        if (node.model) {
          for (let name in node.model) {
            let m = node.model[name];
            const modelVarName = m.exp;
            const modelVarBits = bbn.fn.removeEmpty(modelVarName
                    .replace(/\[([^\[\]]*)\]/g, '.$1.')
                    .split('.')
                    .filter(t => t !== ''));
            const modelVarRoot = modelVarBits[0];
            const eventName = m.modifiers.includes('lazy') ? 'change' : 'input';
            x(c, sp, `let _bbnEventName = '${eventName}';`);
            x(c, sp, `let _bbnRealName = '${name}';`);
            if (name === '_default_') {
              x(c, sp, `let _bbnModelCfg = _t.$isComponent(_eles['${node.id}']) ? _eles['${node.id}'].bbnCfg?.model || _eles['${node.id}'].constructor?.bbnCfg?.model : {prop: 'value', event: _bbnEventName};`);
              x(c, sp, `_bbnRealName = _bbnModelCfg.prop;`);
              x(c, sp, `_bbnEventName = _bbnModelCfg.event;`);
              x(c, sp, `_bbnCurrentElement.bbnSchema.model[_bbnRealName] = _bbnCurrentElement.bbnSchema.model._default_;`);
              x(c, sp, `delete _bbnCurrentElement.bbnSchema.model._default_;`);
              if (node.tag === 'bbn-checkbox') {
                x(c, sp, `bbn.fn.warning(_bbnRealName)`);
              }
            }
            x(c, sp, `_bbnCurrentElement.addEventListener(_bbnEventName, _bbnEventObject => {`);
            x(c, sp, `  let $event = _bbnEventObject;`);
            x(c, sp, `  let _bbnEventValue = $event.detail?.args ? $event.detail.args[0] : $event.target?.value;`);
            x(c, sp, `  let oldValue = bbn.fn.isPrimitive(${modelVarName}) ? _sIr("${m.hash}", ${modelVarName}, ${hashName}) : ${modelVarName};`);
            //x(c, sp, `  bbn.fn.log(["ON MODEL CHANGE", _bbnEventName, oldValue, "${modelVarRoot}", _bbnEventValue, _t.$options.name]);`);
            x(c, sp, `  if (oldValue !== _bbnEventValue) {`);
            if (modelVarRoot === modelVarName) {
              x(c, sp, `    if (Object.hasOwn(_t.$props, "${modelVarRoot}")) {`);
              x(c, sp, `      bbn.fn.log("IS A PROP " + _bbnRealName, _t.$options.name, "${modelVarRoot}", _bbnEventValue);`);
              x(c, sp, `      _t.$setProp("${modelVarRoot}", _bbnEventValue);`);
              x(c, sp, `    }`);
              x(c, sp, `    else {`);
              x(c, sp, `      _t["${modelVarRoot}"] = _bbnEventValue;`);
              x(c, sp, `    }`);
              x(c, sp, `    ${modelVarRoot} = _bbnEventValue;`);
              x(c, sp, `    bbn.fn.log("FROM MODEL " + _bbnRealName, _t.$options.name, _t.$cfg.props, _bbnEventValue, ${modelVarRoot}, "${modelVarRoot}", Object.hasOwn(_t.$cfg.props, "${modelVarRoot}"));`);
            }
            else {
              /*
              let st = '_t';
              let prop;
              let isQuoted = false;
              bbn.fn.each(modelVarBits, (bit, i) => {
                if (i === modelVarBits.length - 1) {
                  prop = bit;
                  if (['"', "'", "`"].includes(bit.substr(0, 1))) {
                    isQuoted = true;
                  }

                  return false;
                }
                else {
                  if (['"', "'", "`"].includes(bit.substr(0, 1))) {
                    st += `[${bit}]`;
                  }
                  else {
                    st += `.${bit}`;
                  }
                }
              });

              x(c, sp, `    bbn.fn.log("FROM MODEL ${name}", "${st}", _bbnEventValue, ${JSON.stringify(modelVarBits)}, "${modelVarRoot}");`);
              x(c, sp, `    _t.$set(${st}, ${isQuoted ? prop : "'" + prop + "'"}, _bbnEventValue);`);
              */
              x(c, sp, `    ${modelVarName} = _bbnEventValue;`);
            }
            //x(c, sp, `    ${modelVarName} = _bbnEventValue;`);
            x(c, sp, `    _bbnCurrentElement.bbnSchema.model[_bbnRealName].value = _bbnEventValue;`);
            x(c, sp, `    _bbnCurrentElement.bbnSchema.props[_bbnRealName] = _bbnEventValue;`);
            x(c, sp, `    if (_bbnCurrentElement?.bbn) {`);
            x(c, sp, `      _bbnCurrentElement?.bbn.$forceUpdate();`);
            x(c, sp, `    }`);
            x(c, sp, `    _t.$forceUpdate();`);
            x(c, sp, `    _t.$forceUpdate();`);
            x(c, sp, `  }`);
            x(c, sp, `});`);
          }
        }

        if (hasEvents) {
          for (let n in node.events) {
            let ev = node.events[n];
            //x(c, sp, `bbn.fn.log("SETTING EVENT ${n} ON " + _t.$options.name, _ele, ${isAnew});`);
            x(c, sp, `_eles['${node.id}'].addEventListener("${n}", _bbnEventObject => {`);
            //x(c, sp, `  bbn.fn.log("EXECUTING EVENT ${n} ${ev.action} ON ${node.tag}", _bbnEventObject.detail);`);
            x(c, sp, `  let $event = _bbnEventObject;`);
            if (ev.modifiers.length) {
              x(c, sp, `  if (!_bbnEventObject.key || !${JSON.stringify(ev.modifiers)}.includes(_bbnEventObject.key.toLowerCase())) {`);
              x(c, sp, `    return;`);
              x(c, sp, `  }`);
            }

            if (ev.prevent) {
              x(c, sp, `  $event.preventDefault();`);
            }

            if (ev.stop) {
              x(c, sp, `  $event.stopImmediatePropagation();`);
            }

            if (ev.action) {
              if ((ev.action.indexOf(';') > -1) || (ev.action.indexOf('if') === 0)){
                x(c, sp, `  ${ev.action};`);
              }
              else {
                x(c, sp, `  let $_action = (${ev.action});`);
                x(c, sp, `  if (bbn.fn.isFunction($_action)) {`);
                x(c, sp, `    const args = _bbnEventObject.detail?.args || [$event];`);
                x(c, sp, `    args.push(_bbnEventObject);`);
                x(c, sp, `    $_action.bind(_t.$origin)(...args);`);
                x(c, sp, `  }`);
              }
              x(c, sp, `  bbn.fn.iterate(_bbnCurrentData, (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {`);
              x(c, sp, `    //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');`);
              x(c, sp, `    if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {`);
              x(c, sp, `      if (_t[_bbnCurrentDataIndex] !== undefined) {`);
              x(c, sp, `        _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);`);
              x(c, sp, `      }`);
              x(c, sp, `      _bbnCurrentData[_bbnCurrentDataIndex] = _t[_bbnCurrentDataIndex];`);
              x(c, sp, `    }`);
              x(c, sp, `  });`);
            }

            x(c, sp, `  _t.$tick();`);
            let eventEnd = '}';
            if (ev.once || ev.passive || ev.capture) {
              eventEnd += ', {';
              if (ev.once) {
                eventEnd += `once: true,`;
              }

              if (ev.passive) {
                eventEnd += `passive: true,`;
              }

              if (ev.capture) {
                eventEnd += `capture: true,`;
              }

              eventEnd += '}';
            }

            eventEnd += ');';
            x(c, sp, eventEnd);
          }
        }

        sp -= 2;
        x(c, sp, `}`);
        x(c, sp, ``);
        x(c, sp, ``);
      }

      sp -= 2;
      // End if ($_go)
      x(c, sp, `}`);
    }

    return c.text;
  };

  const treatSlot = function(cp, node, hashName) {
    const c = x();
    if (node.tag === 'slot') {
      let slot = "'default'";
      if (node.attr?.name) {
        slot = node.attr.name.exp ? `${node.attr.name.exp}` : `'${node.attr.name.value}'`;
      }
      x(c, sp, `_eles['${node.id}'] = _parents.at(-1);`);
      x(c, sp, `if (_t.$el.bbnSlots?.[${slot}]?.length) {`);
      // Iterating the elements going in the slot
      x(c, sp, `  bbn.fn.each(_t.$el.bbnSlots[${slot}], a => {`);
      //x(c, sp, `    bbn.fn.log("This is a slot element", a)`);
      x(c, sp, `    let search = {bbnId: a.bbnId};`);
      x(c, sp, `    if (a.bbnHash) {`);
      x(c, sp, `      search.bbnHash = a.bbnHash;`);
      x(c, sp, `    }`);
      // Case where the slot is inside another component
      x(c, sp, `    if ((_parents.at(-1) !== _t.$el) && bbn.cp.isComponent(_parents.at(-1))) {`);
      x(c, sp, `      let idx = bbn.fn.search(_parents.at(-1).bbnSlots[${slot}], search);`);
      x(c, sp, `      _parents.at(-1).bbnSlots.default.splice(idx > -1 ? idx : _parents.at(-1).bbnSlots.default.length, idx > -1 ? 1 : 0, a);`);
      x(c, sp, `      if (_parents.at(-1).bbn) {`);
      x(c, sp, `        _parents.at(-1).bbn.$tick();`);
      x(c, sp, `      }`);
      x(c, sp, `    }`);
      // Else if only the element is not mounted (otherwise it's already there)
      x(c, sp, `    else if (!a.parentNode) {`);
      x(c, sp, `      if (_parents.at(-1) === _t.$el) {`);
      x(c, sp, `        $_final.push({ele: a, position: $_num});`);
      x(c, sp, `      }`);
      x(c, sp, `      else {`);
      x(c, sp, `        let idx = bbn.fn.search(_parents.at(-1).childNodes, search);`);
      x(c, sp, `        if (idx > -1) {`);
      x(c, sp, `          _parents.at(-1).replaceChild(a, _parents.at(-1).childNodes[idx]);`);
      x(c, sp, `        }`);
      x(c, sp, `        else {`);
      x(c, sp, `          _parents.at(-1).appendChild(a);`);
      x(c, sp, `        }`);
      x(c, sp, `      }`);
      x(c, sp, `    }`);
      x(c, sp, `    if (_parents.at(-1) === _t.$el) {`);
      x(c, sp, `      $_num++;`);
      x(c, sp, `    }`);
      x(c, sp, `  });`);
      x(c, sp, `}`);
      c.text += treatItems(cp, node, hashName);
    }

    return c.text;
  };

  const treatText = function(node, hashName) {
    const c = x();
    if (node.text) {
      x(c, sp, `_sIr('${node.hash}', \`${bbn.fn.escapeTicks(node.text)}\`, ${hashName});`);
      x(c, sp, `if ($_go['${node.id}'] || (_gIs('${node.hash}', ${hashName}) !== "OK")) {`);
      x(c, sp, `  if (_eles['${node.id}'] && (_eles['${node.id}'].textContent !== _gIv('${node.hash}', ${hashName}))) {`);
      x(c, sp, `    _eles['${node.id}'].textContent = _gIv('${node.hash}', ${hashName});`);
      x(c, sp, `  }`);
      x(c, sp, `  else {`);
      x(c, sp, `    _eles['${node.id}'] = _t.$createText({`);
      x(c, sp, `      id: '${node.id}',`);
      x(c, sp, `      hash: '${node.hash}',`);
      x(c, sp, `      text: _gIv('${node.hash}', ${hashName}),`);
      x(c, sp, `      loopHash: ${hashName},`);
      x(c, sp, `    }, _parents.at(-1));`);
      x(c, sp, `    if (_parents.at(-1) === _t.$el) {`);
      x(c, sp, `      $_final.push({ele: _eles['${node.id}'], position: $_num});`);
      x(c, sp, `    }`);
      x(c, sp, `  }`);
      x(c, sp, `}`);
      x(c, sp, `if (_parents.at(-1) === _t.$el) {`);
      x(c, sp, `  $_num++;`);
      x(c, sp, `}`);
      x(c, sp, ``);
      x(c, sp, ``);
    }

    return c.text;
  };

  const treatItems = function(cp, node, hashName) {
    const c = x();
    if (node.items?.length) {
      x(c, sp, `if (_eles['${node.id}']) {`);
      sp += 2;
      x(c, sp, `_parents.push(_eles['${node.id}']);`);
      c.text += nodesToFunction(cp, node.items, hashName);
      x(c, sp, `_parents.pop();`);
      sp -= 2;
      x(c, sp, `}`);

      x(c, sp, ``);
      x(c, sp, ``);
    }

    return c.text;
  };

  const endCondition = function(node) {
    const c = x();
    if (node.condition) {
      sp -= 2;
      x(c, sp, `//Ending condition`);
      x(c, sp, `}`);
      x(c, sp, ``);
      x(c, sp, ``);
    }

    return c.text;
  };

  /**
   * Recursive function that takes an array of objects representing nodes in an 
   * HTML-like structure and generates JavaScript code based on those nodes. 
   * 
   * @param {Array} arr the nodes array
   * @param {String} varName variable name that is used to reference the data object that corresponds to the current node
   * @param {Number} sp number of spaces to use for indentation in the generated code
   * @param {Array} done array that keeps track of variables that have already been defined to avoid re-definition
   * @returns {String}
   */
  const nodesToFunction = function(cp, arr, hashName) {
    const c = x();
    let conditions = [];
    let conditionId = null;
    bbn.fn.each(arr, (node, i) => {
      x(c, sp, '');
      x(c, sp, `// Taking care of the node ${node.tag || 'with no tag'} ${node.id}`);
      if (node.loop?.exp) {
        c.text += treatLoop(cp, node, hashName);
        return;
      }

      // Launching condition (MUST be before the rest)
      if (node.condition) {
        if ((node.conditionId !== conditionId) && !conditions.includes(node.conditionId)) {
          conditions.push(node.conditionId);
          conditionId = node.conditionId;
          c.text += treatCondition(cp, node, arr, hashName);
        }

        let condText = (node.condition.type === 'elseif' ? 'else if' : node.condition.type);
        if (node.condition.type !== 'else') {
          condText += ' (_gIv("' + node.condition.hash + '", ' + hashName + '))';
        }
        // New level
        condText += ' {';
        x(c, sp, condText);
        sp += 2;
      }
      
      x(c, sp, `oldEle = _t.$retrieveElement("${node.id}", ${hashName});`);
      x(c, sp, `_node = _t.$currentMap['${node.id}'];`);
      x(c, sp, `_eles['${node.id}'] = oldEle;`);
      x(c, sp, `if (!Object.hasOwn($_go, '${node.id}')) {`);
      x(c, sp, `  $_go['${node.id}'] = !oldEle;`);
      x(c, sp, `}`);

      // Setting _forgotten variable
      if (node.forget?.exp) {
        x(c, sp, `_sIr('${node.forget.hash}', ${node.forget.exp}, ${hashName});`);
        x(c, sp, `if (!_forgotten['${node.id}']) {`);
        x(c, sp, `  _forgotten['${node.id}'] = bbn.fn.createObject();`);
        x(c, sp, `}`);
        x(c, sp, `_forgotten['${node.id}'][${hashName} || '_root'] = _gIv('${node.forget.hash}', ${hashName});`);
        x(c, sp, `if (_forgotten['${node.id}'][${hashName} || '_root']) {`);
        x(c, sp, `  _eles['${node.id}'] = _parents.at(-1);`);
        x(c, sp, `  $_go['${node.id}'] = false;`);
        x(c, sp, `}`);
        x(c, sp, `else if (['NEW', 'MOD'].includes(_gIs('${node.forget.hash}', ${hashName}))) {`);
        x(c, sp, `  $_go['${node.id}'] = true;`);
        x(c, sp, `}`);

        x(c, sp, ``);
        x(c, sp, ``);
      }
  
      let treatEle = true;
      if ((!node.pre && (node.tag === 'template'))
          || ('transition' === node.tag)
      ) {
        x(c, sp, `_eles['${node.id}'] = _parents.at(-1);`);
        x(c, sp, `$_go['${node.id}'] = false;`);
        treatEle = false;
      }
      else {
        x(c, sp, `if (!$_go['${node.id}'] && !_eles['${node.id}']) {`);
        x(c, sp, `  $_go['${node.id}'] = true;`);
        x(c, sp, `}`);
      }
      //x(c, sp, `bbn.fn.log(["nodesToFunction", "${node.tag || 'no'}", $_go['${node.id}']]);`);

      if (node.text) {
        c.text += treatText(node, hashName);
      }
      else if (node.tag === 'slot') {
        c.text += treatSlot(cp, node, hashName);
      }
      else if (node.tag) {

        c.text += setProperties(node, hashName);
        //c.text += setDirectives(node, hashName);
        if (treatEle) {
          c.text += treatElement(cp, node, hashName);
        }
          
        if (node.forget?.exp) {
          x(c, sp, `if (_gIs('${node.forget.hash}', ${hashName}) === 'MOD') {`);
          x(c, sp, `  if (_forgotten['${node.id}']?.[${hashName} || '_root']) {`);
          x(c, sp, `    if (oldEle) {`);
          x(c, sp, `      oldEle.childNodes.forEach(o => {`);
          x(c, sp, `        _parents.at(-1).appendChild(o);`);
          x(c, sp, `      });`);
          x(c, sp, `      bbn.fn.log("From here");`);
          x(c, sp, `      _t.$removeDOM(oldEle);`);
          x(c, sp, `    }`);
          x(c, sp, `    // Ele is the current parent`);
          x(c, sp, `    _eles['${node.id}'] = _parents.at(-1);`);
          x(c, sp, `  }`);
          x(c, sp, `  else {`);
          x(c, sp, `    _parents.at(-1).childNodes.forEach(o => {`);
          x(c, sp, `      if (o.bbnId.indexOf('${node.id}' + "-") === 0) {`);
          x(c, sp, `        _eles['${node.id}'].appendChild(o);`);
          x(c, sp, `      }`);
          x(c, sp, `    });`);
          x(c, sp, `  }`);
          x(c, sp, `}`);
          x(c, sp, `else if (_forgotten['${node.id}']?.[${hashName} || '_root']) {`);
          x(c, sp, `  _eles['${node.id}'] = _parents.at(-1);`);
          x(c, sp, `}`);
          

          x(c, sp, ``);
          x(c, sp, ``);
        }


        if (node.pre) {
          x(c, sp, `if (_eles['${node.id}']) {`);
          x(c, sp, `  _eles['${node.id}'].innerHTML = \`${bbn.fn.escapeTicks(node.pre)}\`;`);
          x(c, sp, `}`);

          x(c, sp, ``);
          x(c, sp, ``);
        }
        else {
          c.text += treatItems(cp, node, hashName);
        }
        x(c, sp, `if ((_t.$el === _parents.at(-1)) && _eles['${node.id}'] && (_eles['${node.id}'] !== _t.$el)) {`);
        x(c, sp, `  $_num++;`);
        x(c, sp, `}`);


      }
  
      c.text += endCondition(node);

    });

    return c.text;
  };

  /**
   * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
   * - Updates the component element based on its own schema ($el.bbnSchema)
   * - Updates the schema
   * - Generates/update the DOM when needed
   * 
   * @param {Boolean} shadow The content will go to the shadow DOM if true
   * @returns {Promise}
   */
  bbn.fn.autoExtend('cp', {
    templateToFunction(cp, tpl, sp = 0) {
      let hashName = '_bbnHash';
      let c = x();
      x(c, sp, `async (_t, _d) => {`);
      sp += 2;
      let code2 = '';
      x(c, sp, `const $_prep = ${$_prep.toString()};`);
      x(c, sp, `const _r = _t.$currentResult;`);
      x(c, sp, `let ${hashName} = '';`);
      x(c, sp, `bbn.fn.iterate(_r, a => {`);
      x(c, sp, `  bbn.fn.iterate(a, b => {`);
      x(c, sp, `    if (b.state !== 'DEL') {`);
      x(c, sp, `      b.state = 'TMP';`);
      x(c, sp, `    }`);
      x(c, sp, `  });`);
      x(c, sp, `});`);
      x(c, sp, `const _bbnCurrentData = bbn.fn.createObject();`);
      for (let n in cp.$namespaces) {
        if (cp.$namespaces[n] === 'props') {
          continue;
        }
        if (cp.$namespaces[n] === 'method') {
          x(c, sp, `const ${n} = _t.${n}.bind(_t);`);
        }
        else if (n.indexOf('$') === 0) {
          x(c, sp, `const ${n} = _t.${n};`);
        }
        else {
          x(c, sp, `let ${n} = _t["${n}"];`);
          if (n !== 'internal') {
            x(c, sp, `_bbnCurrentData["${n}"] = ${n};`);
          }
        }
      }

      for (let n in cp.$cfg.props) {
        x(c, sp, `let ${n} = _t["${n}"];`);
        x(c, sp, `_bbnCurrentData["${n}"] = ${n};`);
      }
      x(c, sp, `let ownProps = Object.getOwnPropertyNames(_t);`);
      x(c, sp, `let n;`);
      x(c, sp, `for (let i = 0; n = ownProps[i]; i++) {`);
      x(c, sp, `  if ((n.indexOf('$') !== 0) && !_t.$namespaces[n]) {`);
      //x(c, sp, `    bbn.fn.warning('var ' + n + ' = _t["' + n + '"];');`);
      x(c, sp, `    eval('var ' + n + ' = _t["' + n + '"];');`);
      x(c, sp, `  }`);
      x(c, sp, `}`);
      
      x(c, sp, `// _setInternalResult`);
      x(c, sp, `const _sIr = (_name, _exp, _hash) => {`);
      x(c, sp, `  return _t.$_setInternalResult(_r, _name, _exp, _hash);`);
      x(c, sp, `};`);
      x(c, sp, `// _getInternalState`);
      x(c, sp, `const _gIs = (_name, _hash) => {`);
      x(c, sp, `  return _t.$_getInternalState(_r, _name, _hash);`);
      x(c, sp, `};`);
      x(c, sp, `// _getInternalValue`);
      x(c, sp, `const _gIv = (_name, _hash) => {`);
      x(c, sp, `  let val = undefined;`);
      x(c, sp, `  try {`);
      x(c, sp, `    val = _t.$_getInternalValue(_r, _name, _hash);`);
      x(c, sp, `  } catch (e) {`);
      x(c, sp, `    bbn.fn.log("THERE SHOULD BE AN ERROR", _name, _t);`);
      x(c, sp, `  }`);
      x(c, sp, `  return val;`);
      x(c, sp, `};`);
      x(c, sp, `const _eles = bbn.fn.createObject({"-": _t.$el});`);
      x(c, sp, `let _isCondTrue = false;`);
      x(c, sp, `let _props = bbn.fn.createObject();`);
      x(c, sp, `let _lastId = '';`);
      x(c, sp, `let _tmp;`);
      x(c, sp, `let _tmp2;`);
      x(c, sp, `let _node;`);
      x(c, sp, `let isAnew;`);
      x(c, sp, `let oldEle;`);
      x(c, sp, `const _cps = [];`);
      x(c, sp, `const _parents = [_t.$el];`);
      x(c, sp, `let $_ct = _t.$el;`);
      x(c, sp, `const _forgotten = bbn.fn.createObject();`);
      x(c, sp, `const $_go = bbn.fn.createObject();`);
      x(c, sp, `let $_num = 0;`);
      x(c, sp, `const $_final = [];`);
      x(c, sp, `_r._num++;`);
      if ((tpl.length === 1)
          && tpl[0].items
          && !tpl[0].attr?.['bbn-if']
          && !tpl[0].attr?.['bbn-for']
          && !tpl[0].attr?.['bbn-model']
          && !tpl[0].attr?.['bbn-forget']
          && !bbn.cp.isComponent(tpl[0])
          && !['slot', 'template', 'component'].includes(tpl[0].tag)
      ) {
        //x(c, sp, `_eles['0-0'] = _t.$el;`);
        if (tpl[0].attr) {
          for (let n in tpl[0].attr) {
            x(c, sp, `_props["${n}"] = `);
            if (tpl[0].attr[n].exp) {
              x(c, sp, `_sIr("${tpl[0].attr[n].hash}", ${tpl[0].attr[n].exp}, ${hashName});`);
            }
            else {
              x(c, sp, `"${bbn.fn.escapeDquotes(tpl[0].attr[n].value)}";`);
            }
          }
          x(c, sp, `_t.$updateFromSchema(_props);`);
          if (tpl[0].events) {
            x(c, sp, `if (_r._num === 1) {`);
            sp += 2;
            for (let n in tpl[0].events) {
              let ev = tpl[0].events[n];

              x(c, sp, `if (!_eles['-'].bbnSchema?.events?.["${n}"]) {`);
              sp += 2;
              //x(c, sp, `bbn.fn.log("SETTING EVENT ${n} ON " + _t.$options.name, _ele, ${isAnew});`);
              x(c, sp, `_eles['-'].addEventListener("${n}", _bbnEventObject => {`);
              //x(c, sp, `  bbn.fn.log("EXECUTING EVENT ${n} ${ev.action} ON ${node.tag}", _bbnEventObject.detail);`);
              if (ev.modifiers.length) {
                x(c, sp, `  if (!_bbnEventObject.key || !${JSON.stringify(ev.modifiers)}.includes(_bbnEventObject.key.toLowerCase())) {`);
                x(c, sp, `    return;`);
                x(c, sp, `  }`);
              }

              x(c, sp, `  let $event = _bbnEventObject;`);

              if (ev.prevent) {
                x(c, sp, `  $event.preventDefault();`);
              }

              if (ev.stop) {
                x(c, sp, `  $event.stopImmediatePropagation();`);
              }

              if (ev.action) {
                if ((ev.action.indexOf(';') > -1) || (ev.action.indexOf('if') === 0)){
                  x(c, sp, `  ${ev.action};`);
                }
                else {
                  x(c, sp, `  let $_action = (${ev.action});`);
                  x(c, sp, `  if (bbn.fn.isFunction($_action)) {`);
                  x(c, sp, `    const args = _bbnEventObject.detail?.args || [$event];`);
                  x(c, sp, `    args.push(_bbnEventObject);`);
                  x(c, sp, `    $_action.bind(_t.$origin)(...args);`);
                  x(c, sp, `  }`);
                }

                x(c, sp, `  bbn.fn.iterate(_bbnCurrentData, (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {`);
                x(c, sp, `    //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');`);
                x(c, sp, `    if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {`);
                x(c, sp, `      if (_t[_bbnCurrentDataIndex] !== undefined) {`);
                x(c, sp, `        _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);`);
                x(c, sp, `      }`);
                x(c, sp, `      _bbnCurrentData[_bbnCurrentDataIndex] = _t[_bbnCurrentDataIndex];`);
                x(c, sp, `    }`);
                x(c, sp, `  });`);
              }

              x(c, sp, `  _t.$forceUpdate();`);
              let eventEnd = '}';
              if (ev.once || ev.passive || ev.capture) {
                eventEnd += ', {';
                if (ev.once) {
                  eventEnd += `once: true,`;
                }
  
                if (ev.passive) {
                  eventEnd += `passive: true,`;
                }
  
                if (ev.capture) {
                  eventEnd += `capture: true,`;
                }
  
                eventEnd += '}';
              }
  
              eventEnd += ');';
              x(c, sp, eventEnd);
              sp -= 2;
              x(c, sp, '}');
            }
            sp -= 2;
            x(c, sp, `}`);
          }
        }
        else {
          x(c, sp, `_t.$updateFromSchema();`);
        }
        c.text += nodesToFunction(cp, tpl[0].items, hashName);
      }
      else {
        x(c, sp, `_t.$updateFromSchema();`);
        c.text += nodesToFunction(cp, tpl, hashName);
      }
      //x(c, sp, `bbn.fn.warning("KKKKK"); bbn.fn.log($_final);`);
      x(c, sp, `bbn.fn.each($_final, a => {`);
      x(c, sp, `  if (_t.$el.childNodes[a.position]) {`);
      x(c, sp, `    _t.$insertElement(a.ele, _t.$el, _t.$el.childNodes[a.position]);`);
      x(c, sp, `  }`);
      x(c, sp, `  else {`);
      x(c, sp, `    _t.$insertElement(a.ele, _t.$el);`);
      x(c, sp, `  }`);
      x(c, sp, `})`);
      c.text += code2;
      x(c, sp, `bbn.fn.iterate(_r, a => {`);
      x(c, sp, `  bbn.fn.iterate(a, b => {`);
      x(c, sp, `    if (b.state === 'TMP') {`);
      x(c, sp, `      b.state = 'DEL';`);
      x(c, sp, `    }`);
      x(c, sp, `  });`);
      x(c, sp, `});`);
      x(c, sp, `return _r;`);
      sp -= 2;
      x(c, sp, `}`);
        
      return eval(c.text);
  
    }
  });
})();
