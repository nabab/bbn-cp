const $_prep = st => {
  if (st.trim().match(/^\{|\[/)) {
    return '(() => {return ' + st + '})()';
  }

  return st;
};

const writer = function() {
  let text = '';
  let spaces = 0;
  const x = function(st) {
      text += ' '.repeat(spaces) + st + '\n';
  };
  x.get = function(clean) {
    if (clean) {
      const tmp = text;
      text = '';
      return tmp;
    }
    return text;
  };
  x.clean = function() {text = ''; return x};
  x.msp = function() {spaces += 2; return x};
  x.lsp = function() {spaces -= 2; return x};
  return x;
};
const x = new writer();

const forbidden = ['bbn-forget', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else'];

const treatCondition = (cp, node, arr, hashName) => {
  let tmp = arr.filter(a => (a.conditionId === node.conditionId));
  if (!tmp.length || !node.conditionId) {
    bbn.fn.log("FINISHING HERE ",node.conditionId, node.condition);
    return;
  }

  x(`_isCondTrue = false;`);
  x('// Checking the set of conditions (if any other) on the first condition');
  bbn.fn.each(tmp, (cond, j) => {
    x(`$_go['${cond.id}'] = false;`);
    // No need to check thge first as _isCondTrue has just been defined
    if (j) {
      x(`if (!_isCondTrue) {`);
      x.msp();
    }
    x(`_isCondTrue = _sIr("${cond.condition.hash}", ${cond.condition.type === 'else' ? 'true' : cond.condition.exp}, ${hashName});`);
    if (j) {
      x.lsp();
      x(`}`);
      x(`else {`);
      x(`  _sIr("${cond.condition.hash}", false, ${hashName});`);
      x(`}`);
    }
    x(`if (_gIs("${cond.condition.hash}", ${hashName}) !== "OK") {`)
    x(`  $_go['${cond.id}'] = true;`);
    x(`  let _tmp = _gIv("${cond.condition.hash}", ${hashName});`);
    x(`  let _e;`);
    x(`  if (!_tmp) {`);
    if (['template', 'transition', 'slot'].includes(cond.tag)) {
      if (cond.items) {
        bbn.fn.each(cond.items, it => {
          x(`    _e = _t.$retrieveElement("${it.id}", ${hashName});`);
          x(`    if (_e && !bbn.fn.isComment(_e)) {`);
          x(`      _t.$removeDOM(_e);`);
          x(`    }`);
        });
      }
    }
    else {
      x(`    _e = _t.$retrieveElement("${cond.id}", ${hashName});`);
      x(`    if (_e && !bbn.fn.isComment(_e)) {`);
      //x(`      bbn.fn.log("REMOVING ${cond.id} from node2fn")`);
      x(`      let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;`);
      //x(`      bbn.fn.log("this is my moment", _e.tagName, _t.$options.name);`);
      x(`      _t.$removeDOM(_e);`);
      x(`      _e = false;`);
      x(`    }`);
      x(`    if (!_e) {`);
      x(`      _eles['${cond.id}'] = await _t.$createElement({`);
      x(`        id: "${cond.id}",`);
      x(`        hash: "${cond.condition.hash}",`);
      x(`        loopHash: ${hashName},`);
      x(`        conditionId: "${cond.conditionId}",`);
      x(`        comment: true`);
      x(`      }, _parents.at(-1));`);
      x(`    }`);
    }

    x(`  }`);
    x(`}`);
  });
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
  const md5 = bbn.fn.md5(node.id);
  const hash = 'bbnLoopHash_' + md5
  const isNumber = 'bbnLoopIsNumber_' + md5;
  const isArray = 'bbnLoopIsArray_' + md5;
  const varName = 'bbnLoopName_' + md5;
  const listName = 'bbnLoopList_' + md5;
  const parentName = 'bbnLoopParent_' + md5;
  const indexName = node.loop.index || ('bbnLoopIndex_' + md5);
  // Starting the loop

  x(`let ${varName} = _sIr('${node.loop.hash}', ${node.loop.exp}, ${hashName});`);
  x(`let ${isNumber} = bbn.fn.isNumber(${varName});`);
  x(`let ${parentName} = _parents.at(-1);`);
  x(`let ${listName} = [];`);
  x(`let ${isArray} = bbn.fn.isArray(${varName});`);
  x(`if (${isNumber}) {`);
  x(`  ${varName} = Object.keys((new Array(${varName})).fill(0)).map(a=>parseInt(a));`);
  x(`  //bbn.fn.log("LOOP VALUE", ${varName});`);
  x(`}`);
  x(`for (let ${indexName} in ${varName}) {`);
  x(`  if (${isArray}) {`);
  x(`    ${indexName} = parseInt(${indexName});`);
  x(`  }`);
  x(`  let ${node.loop.item} = ${isNumber} ? ${indexName} : ${varName}[${indexName}];`);
  x(`  const ${hash} = (${hashName} || '') + '${node.loop.hash}-${indexName}-' + (${node.attr?.key?.exp ? node.attr.key.exp : indexName});`);
  x(`  ${listName}.push(${hash});`);
  x(`  _sIr('${node.loop.item}', ${node.loop.item}, ${hash});`);
  x(`  //bbn.fn.log(${node.loop.item});`);

  x.msp();
  nodesToFunction(
    cp,
    [clone],
    hash
  );
  x(`delete $_go['${node.id}'];`);
  x.lsp();
  // Ending the loop
  x(`}`);
  x(`Array.from(${parentName}.childNodes).forEach(a => {`);
  x(`  if ((!a.bbnHash || (a.bbnHash.indexOf(${hashName}) === 0)) && (a.bbnId === "${node.id}") && (${listName}.indexOf(a.bbnHash) === -1)) {`);
  x(`    _t.$removeDOM(a);`);
  x(`  }`);
  x(`});`);
};

const setProperties = function(node, hashName) {
  x(`_props = bbn.fn.createObject();`);
  // Will GO if the element is new or modified and not forgotten
  if (bbn.fn.numProperties(node.attr)) {
    if (node.attr['bbn-bind']) {
      x(`_tmp = _sIr('${node.attr['bbn-bind'].hash}', ${node.attr['bbn-bind'].exp}, ${hashName}) || bbn.fn.createObject();`);
      x(`if (!$_go['${node.id}'] && (_gIs('${node.attr['bbn-bind'].hash}', ${hashName}) !== "OK")) {`);
      x(`  $_go['${node.id}'] = true;`);
      x(`}`);
      x(`_tmp2 = bbn.fn.createObject();`);
      for (let n in node.attr) {
        if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
          continue;
        }
        
        if (node.attr[n].exp) {
          x(`_tmp2['${n}'] = _sIr('${node.attr[n].hash}', ${node.attr[n].exp}, ${hashName});`);
        }
        else {
          x(`_tmp2['${n}'] = '${bbn.fn.escapeSquotes(node.attr[n].value)}';`);
        }
      }
      x(`bbn.fn.each(bbn.fn.unique(Object.keys(_tmp).concat(Object.keys(_tmp2))), n => {`);
      x(`  let val = _tmp2[n] === undefined ? _tmp?.[n] : _tmp2[n];`);
      x(`  if (val === undefined) {`);
      x(`    return;`);
      x(`  }`);
      x(`  if (n === 'class') {`);
      x(`    _props[n] = bbn.cp.convertClasses(val);`);
      x(`  }`);
      x(`  else if (n === 'style') {`);
      x(`    _props[n] = bbn.cp.convertStyles(val);`);
      x(`  }`);
      x(`  else {`);
      x(`    _props[n] = val;`);
      x(`  }`);
      x(`  if (!$_go['${node.id}'] && _node.attr[n] && !Object.hasOwn(_node.attr[n], 'value') && _node.attr[n].hash && (_gIs(_node.attr[n].hash, ${hashName}) !== "OK")) {`);
      x(`    $_go['${node.id}'] = true;`);
      x(`  }`);
      x(`});`);
      //x(`bbn.fn.log(["PROPS", _props, _tmp, _tmp2, bbn.fn.unique(Object.keys(_tmp).concat(Object.keys(_tmp2)))]);`);
    }
    // Simpler version
    else {
      for (let n in node.attr) {
        if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
          continue;
        }
        
        if (node.attr[n].exp) {
          x(`_tmp = _sIr('${node.attr[n].hash}', ${node.attr[n].exp}, ${hashName});`);
          x(`if (_tmp !== undefined) {`);
          if (n === 'class') {
            x(`  _props['${n}'] = bbn.cp.convertClasses(_tmp);`);
          }
          else if (n === 'style') {
            x(`  _props['${n}'] = bbn.cp.convertStyles(_tmp);`);
          }
          else {
            x(`  _props['${n}'] = _tmp;`);
          }
          x(`}`);
          x(`if (!$_go['${node.id}'] && _node.attr['${n}'] && !Object.hasOwn(_node.attr['${n}'], 'value') && _node.attr['${n}'].hash && (_gIs(_node.attr['${n}'].hash, ${hashName}) !== "OK")) {`);
          x(`  $_go['${node.id}'] = true;`);
          x(`}`);
        }
        else {
          x(`_props['${n}'] = '${bbn.fn.escapeSquotes(node.attr[n].value)}';`);
        }
      }

    }

    x(``);
    x(``);
  }
};

/*
const setDirectives = function(node, hashName) {
  const c = x();
  if (bbn.fn.numProperties(node.directives)) {
    for (let n in node.directives) {
      if (node.directives[n].exp) {
        x(`_node.directives['${n}'].value = _sIr('${node.directives[n].hash}', ${node.directives[n].exp}, ${hashName});`);

      }
    }
  }

  return c.text;
}
*/

const treatElement = function(cp, node, hashName) {
  if (node.tag) {
    if (node.model) {
      bbn.fn.iterate(node.model, m => {
        x(`_sIr('${m.hash}', ${m.exp}, ${hashName});`);
        x(`if (!$_go['${node.id}'] && (_gIs('${m.hash}', ${hashName}) !== "OK")) {`);
        x(`  $_go['${node.id}'] = true;`);
        x(`}`);
      });

      x(``);
      x(``);
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(`_sIr('${node.directives[n].hash}', ${node.directives[n].exp}, ${hashName});`);
          x(`if (!$_go['${node.id}'] && (_gIs('${node.directives[n].hash}', ${hashName}) !== "OK")) {`);
          x(`  $_go['${node.id}'] = true;`);
          x(`}`);
        }
      }
    }

    // Start if ($_go)
    x(`if ($_go['${node.id}'] && !_forgotten['${node.id}']?.[${hashName} || '_root']) {`);
    x.msp();
    x(`//  bbn.fn.log("IN TODO " + _t.$options.name);`);
    x(`//  bbn.fn.log("DOING ${node.id} ${node.tag}");`);
    x(`_tmp = bbn.fn.clone(_node);`);
    x(`if (${hashName}) {`);
    x(`  _tmp.loopHash = ${hashName};`);
    x(`}`);
    x(`_tmp.props = _props;`);

    if (node.tag === 'component') {
      x(`if (bbn.fn.isObject(_props.is)) {`);
      x(`  _tmp.tag = _props.name ? bbn.fn.camelToCss(_props.name) : 'bbn-anon';`);
      x(`  _tmp.cfg = bbn.cp.normalizeComponent(_props.is);`);
      x(`}`);
      x(`else {`);
      x(`  _tmp.tag = bbn.fn.camelToCss(_props.is);`);
      x(`}`);
    }

    x(`isAnew = false;`);
    x(`if ((_eles['${node.id}'] !== _t.$el) && !_forgotten['${node.id}']?.[${hashName} || '_root'] && (`);
    x(`    !_eles['${node.id}']`);
    x(`    || bbn.fn.isComment(_eles['${node.id}'])`);
    x(`    || !bbn.cp.isTag(_tmp.tag, _eles['${node.id}'])`);
    x(`  )`);
    x(`) {`);
    x(`  isAnew = true;`);
    x(`}`);
    x(`if (isAnew) {`);
    if (node.model) {
      for (let n in node.model) {
        x(`  _tmp.model['${n}'].value = _tmp.props['${n}'] = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
      }
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(`_tmp.directives['${n}'].value = _gIv('${node.directives[n].hash}', ${hashName});`);
        }
      }
    }
    x(`  _eles['${node.id}'] = await _t.$createElement(_tmp, _parents.at(-1));`);
    x(`  if (_parents.at(-1) === _t.$el) {`);
    x(`    $_final.push({ele: _eles['${node.id}'], position: $_num});`);
    x(`  }`);
    x(`  else if (!_eles['${node.id}'].parentNode) {`);
    x(`    if (_num[_parents.at(-1).bbnId] < _parents.at(-1).childNodes.length) {`);
    x(`      _t.$insertElement(_eles['${node.id}'], _parents.at(-1), _parents.at(-1).childNodes[_num[_parents.at(-1).bbnId]]);`);
    x(`    }`);
    x(`    else {`);
    x(`      _t.$insertElement(_eles['${node.id}'], _parents.at(-1));`);
    x(`    }`);
    x(`  }`);
    x(`}`);
    x(`else {`);


    if (node.model) {
      x(`  _tmp.model = _eles['${node.id}'].bbnSchema.model;`);
      for (let n in node.model) {
        if (n === '_default_') {
          x(`  if (_t.$isComponent(_eles['${node.id}'])) {`)
          x(`    let modelProp = _eles['${node.id}'].bbnCfg?.model?.prop || _eles['${node.id}'].constructor?.bbnCfg?.model?.prop || 'value';`);
          x(`    _tmp.model[modelProp].value = _tmp.props[modelProp] = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
          x(`  }`);
          x(`  else {`);
          x(`    _tmp.model.value.value = _tmp.props.value = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
          x(`  }`);
        }
        else {
          x(`  _tmp.model['${n}'].value = _tmp.props['${n}'] = _sIr(_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
        }
      }
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(`if (_gIs('${node.directives[n].hash}', ${hashName}) !== "OK") {`);
          x(`  _node.directives['${n}'].value = _gIv('${node.directives[n].hash}', ${hashName});`);
          x(`  _eles['${node.id}'].bbnSchema.directives['${n}'].value = _gIv('${node.directives[n].hash}', ${hashName});`);
          x(`  bbn.cp.updateDirectives({"${n}": _node.directives['${n}']}, _eles['${node.id}']);`);
          x(`}`);
        }
      }
    }
    x(`  _t.$updateElementFromProps(_tmp, _eles['${node.id}']);`);
    x(`}`);
    x(`if (_parents.at(-1) === _t.$el) {`);
    x(`  $_num++;`);
    x(`}`);
    x(`if (!_num[_parents.at(-1).bbnId]) {`);
    x(`  _num[_parents.at(-1).bbnId] = 0;`);
    x(`}`);
    x(`_num[_parents.at(-1).bbnId]++;`);
    let hasEvents = Object.keys(node.events || {}).length > 0;

    if (node.model || hasEvents) {
      x(`if (isAnew) {`);
      x.msp();
      x(`let _bbnCurrentElement = _eles['${node.id}'];`);
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
          x(`let _bbnEventName = '${eventName}';`);
          x(`let _bbnRealName = '${name}';`);
          if (name === '_default_') {
            x(`let _bbnModelCfg = _t.$isComponent(_eles['${node.id}']) ? _eles['${node.id}'].bbnCfg?.model || _eles['${node.id}'].constructor?.bbnCfg?.model : {prop: 'value', event: _bbnEventName};`);
            x(`_bbnRealName = _bbnModelCfg.prop;`);
            x(`_bbnEventName = _bbnModelCfg.event;`);
            x(`_bbnCurrentElement.bbnSchema.model[_bbnRealName] = _bbnCurrentElement.bbnSchema.model._default_;`);
            x(`delete _bbnCurrentElement.bbnSchema.model._default_;`);
            if (node.tag === 'bbn-checkbox') {
              x(`bbn.fn.warning(_bbnRealName)`);
            }
          }
          x(`_bbnCurrentElement.addEventListener(_bbnEventName, _bbnEventObject => {`);
          x(`  let $event = _bbnEventObject;`);
          x(`  let _bbnEventValue = $event.detail?.args ? $event.detail.args[0] : $event.target?.value;`);
          x(`  let oldValue = bbn.fn.isPrimitive(${modelVarName}) ? _sIr("${m.hash}", ${modelVarName}, ${hashName}) : ${modelVarName};`);
          //x(`  bbn.fn.log(["ON MODEL CHANGE", _bbnEventName, oldValue, "${modelVarRoot}", _bbnEventValue, _t.$options.name]);`);
          x(`  if (oldValue !== _bbnEventValue) {`);
          if (modelVarRoot === modelVarName) {
            x(`    if (Object.hasOwn(_t.$props, "${modelVarRoot}")) {`);
            x(`      bbn.fn.log("IS A PROP " + _bbnRealName, _t.$options.name, "${modelVarRoot}", _bbnEventValue);`);
            x(`      _t.$setProp("${modelVarRoot}", _bbnEventValue);`);
            x(`    }`);
            x(`    else {`);
            x(`      _t["${modelVarRoot}"] = _bbnEventValue;`);
            x(`    }`);
            x(`    ${modelVarRoot} = _bbnEventValue;`);
            x(`    bbn.fn.log("FROM MODEL " + _bbnRealName, _t.$options.name, _t.$cfg.props, _bbnEventValue, ${modelVarRoot}, "${modelVarRoot}", Object.hasOwn(_t.$cfg.props, "${modelVarRoot}"));`);
          }
          else {
            x(`    ${modelVarName} = _bbnEventValue;`);
          }
          x(`    if (_bbnCurrentElement?.bbn) {`);
          x(`      _bbnCurrentElement?.bbn.$forceUpdate();`);
          x(`    }`);
          x(`    _t.$forceUpdate();`);
          x(`  }`);
          x(`});`);
        }
      }

      if (hasEvents) {
        for (let n in node.events) {
          let ev = node.events[n];
          //x(`bbn.fn.log("SETTING EVENT ${n} ON " + _t.$options.name, _ele, ${isAnew});`);
          x(`_eles['${node.id}'].addEventListener("${n}", _bbnEventObject => {`);
          //x(`  bbn.fn.log("EXECUTING EVENT ${n} ${ev.action} ON ${node.tag}", _bbnEventObject.detail);`);
          x(`  let $event = _bbnEventObject;`);
          if (ev.modifiers.length) {
            x(`bbn.fn.log($event, "${n}");`);
            if (n.indexOf('key') === 0) {
              x(`  if (!_bbnEventObject.key || !${JSON.stringify(ev.modifiers)}.includes(_bbnEventObject.key.toLowerCase())) {`);
              x(`    return;`);
              x(`  }`);
            }
            else if (n.indexOf('mouse') === 0) {
              if (ev.modifiers.includes('right')) {
                x(`  if (_bbnEventObject.button !== 2) {`);
                x(`    return;`);
                x(`  }`);
              }
              else if (ev.modifiers.includes('left')) {
                x(`  if (_bbnEventObject.button !== 0) {`);
                x(`    return;`);
                x(`  }`);
              }
            }
          }

          if (ev.prevent) {
            x(`  $event.preventDefault();`);
          }

          if (ev.stop) {
            x(`  $event.stopImmediatePropagation();`);
          }

          if (ev.action) {
            if ((ev.action.indexOf(';') > -1) || (ev.action.indexOf('if') === 0)){
              x(`  ${ev.action};`);
            }
            else {
              x(`  let $_action = (${ev.action});`);
              x(`  if (bbn.fn.isFunction($_action)) {`);
              x(`    const args = _bbnEventObject.detail?.args || [$event];`);
              x(`    args.push(_bbnEventObject);`);
              x(`    $_action.bind(_t.$origin)(...args);`);
              x(`  }`);
            }
            x(`  bbn.fn.iterate(_bbnCurrentData, (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {`);
            x(`    //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');`);
            x(`    if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {`);
            x(`      if (_t[_bbnCurrentDataIndex] !== undefined) {`);
            x(`        _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);`);
            x(`      }`);
            x(`      _bbnCurrentData[_bbnCurrentDataIndex] = _t[_bbnCurrentDataIndex];`);
            x(`    }`);
            x(`  });`);
          }

          x(`  _t.$tick();`);
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
          x(eventEnd);
        }
      }

      x.lsp();
      x(`}`);
      x(``);
      x(``);
    }

    x.lsp();
    // End if ($_go)
    x(`}`);
  }
};

const treatSlot = function(cp, node, hashName) {
  if (node.tag === 'slot') {
    let slot = "'default'";
    if (node.attr?.name) {
      slot = node.attr.name.exp ? `${node.attr.name.exp}` : `'${node.attr.name.value}'`;
    }
    x(`_eles['${node.id}'] = _parents.at(-1);`);
    x(`if (_t.$el.bbnSlots?.[${slot}]?.length) {`);
    // Iterating the elements going in the slot
    x(`  bbn.fn.each(_t.$el.bbnSlots[${slot}], a => {`);
    //x(`    bbn.fn.log("This is a slot element", a)`);
    x(`    let search = {bbnId: a.bbnId};`);
    x(`    if (a.bbnHash) {`);
    x(`      search.bbnHash = a.bbnHash;`);
    x(`    }`);
    // Case where the slot is inside another component
    x(`    if ((_parents.at(-1) !== _t.$el) && bbn.cp.isComponent(_parents.at(-1))) {`);
    x(`      let idx = bbn.fn.search(_parents.at(-1).bbnSlots[${slot}], search);`);
    x(`      _parents.at(-1).bbnSlots.default.splice(idx > -1 ? idx : _parents.at(-1).bbnSlots.default.length, idx > -1 ? 1 : 0, a);`);
    x(`      if (_parents.at(-1).bbn) {`);
    x(`        _parents.at(-1).bbn.$tick();`);
    x(`      }`);
    x(`    }`);
    // Else if only the element is not mounted (otherwise it's already there)
    x(`    else if (!a.parentNode) {`);
    x(`      if (_parents.at(-1) === _t.$el) {`);
    x(`        $_final.push({ele: a, position: $_num});`);
    x(`      }`);
    x(`      else {`);
    x(`        let idx = bbn.fn.search(_parents.at(-1).childNodes, search);`);
    x(`        if (idx > -1) {`);
    x(`          _parents.at(-1).replaceChild(a, _parents.at(-1).childNodes[idx]);`);
    x(`        }`);
    x(`        else {`);
    x(`          _parents.at(-1).appendChild(a);`);
    x(`        }`);
    x(`      }`);
    x(`    }`);
    x(`    if (_parents.at(-1) === _t.$el) {`);
    x(`      $_num++;`);
    x(`    }`);
    x(`    if (!_num[_parents.at(-1).bbnId]) {`);
    x(`      _num[_parents.at(-1).bbnId] = 0;`);
    x(`    }`);
    x(`    _num[_parents.at(-1).bbnId]++;`);
    x(`  });`);
    x(`}`);
    treatItems(cp, node, hashName);
  }

};

const treatText = function(node, hashName) {
  if (node.text) {
    x(`_sIr('${node.hash}', \`${bbn.fn.escapeTicks(node.text)}\`, ${hashName});`);
    x(`if ($_go['${node.id}'] || (_gIs('${node.hash}', ${hashName}) !== "OK")) {`);
    x(`  if (_eles['${node.id}'] && (_eles['${node.id}'].textContent !== _gIv('${node.hash}', ${hashName}))) {`);
    x(`    _eles['${node.id}'].textContent = _gIv('${node.hash}', ${hashName});`);
    x(`  }`);
    x(`  else {`);
    x(`    _eles['${node.id}'] = _t.$createText({`);
    x(`      id: '${node.id}',`);
    x(`      hash: '${node.hash}',`);
    x(`      text: _gIv('${node.hash}', ${hashName}),`);
    x(`      loopHash: ${hashName},`);
    x(`    }, _parents.at(-1));`);
    x(`    if (_parents.at(-1) === _t.$el) {`);
    x(`      $_final.push({ele: _eles['${node.id}'], position: $_num});`);
    x(`    }`);
    x(`  }`);
    x(`}`);
    x(`if (_parents.at(-1) === _t.$el) {`);
    x(`  $_num++;`);
    x(`}`);
    x(`if (!_num[_parents.at(-1).bbnId]) {`);
    x(`  _num[_parents.at(-1).bbnId] = 0;`);
    x(`}`);
    x(`_num[_parents.at(-1).bbnId]++;`);
    x(``);
    x(``);
  }
};

const treatItems = function(cp, node, hashName) {
  if (node.items?.length) {
    x(`if (_eles['${node.id}']) {`);
    x.msp();
    x(`_parents.push(_eles['${node.id}']);`);
    nodesToFunction(cp, node.items, hashName);
    x(`_parents.pop();`);
    x.lsp();
    x(`}`);

    x(``);
    x(``);
  }
};

const treatRoot = function(cp, tpl, hashName) {
  if ((tpl.length === 1)
      && tpl[0].items
      && !tpl[0].attr?.['bbn-if']
      && !tpl[0].attr?.['bbn-for']
      && !tpl[0].attr?.['bbn-model']
      && !tpl[0].attr?.['bbn-forget']
      && !bbn.cp.isComponent(tpl[0])
      && (['div', 'span'].includes(tpl[0].tag) || (tpl[0].tag === cp.$cfg.tag))
  ) {
    //x(`_eles['0-0'] = _t.$el;`);
    if (tpl[0].attr) {
      for (let n in tpl[0].attr) {
        x(`_props["${n}"] = `);
        if (tpl[0].attr[n].exp) {
          x(`_sIr("${tpl[0].attr[n].hash}", ${tpl[0].attr[n].exp}, ${hashName});`);
        }
        else {
          x(`"${bbn.fn.escapeDquotes(tpl[0].attr[n].value)}";`);
        }
      }
      if (bbn.fn.numProperties(tpl[0].directives)) {

        for (let n in tpl[0].directives) {
          x(`if (!_t.$el.bbnSchema.directives) {_t.$el.bbnSchema.directives = bbn.fn.createObject();}`);
          x(`if (!_t.$el.bbnSchema.directives['${n}']) {_t.$el.bbnSchema.directives['${n}'] = bbn.fn.clone(_t.$tpl[0].directives['${n}']);}`);
          if (tpl[0].directives[n].exp) {
            x(`  _t.$el.bbnSchema.directives['${n}'].value = _sIr('${tpl[0].directives[n].hash}', ${tpl[0].directives[n].exp}, ${hashName});`);
          }
          x(`if (!_t.$el.bbnDirectives) {Object.defineProperty(_t.$el, 'bbnDirectives', {value: bbn.fn.createObject(), writable: false, configurable: false});}`);
          x(`if (!_t.$el.bbnDirectives['{$n}']) {_t.$el.bbnDirectives['${n}'] = bbn.fn.createObject();}`);
        }

        x(`if (!_t.$numBuild) {`);
        x(`  bbn.cp.insertDirectives(_t.$el.bbnSchema.directives, _t.$el);`);
        x(`}`);
        for (let n in tpl[0].directives) {
          x(`if (_t.$numBuild) {`);
          x(`  bbn.cp.updateDirectives({"${n}": _t.$el.bbnSchema.directives['${n}']}, _t.$el);`);
          x(`}`);
  
        }
      }
      x(`_t.$updateFromSchema(_props);`);
      if (tpl[0].events) {
        x(`if (_r._num === 1) {`);
        x.msp();
        for (let n in tpl[0].events) {
          let ev = tpl[0].events[n];

          x(`if (!_eles['-'].bbnSchema?.events?.["${n}"]) {`);
          x.msp();
          //x(`bbn.fn.log("SETTING EVENT ${n} ON " + _t.$options.name, _ele, ${isAnew});`);
          x(`_eles['-'].addEventListener("${n}", _bbnEventObject => {`);
          //x(`  bbn.fn.log("EXECUTING EVENT ${n} ${ev.action} ON ${node.tag}", _bbnEventObject.detail);`);
          if (ev.modifiers.length) {
            x(`  if (!_bbnEventObject.key || !${JSON.stringify(ev.modifiers)}.includes(_bbnEventObject.key.toLowerCase())) {`);
            x(`    return;`);
            x(`  }`);
          }

          x(`  let $event = _bbnEventObject;`);

          if (ev.prevent) {
            x(`  $event.preventDefault();`);
          }

          if (ev.stop) {
            x(`  $event.stopImmediatePropagation();`);
          }

          if (ev.action) {
            if ((ev.action.indexOf(';') > -1) || (ev.action.indexOf('if') === 0)){
              x(`  ${ev.action};`);
            }
            else {
              x(`  let $_action = (${ev.action});`);
              x(`  if (bbn.fn.isFunction($_action)) {`);
              x(`    const args = _bbnEventObject.detail?.args || [$event];`);
              x(`    args.push(_bbnEventObject);`);
              x(`    $_action.bind(_t.$origin)(...args);`);
              x(`  }`);
            }

            x(`  bbn.fn.iterate(_bbnCurrentData, (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {`);
            x(`    //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');`);
            x(`    if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {`);
            x(`      if (_t[_bbnCurrentDataIndex] !== undefined) {`);
            x(`        _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);`);
            x(`      }`);
            x(`      _bbnCurrentData[_bbnCurrentDataIndex] = _t[_bbnCurrentDataIndex];`);
            x(`    }`);
            x(`  });`);
          }

          x(`  _t.$forceUpdate();`);
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
          x(eventEnd);
          x.lsp();
          x('}');
        }
        x.lsp();
        x(`}`);
      }
    }
    else {
      x(`_t.$updateFromSchema();`);
    }

    return tpl[0].items;
  }
  x(`_t.$updateFromSchema();`);
  nodesToFunction(cp, tpl, hashName);
  return tpl;
};


const endCondition = function(node) {
  if (node.condition) {
    x.lsp();
    x(`//Ending condition`);
    x(`}`);
    x(``);
    x(``);
  }
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
  let conditions = [];
  let conditionId = null;
  bbn.fn.each(arr, (node, i) => {
    x('');
    x(`// Taking care of the node ${node.tag || 'with no tag'} ${node.id}`);
    if (node.loop?.exp) {
      treatLoop(cp, node, hashName);
      return;
    }

    // Launching condition (MUST be before the rest)
    if (node.condition) {
      if ((node.conditionId !== conditionId) && !conditions.includes(node.conditionId)) {
        conditions.push(node.conditionId);
        conditionId = node.conditionId;
        treatCondition(cp, node, arr, hashName);
      }

      let condText = (node.condition.type === 'elseif' ? 'else if' : node.condition.type);
      if (node.condition.type !== 'else') {
        condText += ' (_gIv("' + node.condition.hash + '", ' + hashName + '))';
      }
      // New level
      condText += ' {';
      x(condText);
      x.msp();
    }
    
    x(`oldEle = _t.$retrieveElement("${node.id}", ${hashName});`);
    x(`_node = _t.$currentMap['${node.id}'];`);
    x(`_eles['${node.id}'] = oldEle;`);
    x(`if (!Object.hasOwn($_go, '${node.id}')) {`);
    x(`  $_go['${node.id}'] = !oldEle;`);
    x(`}`);

    // Setting _forgotten variable
    if (node.forget?.exp) {
      x(`_sIr('${node.forget.hash}', ${node.forget.exp}, ${hashName});`);
      x(`if (!_forgotten['${node.id}']) {`);
      x(`  _forgotten['${node.id}'] = bbn.fn.createObject();`);
      x(`}`);
      x(`_forgotten['${node.id}'][${hashName} || '_root'] = _gIv('${node.forget.hash}', ${hashName});`);
      x(`if (_forgotten['${node.id}'][${hashName} || '_root']) {`);
      x(`  _eles['${node.id}'] = _parents.at(-1);`);
      x(`  $_go['${node.id}'] = false;`);
      x(`}`);
      x(`else if (['NEW', 'MOD'].includes(_gIs('${node.forget.hash}', ${hashName}))) {`);
      x(`  $_go['${node.id}'] = true;`);
      x(`}`);

      x(``);
      x(``);
    }

    let treatEle = true;
    if ((!node.pre && (node.tag === 'template'))
        || ('transition' === node.tag)
    ) {
      x(`_eles['${node.id}'] = _parents.at(-1);`);
      x(`$_go['${node.id}'] = false;`);
      treatEle = false;
    }
    else {
      x(`if (!$_go['${node.id}'] && !_eles['${node.id}']) {`);
      x(`  $_go['${node.id}'] = true;`);
      x(`}`);
    }
    //x(`bbn.fn.log(["nodesToFunction", "${node.tag || 'no'}", $_go['${node.id}']]);`);

    if (node.text) {
      treatText(node, hashName);
    }
    else if (node.tag === 'slot') {
      treatSlot(cp, node, hashName);
    }
    else if (node.tag) {

      setProperties(node, hashName);
      //c.text += setDirectives(node, hashName);
      if (treatEle) {
        treatElement(cp, node, hashName);
      }
        
      if (node.forget?.exp) {
        x(`if (_gIs('${node.forget.hash}', ${hashName}) === 'MOD') {`);
        x(`  if (_forgotten['${node.id}']?.[${hashName} || '_root']) {`);
        x(`    if (oldEle) {`);
        x(`      oldEle.childNodes.forEach(o => {`);
        x(`        _parents.at(-1).appendChild(o);`);
        x(`      });`);
        x(`      bbn.fn.log("From here");`);
        x(`      _t.$removeDOM(oldEle);`);
        x(`    }`);
        x(`    // Ele is the current parent`);
        x(`    _eles['${node.id}'] = _parents.at(-1);`);
        x(`  }`);
        x(`  else {`);
        x(`    _parents.at(-1).childNodes.forEach(o => {`);
        x(`      if (o.bbnId.indexOf('${node.id}' + "-") === 0) {`);
        x(`        _eles['${node.id}'].appendChild(o);`);
        x(`      }`);
        x(`    });`);
        x(`  }`);
        x(`}`);
        x(`else if (_forgotten['${node.id}']?.[${hashName} || '_root']) {`);
        x(`  _eles['${node.id}'] = _parents.at(-1);`);
        x(`}`);
        

        x(``);
        x(``);
      }


      if (node.pre) {
        x(`if (_eles['${node.id}']) {`);
        x(`  _eles['${node.id}'].innerHTML = \`${bbn.fn.escapeTicks(node.pre)}\`;`);
        x(`}`);

        x(``);
        x(``);
      }
      else {
        treatItems(cp, node, hashName);
      }
      x(`if (_eles['${node.id}'] && (_eles['${node.id}'] !== _t.$el)) {`);
      x(`  if (_t.$el === _parents.at(-1)) {`);
      x(`    $_num++;`);
      x(`  }`);
      x(`  if (!_num[_parents.at(-1).bbnId]) {`);
      x(`    _num[_parents.at(-1).bbnId] = 0;`);
      x(`  }`);
      x(`  _num[_parents.at(-1).bbnId]++;`);
      x(`}`);
    }

    endCondition(node);

  });
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
export default function templateToFunction(cp, tpl, sp = 0) {
  let hashName = '_bbnHash';
  x.msp();
  x(`const _r = _t.$currentResult;`);
  x(`let ${hashName} = '';`);
  x(`bbn.fn.iterate(_r, a => {`);
  x(`  bbn.fn.iterate(a, b => {`);
  x(`    if (b.state !== 'DEL') {`);
  x(`      b.state = 'TMP';`);
  x(`    }`);
  x(`  });`);
  x(`});`);
  x(`const _bbnCurrentData = bbn.fn.createObject();`);
  let argNames = [];
  let argValues = [];
  for (let n in cp.$namespaces) {
    argNames.push(n);
    argValues.push(cp.$namespaces[n] === 'method' ? `_t['${n}'].bind(_t)` : `_t['${n}']`);
    if ((n.indexOf('$') !== 0) && !['method', 'props'].includes(cp.$namespaces[n]) && (n !== 'internal')) {
      x(`_bbnCurrentData["${n}"] = _t.${n};`);
    }
  }

  x(`await (async function (${argNames.join(', ')}) {`);
  x.msp();

  //x(`let ownProps = Object.getOwnPropertyNames(_t);`);
  //x(`let n;`);
  //x(`for (let i = 0; n = ownProps[i]; i++) {`);
  //x(`  if ((n.indexOf('$') !== 0) && !_t.$namespaces[n]) {`);
  //x(`    bbn.fn.warning('var ' + n + ' = _t["' + n + '"];');`);
  //x(`    eval('var ' + n + ' = _t["' + n + '"];');`);
  //x(`  }`);
  //x(`}`);
  
  x(`// _setInternalResult`);
  x(`const _sIr = (_name, _exp, _hash) => {`);
  x(`  return _t.$_setInternalResult(_r, _name, _exp, _hash);`);
  x(`};`);
  x(`// _getInternalState`);
  x(`const _gIs = (_name, _hash) => {`);
  x(`  return _t.$_getInternalState(_r, _name, _hash);`);
  x(`};`);
  x(`// _getInternalValue`);
  x(`const _gIv = (_name, _hash) => {`);
  x(`  let val = undefined;`);
  x(`  try {`);
  x(`    val = _t.$_getInternalValue(_r, _name, _hash);`);
  x(`  } catch (e) {`);
  x(`    bbn.fn.log("THERE SHOULD BE AN ERROR", _name, _t);`);
  x(`  }`);
  x(`  return val;`);
  x(`};`);
  x(`const _eles = bbn.fn.createObject({"-": _t.$el});`);
  x(`let _isCondTrue = false;`);
  x(`let _props = bbn.fn.createObject();`);
  x(`let _lastId = '';`);
  x(`let _tmp;`);
  x(`let _tmp2;`);
  x(`let _num = {};`);
  x(`let _node;`);
  x(`let isAnew;`);
  x(`let oldEle;`);
  x(`const _cps = [];`);
  x(`const _parents = [_t.$el];`);
  x(`let $_ct = _t.$el;`);
  x(`const _forgotten = bbn.fn.createObject();`);
  x(`const $_go = bbn.fn.createObject();`);
  x(`let $_num = 0;`);
  x(`const $_final = [];`);
  x(`_r._num++;`);


  const template = treatRoot(cp, tpl, hashName);

  nodesToFunction(cp, template, hashName);
  //x(`bbn.fn.warning("KKKKK"); bbn.fn.log($_final);`);
  x(`bbn.fn.each($_final, a => {`);
  x(`  if (_t.$el.childNodes[a.position]) {`);
  x(`    _t.$insertElement(a.ele, _t.$el, _t.$el.childNodes[a.position]);`);
  x(`  }`);
  x(`  else {`);
  x(`    _t.$insertElement(a.ele, _t.$el);`);
  x(`  }`);
  x(`})`);
  x.lsp();
  x(`})(${argValues.join(', ')});`);
  x(`bbn.fn.iterate(_r, a => {`);
  x(`  bbn.fn.iterate(a, b => {`);
  x(`    if (b.state === 'TMP') {`);
  x(`      b.state = 'DEL';`);
  x(`    }`);
  x(`  });`);
  x(`});`);
  x(`return _r;`);
  x.lsp();

  const AsyncFunction = async function () {}.constructor;
  return new AsyncFunction('_t', '_d', x.get(true));
}
