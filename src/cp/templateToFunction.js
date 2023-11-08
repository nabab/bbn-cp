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
    x(`_isCondTrue = $_sr("${cond.condition.hash}", ${cond.condition.type === 'else' ? 'true' : cond.condition.exp}, ${hashName});`);
    if (j) {
      x.lsp();
      x(`}`);
      x(`else {`);
      x(`  $_sr("${cond.condition.hash}", false, ${hashName});`);
      x(`}`);
    }
    x(`if ($_gs("${cond.condition.hash}", ${hashName}) !== "OK") {`)
    x(`  $_go['${cond.id}'] = true;`);
    x(`  let $_tmp1 = $_gv("${cond.condition.hash}", ${hashName});`);
    x(`  let _e;`);
    x(`  if (!$_tmp1) {`);
    if (['template', 'transition', 'slot'].includes(cond.tag)) {
      if (cond.items) {
        bbn.fn.each(cond.items, it => {
          x(`    _e = $_this.$retrieveElement("${it.id}", ${hashName});`);
          x(`    if (_e && !bbn.fn.isComment(_e)) {`);
          x(`      $_this.$removeDOM(_e);`);
          x(`    }`);
        });
      }
    }
    else {
      x(`    _e = $_this.$retrieveElement("${cond.id}", ${hashName});`);
      x(`    if (_e && !bbn.fn.isComment(_e)) {`);
      //x(`      bbn.fn.log("REMOVING ${cond.id} from node2fn")`);
      x(`      let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;`);
      //x(`      bbn.fn.log("this is my moment", _e.tagName, $_this.$options.name);`);
      x(`      $_this.$removeDOM(_e);`);
      x(`      _e = false;`);
      x(`    }`);
      x(`    if (!_e) {`);
      x(`      $_items['${cond.id}'] = await $_this.$createElement({`);
      x(`        id: "${cond.id}",`);
      x(`        hash: "${cond.condition.hash}",`);
      x(`        loopHash: ${hashName},`);
      x(`        conditionId: "${cond.conditionId}",`);
      x(`        comment: true`);
      x(`      }, $_par.at(-1), $_num[$_par.at(-1).bbnId], $_this.$currentMap['${node.id}'].loop);`);
      x(`    }`);
    }

    x(`  }`);
    x(`}`);
  });
};
/**
 * Generates the code recursively for a loop
 * @param {bbnCp} node 
 * @param {Object} node 
 * @param {String} hashName   
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

  x(`let ${varName} = $_sr('${node.loop.hash}', ${node.loop.exp}, ${hashName});`);
  x(`let ${isNumber} = bbn.fn.isNumber(${varName});`);
  x(`let ${parentName} = $_par.at(-1);`);
  x(`let ${listName} = [];`);
  x(`let ${isArray} = bbn.fn.isArray(${varName});`);
  x(`if (${isNumber}) {`);
  x(`  ${varName} = Object.keys((new Array(${varName})).fill(0)).map(a=>parseInt(a));`);
  //x(`  //bbn.fn.log("LOOP VALUE", ${varName});`);
  x(`}`);
  x(`$_old = false;`);
  x(`for (let ${indexName} in ${varName}) {`);
  x(`  if (${isArray}) {`);
  x(`    ${indexName} = parseInt(${indexName});`);
  x(`  }`);
  x(`  let ${node.loop.item} = ${isNumber} ? ${indexName} : ${varName}[${indexName}];`);
  x(`  const ${hash} = (${hashName} || '') + '${node.loop.hash}-${indexName}-' + (${node.attr?.key?.exp ? node.attr.key.exp : indexName});`);
  x(`  ${listName}.push(${hash});`);
  x(`  $_sr('${node.loop.item}', ${node.loop.item}, ${hash});`);
  //x(`  bbn.fn.log(${node.loop.item});`);

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
  // If the loop is on a template the ID won't be the same with the loop but will start by it
  x(`  if ((!a.bbnHash || (a.bbnHash.indexOf(${hashName}) === 0)) && (a.bbnId.indexOf("${node.id}") === 0) && (!a.bbnLoopVars || ('${bbn.fn.escapeSquotes(node.loop.exp)}' === a.bbnLoopVars.exp)) && !${listName}.includes(a.bbnHash)) {`);
  x(`    $_this.$removeDOM(a);bbn.fn.log("REMOVING NODE", a)`);
  x(`  }`);
  x(`});`);
  };

const setProperties = function(node, hashName) {
    x(`$_props = bbn.fn.createObject();`);
  // Will GO if the element is new or modified and not forgotten
  if (bbn.fn.numProperties(node.attr)) {
    if (node.attr['bbn-bind']) {
      x(`$_tmp1 = $_sr('${node.attr['bbn-bind'].hash}', ${node.attr['bbn-bind'].exp}, ${hashName}) || bbn.fn.createObject();`);
      x(`if (!$_go['${node.id}'] && ($_gs('${node.attr['bbn-bind'].hash}', ${hashName}) !== "OK")) {`);
      x(`  $_go['${node.id}'] = true;`);
      x(`}`);
      x(`$_tmp2 = bbn.fn.createObject();`);
      for (let n in node.attr) {
        if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
          continue;
        }
        
        if (node.attr[n].exp) {
          x(`$_tmp2['${n}'] = $_sr('${node.attr[n].hash}', ${node.attr[n].exp}, ${hashName});`);
        }
        else {
          x(`$_tmp2['${n}'] = '${bbn.fn.escapeSquotes(node.attr[n].value)}';`);
        }
      }
      x(`bbn.fn.each(bbn.fn.unique(Object.keys($_tmp1).concat(Object.keys($_tmp2))), n => {`);
      x(`  let val = $_tmp2[n] === undefined ? $_tmp1?.[n] : $_tmp2[n];`);
      x(`  if (val === undefined) {`);
      x(`    return;`);
      x(`  }`);
      x(`  if (n === 'class') {`);
      x(`    $_props[n] = bbn.cp.convertClasses(val);`);
      x(`  }`);
      x(`  else if (n === 'style') {`);
      x(`    $_props[n] = bbn.cp.convertStyles(val);`);
      x(`  }`);
      x(`  else {`);
      x(`    $_props[n] = val;`);
      x(`  }`);
      x(`  if (!$_go['${node.id}'] && $_node.attr[n] && !Object.hasOwn($_node.attr[n], 'value') && $_node.attr[n].hash && ($_gs($_node.attr[n].hash, ${hashName}) !== "OK")) {`);
      x(`    $_go['${node.id}'] = true;`);
      x(`  }`);
      x(`});`);
      //x(`bbn.fn.log(["PROPS", $_props, $_tmp1, $_tmp2, bbn.fn.unique(Object.keys($_tmp1).concat(Object.keys($_tmp2)))]);`);
    }
    // Simpler version
    else {
      for (let n in node.attr) {
        if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
          continue;
        }
        
        if (node.attr[n].exp) {
          x(`$_tmp1 = $_sr('${node.attr[n].hash}', ${node.attr[n].exp}, ${hashName});`);
          x(`if ($_tmp1 !== undefined) {`);
          if (n === 'class') {
            x(`  $_props['${n}'] = bbn.cp.convertClasses($_tmp1);`);
          }
          else if (n === 'style') {
            x(`  $_props['${n}'] = bbn.cp.convertStyles($_tmp1);`);
          }
          else {
            x(`  $_props['${n}'] = $_tmp1;`);
          }
          x(`}`);
          x(`if (!$_go['${node.id}'] && $_node.attr['${n}'] && !Object.hasOwn($_node.attr['${n}'], 'value') && $_node.attr['${n}'].hash && ($_gs($_node.attr['${n}'].hash, ${hashName}) !== "OK")) {`);
          x(`  $_go['${node.id}'] = true;`);
          x(`}`);
        }
        else {
          x(`$_props['${n}'] = '${bbn.fn.escapeSquotes(node.attr[n].value)}';`);
        }
      }

    }

    x(``);
    x(``);
  }
};

const treatElement = function(cp, node, hashName) {
    if (node.tag) {
    if (node.model) {
      bbn.fn.iterate(node.model, m => {
        x(`$_sr('${m.hash}', ${m.exp}, ${hashName});`);
        x(`if (!$_go['${node.id}'] && ($_gs('${m.hash}', ${hashName}) !== "OK")) {`);
        x(`  $_go['${node.id}'] = true;`);
        x(`}`);
      });

      x(``);
      x(``);
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(`$_sr('${node.directives[n].hash}', ${node.directives[n].exp}, ${hashName});`);
          x(`if (!$_go['${node.id}'] && ($_gs('${node.directives[n].hash}', ${hashName}) !== "OK")) {`);
          x(`  $_go['${node.id}'] = true;`);
          x(`}`);
        }
      }
    }

    // Start if ($_go)
    x(`if ($_go['${node.id}'] && !$_fgtn['${node.id}']?.[${hashName} || '$_root']) {`);
    x.msp();
    //x(`  bbn.fn.log("IN TODO " + $_this.$options.name);`);
    //x(`  bbn.fn.log("DOING ${node.id} ${node.tag}");`);
    x(`$_tmp1 = bbn.fn.clone($_node);`);
    x(`if (${hashName}) {`);
    x(`  $_tmp1.loopHash = ${hashName};`);
    x(`}`);
    x(`$_tmp1.props = $_props;`);

    if (node.tag === 'component') {
      x(`if (bbn.fn.isObject($_props.is)) {`);
      x(`  $_tmp1.tag = $_props.name ? bbn.fn.camelToCss($_props.name) : 'bbn-anon';`);
      x(`  $_tmp1.cfg = bbn.cp.normalizeComponent($_props.is);`);
      x(`}`);
      x(`else {`);
      x(`  $_tmp1.tag = bbn.fn.camelToCss($_props.is);`);
      x(`}`);
    }

    x(`$_anew = false;`);
    x(`if (($_items['${node.id}'] !== $_this.$el) && !$_fgtn['${node.id}']?.[${hashName} || '$_root'] && (`);
    x(`    !$_items['${node.id}']`);
    x(`    || bbn.fn.isComment($_items['${node.id}'])`);
    x(`    || !bbn.cp.isTag($_tmp1.tag, $_items['${node.id}'])`);
    x(`  )`);
    x(`) {`);
    x(`  $_anew = true;`);
    x(`}`);
    x(`if ($_anew) {`);
    if (node.model) {
      for (let n in node.model) {
        x(`  $_tmp1.model['${n}'].value = $_tmp1.props['${n}'] = $_sr($_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
      }
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(`$_tmp1.directives['${n}'].value = $_gv('${node.directives[n].hash}', ${hashName});`);
        }
      }
    }
    x(`  $_items['${node.id}'] = await $_this.$createElement($_tmp1, $_par.at(-1), $_num[$_par.at(-1).bbnId], $_tmp1.loop);`);
    x(`  if ($_par.at(-1) === $_this.$el) {`);
    x(`    $_final.push({ele: $_items['${node.id}'], position: $_num['-'] - 1});`);
    x(`  }`);
    x(`}`);
    x(`else {`);


    if (node.model) {
      x(`  $_tmp1.model = $_items['${node.id}'].bbnSchema.model;`);
      for (let n in node.model) {
        if (n === '_default_') {
          x(`  if ($_this.$isComponent($_items['${node.id}'])) {`)
          x(`    let modelProp = $_items['${node.id}'].bbnCfg?.model?.prop || $_items['${node.id}'].constructor?.bbnCfg?.model?.prop || 'value';`);
          x(`    $_tmp1.model[modelProp].value = $_tmp1.props[modelProp] = $_sr($_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
          x(`  }`);
          x(`  else {`);
          x(`    $_tmp1.model.value.value = $_tmp1.props.value = $_sr($_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
          x(`  }`);
        }
        else {
          x(`  $_tmp1.model['${n}'].value = $_tmp1.props['${n}'] = $_sr($_node.model['${n}'].hash, ${node.model[n].exp}, ${hashName});`);
        }
      }
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          x(`if ($_gs('${node.directives[n].hash}', ${hashName}) !== "OK") {`);
          x(`  $_node.directives['${n}'].value = $_gv('${node.directives[n].hash}', ${hashName});`);
          x(`  $_items['${node.id}'].bbnSchema.directives['${n}'].value = $_gv('${node.directives[n].hash}', ${hashName});`);
          x(`  bbn.cp.updateDirectives({"${n}": $_node.directives['${n}']}, $_items['${node.id}']);`);
          x(`}`);
        }
      }
    }
    x(`  $_this.$updateElementFromProps($_tmp1, $_items['${node.id}']);`);
    x(`}`);
    x(`if ($_par.at(-1) === $_this.$el) {`);
    x(`  $_num['-']++;`);
    x(`}`);
    x(`if (!$_num[$_par.at(-1).bbnId]) {`);
    x(`  $_num[$_par.at(-1).bbnId] = 0;`);
    x(`}`);
    x(`$_num[$_par.at(-1).bbnId]++;`);
    let hasEvents = Object.keys(node.events || {}).length > 0;

    if (node.model || hasEvents) {
      x(`if ($_anew) {`);
      x.msp();
      x(`let _bbnCurrentElement = $_items['${node.id}'];`);
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
            x(`let _bbnModelCfg = $_this.$isComponent($_items['${node.id}']) ? $_items['${node.id}'].bbnCfg?.model || $_items['${node.id}'].constructor?.bbnCfg?.model : {prop: 'value', event: _bbnEventName};`);
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
          x(`  let oldValue = bbn.fn.isPrimitive(${modelVarName}) ? $_sr("${m.hash}", ${modelVarName}, ${hashName}) : ${modelVarName};`);
          //x(`  bbn.fn.log(["ON MODEL CHANGE", _bbnEventName, oldValue, "${modelVarRoot}", _bbnEventValue, $_this.$options.name]);`);
          x(`  if (oldValue !== _bbnEventValue) {`);
          if (modelVarRoot === modelVarName) {
            x(`    if (Object.hasOwn($_this.$props, "${modelVarRoot}")) {`);
            //x(`      bbn.fn.log("IS A PROP " + _bbnRealName, $_this.$options.name, "${modelVarRoot}", _bbnEventValue);`);
            x(`      $_this.$setProp("${modelVarRoot}", _bbnEventValue);`);
            x(`    }`);
            x(`    else {`);
            x(`      $_this["${modelVarRoot}"] = _bbnEventValue;`);
            x(`    }`);
            x(`    ${modelVarRoot} = _bbnEventValue;`);
            //x(`    bbn.fn.log("FROM MODEL " + _bbnRealName, $_this.$options.name, $_this.$cfg.props, _bbnEventValue, ${modelVarRoot}, "${modelVarRoot}", Object.hasOwn($_this.$cfg.props, "${modelVarRoot}"));`);
          }
          else {
            x(`    ${modelVarName} = _bbnEventValue;`);
          }
          //x(`    if (_bbnCurrentElement?.bbn) {`);
          //x(`      _bbnCurrentElement?.bbn.$forceUpdate();`);
          //x(`    }`);
          //x(`    $_this.$forceUpdate();`);
          x(`  }`);
          x(`});`);
        }
      }

      if (hasEvents) {
        for (let n in node.events) {
          let ev = node.events[n];
          //x(`bbn.fn.log("SETTING EVENT ${n} ON " + $_this.$options.name, _ele, ${$_anew});`);
          x(`$_items['${node.id}'].addEventListener("${n}", _bbnEventObject => {`);
          //x(`  bbn.fn.log("EXECUTING EVENT ${n} ${ev.action} ON ${node.tag}", _bbnEventObject.detail);`);
          x(`  let $event = _bbnEventObject;`);
          if (ev.modifiers.length) {
            //x(`bbn.fn.log($event, "${n}");`);
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
              x(`    $_action.bind($_this.$origin)(...args);`);
              x(`  }`);
            }
            x(`  bbn.fn.iterate($_data, ($_val, $_idx) => {`);
            //x(`    bbn.fn.log(['$_val, $_idx', $_val, $_idx, eval($_idx), $_this[$_idx], '++++']);`);
            x(`    if ($_val !== eval($_idx)) {`);
            x(`      if ($_this[$_idx] !== undefined) {`);
            x(`        $_this[$_idx] = eval($_idx);`);
            x(`      }`);
            x(`      $_data[$_idx] = $_this[$_idx];`);
            x(`    }`);
            x(`  });`);
          }

          //x(`  $_this.$tick();`);
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
    x(`$_items['${node.id}'] = $_par.at(-1);`);
    x(`if ($_this.$el.bbnSlots?.[${slot}]?.length) {`);
    // Iterating the elements going in the slot
    x(`  bbn.fn.each($_this.$el.bbnSlots[${slot}], a => {`);
    //x(`    bbn.fn.log("This is a slot element", a)`);
    x(`    let search = {bbnId: a.bbnId};`);
    x(`    if (a.bbnHash) {`);
    x(`      search.bbnHash = a.bbnHash;`);
    x(`    }`);
    // Case where the slot is inside another component
    x(`    if (($_par.at(-1) !== $_this.$el) && bbn.cp.isComponent($_par.at(-1))) {`);
    x(`      let idx = bbn.fn.search($_par.at(-1).bbnSlots[${slot}], search);`);
    x(`      $_par.at(-1).bbnSlots.default.splice(idx > -1 ? idx : $_par.at(-1).bbnSlots.default.length, idx > -1 ? 1 : 0, a);`);
    //x(`      if ($_par.at(-1).bbn) {`);
    //x(`        $_par.at(-1).bbn.$tick();`);
    //x(`      }`);
    x(`    }`);
    // Else if only the element is not mounted (otherwise it's already there)
    x(`    else if (!a.parentNode) {`);
    x(`      if ($_par.at(-1) === $_this.$el) {`);
    x(`        $_final.push({ele: a, position: $_num['-'] - 1});`);
    x(`      }`);
    x(`      else {`);
    x(`        let idx = bbn.fn.search($_par.at(-1).childNodes, search);`);
    x(`        if (idx > -1) {`);
    x(`          $_par.at(-1).replaceChild(a, $_par.at(-1).childNodes[idx]);`);
    x(`        }`);
    x(`        else {`);
    x(`          $_par.at(-1).appendChild(a);`);
    x(`        }`);
    x(`      }`);
    x(`    }`);
    x(`    if ($_par.at(-1) === $_this.$el) {`);
    x(`      $_num['-']++;`);
    x(`    }`);
    x(`    if (!$_num[$_par.at(-1).bbnId]) {`);
    x(`      $_num[$_par.at(-1).bbnId] = 0;`);
    x(`    }`);
    x(`    $_num[$_par.at(-1).bbnId]++;`);
    x(`  });`);
    x(`}`);
    treatItems(cp, node, hashName);
  }

  };

const treatText = function(node, hashName) {
    if (node.text) {
    x(`$_sr('${node.hash}', \`${bbn.fn.escapeTicks(node.text)}\`, ${hashName});`);
    x(`if ($_go['${node.id}'] || ($_gs('${node.hash}', ${hashName}) !== "OK")) {`);
    x(`  if ($_items['${node.id}'] && ($_items['${node.id}'].textContent !== $_gv('${node.hash}', ${hashName}))) {`);
    x(`    $_items['${node.id}'].textContent = $_gv('${node.hash}', ${hashName});`);
    x(`  }`);
    x(`  else {`);
    x(`    $_items['${node.id}'] = $_this.$createText({`);
    x(`      id: '${node.id}',`);
    x(`      hash: '${node.hash}',`);
    x(`      text: $_gv('${node.hash}', ${hashName}),`);
    x(`      loopHash: ${hashName},`);
    x(`    }, $_par.at(-1));`);
    x(`    if ($_par.at(-1) === $_this.$el) {`);
    x(`      $_final.push({ele: $_items['${node.id}'], position: $_num['-'] - 1});`);
    x(`    }`);
    x(`  }`);
    x(`}`);
    x(`if ($_par.at(-1) === $_this.$el) {`);
    x(`  $_num['-']++;`);
    x(`}`);
    x(`if (!$_num[$_par.at(-1).bbnId]) {`);
    x(`  $_num[$_par.at(-1).bbnId] = 0;`);
    x(`}`);
    x(`$_num[$_par.at(-1).bbnId]++;`);
    x(``);
    x(``);
  }
};

const treatItems = function(cp, node, hashName) {
    if (node.items?.length) {
    x(`if ($_items['${node.id}']) {`);
    x.msp();
    x(`$_par.push($_items['${node.id}']);`);
    nodesToFunction(cp, node.items, hashName);
    x(`$_par.pop();`);
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
    //x(`$_items['0-0'] = $_this.$el;`);
    if (tpl[0].attr) {
      x(`$_props = bbn.fn.createObject();`);
      for (let n in tpl[0].attr) {
        x(`$_props["${n}"] = `);
        if (tpl[0].attr[n].exp) {
          x(`$_sr("${tpl[0].attr[n].hash}", ${tpl[0].attr[n].exp}, ${hashName});`);
        }
        else {
          x(`"${bbn.fn.escapeDquotes(tpl[0].attr[n].value)}";`);
        }
      }
      if (bbn.fn.numProperties(tpl[0].directives)) {

        for (let n in tpl[0].directives) {
          x(`if (!$_this.$el.bbnSchema.directives) {$_this.$el.bbnSchema.directives = bbn.fn.createObject();}`);
          x(`if (!$_this.$el.bbnSchema.directives['${n}']) {$_this.$el.bbnSchema.directives['${n}'] = bbn.fn.clone($_this.$tpl[0].directives['${n}']);}`);
          if (tpl[0].directives[n].exp) {
            x(`  $_this.$el.bbnSchema.directives['${n}'].value = $_sr('${tpl[0].directives[n].hash}', ${tpl[0].directives[n].exp}, ${hashName});`);
          }
          x(`if (!$_this.$el.bbnDirectives) {Object.defineProperty($_this.$el, 'bbnDirectives', {value: bbn.fn.createObject(), writable: false, configurable: false});}`);
          x(`if (!$_this.$el.bbnDirectives['{$n}']) {$_this.$el.bbnDirectives['${n}'] = bbn.fn.createObject();}`);
        }

        x(`if (!$_this.$numBuild) {`);
        x(`  bbn.cp.insertDirectives($_this.$el.bbnSchema.directives, $_this.$el);`);
        x(`}`);
        for (let n in tpl[0].directives) {
          x(`if ($_this.$numBuild) {`);
          x(`  bbn.cp.updateDirectives({"${n}": $_this.$el.bbnSchema.directives['${n}']}, $_this.$el);`);
          x(`}`);
  
        }
      }
      x(`$_this.$updateFromSchema($_props);`);
      if (tpl[0].events) {
        x(`if (!$_this.$numBuild) {`);
        x.msp();
        for (let n in tpl[0].events) {
          let ev = tpl[0].events[n];

          x(`if (!$_items['-'].bbnSchema?.events?.["${n}"]) {`);
          x.msp();
          //x(`bbn.fn.log("SETTING EVENT ${n} ON " + $_this.$options.name, _ele, ${$_anew});`);
          x(`$_items['-'].addEventListener("${n}", _bbnEventObject => {`);
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
              x(`    $_action.bind($_this.$origin)(...args);`);
              x(`  }`);
            }

            x(`  bbn.fn.iterate($_data, ($_val, $_idx) => {`);
            //x(`    bbn.fn.log(['$_val, $_idx', $_val, $_idx, eval($_idx), $_this[$_idx], '++++']);`);
            x(`    if ($_val !== eval($_idx)) {`);
            x(`      if ($_this[$_idx] !== undefined) {`);
            x(`        $_this[$_idx] = eval($_idx);`);
            x(`      }`);
            x(`      $_data[$_idx] = $_this[$_idx];`);
            x(`    }`);
            x(`  });`);
          }

          //x(`  $_this.$forceUpdate();`);
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
      x(`$_this.$updateFromSchema();`);
    }

    return tpl[0].items;
  }
  x(`$_this.$updateFromSchema();`);
  return tpl;
};


const endCondition = function(node) {
    if (node.condition) {
    x.lsp();
    //x(`Ending condition`);
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
    //x(` Taking care of the node ${node.tag || 'with no tag'} ${node.id}`);
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
        condText += ' ($_gv("' + node.condition.hash + '", ' + hashName + '))';
      }
      // New level
      condText += ' {';
      x(condText);
      x.msp();
    }
    
    x(`$_old = $_this.$retrieveElement("${node.id}", ${hashName});`);
    x(`$_node = $_this.$currentMap['${node.id}'];`);
    x(`$_items['${node.id}'] = $_old;`);
    x(`if (!Object.hasOwn($_go, '${node.id}')) {`);
    x(`  $_go['${node.id}'] = !$_old;`);
    x(`}`);

    // Setting $_fgtn variable
    if (node.forget?.exp) {
      x(`$_sr('${node.forget.hash}', ${node.forget.exp}, ${hashName});`);
      x(`if (!$_fgtn['${node.id}']) {`);
      x(`  $_fgtn['${node.id}'] = bbn.fn.createObject();`);
      x(`}`);
      x(`$_fgtn['${node.id}'][${hashName} || '$_root'] = $_gv('${node.forget.hash}', ${hashName});`);
      x(`if ($_fgtn['${node.id}'][${hashName} || '$_root']) {`);
      x(`  $_items['${node.id}'] = $_par.at(-1);`);
      x(`  $_go['${node.id}'] = false;`);
      x(`}`);
      x(`else if (['NEW', 'MOD'].includes($_gs('${node.forget.hash}', ${hashName}))) {`);
      x(`  $_go['${node.id}'] = true;`);
      x(`}`);

      x(``);
      x(``);
    }

    let treatEle = true;
    if ((!node.pre && (node.tag === 'template'))
        || ('transition' === node.tag)
    ) {
      x(`$_items['${node.id}'] = $_par.at(-1);`);
      x(`$_go['${node.id}'] = false;`);
      treatEle = false;
    }
    else {
      x(`if (!$_go['${node.id}'] && !$_items['${node.id}']) {`);
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
        x(`if ($_gs('${node.forget.hash}', ${hashName}) === 'MOD') {`);
        x(`  if ($_fgtn['${node.id}']?.[${hashName} || '$_root']) {`);
        x(`    if ($_old) {`);
        x(`      $_old.childNodes.forEach(o => {`);
        x(`        $_par.at(-1).appendChild(o);`);
        x(`      });`);
        //x(`      bbn.fn.log("From here");`);
        x(`      $_this.$removeDOM($_old);`);
        x(`    }`);
        x(`    // Ele is the current parent`);
        x(`    $_items['${node.id}'] = $_par.at(-1);`);
        x(`  }`);
        x(`  else {`);
        x(`    $_par.at(-1).childNodes.forEach(o => {`);
        x(`      if (o.bbnId.indexOf('${node.id}' + "-") === 0) {`);
        x(`        $_items['${node.id}'].appendChild(o);`);
        x(`      }`);
        x(`    });`);
        x(`  }`);
        x(`}`);
        x(`else if ($_fgtn['${node.id}']?.[${hashName} || '$_root']) {`);
        x(`  $_items['${node.id}'] = $_par.at(-1);`);
        x(`}`);
        

        x(``);
        x(``);
      }


      if (node.pre) {
        x(`if ($_items['${node.id}']) {`);
        x(`  $_items['${node.id}'].innerHTML = \`${bbn.fn.escapeTicks(node.pre)}\`;`);
        x(`}`);

        x(``);
        x(``);
      }
      else {
        treatItems(cp, node, hashName);
      }
      x(`if ($_items['${node.id}'] && ($_items['${node.id}'] !== $_this.$el)) {`);
      x(`  if ($_this.$el === $_par.at(-1)) {`);
      x(`    $_num['-']++;`);
      x(`  }`);
      x(`  if (!$_num[$_par.at(-1).bbnId]) {`);
      x(`    $_num[$_par.at(-1).bbnId] = 0;`);
      x(`  }`);
      x(`  $_num[$_par.at(-1).bbnId]++;`);
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
  let hashName = '$_hash';
  x.msp();
  x(`const $_res = $_this.$currentResult;`);
  x(`let ${hashName} = '';`);
  // Setting the state of each element in $currentResult to TMP except DEL state, which remains
  x(`bbn.fn.iterate($_res, a => {`);
  x(`  bbn.fn.iterate(a, b => {`);
  x(`    if (b.state !== 'DEL') {`);
  x(`      b.state = 'TMP';`);
  x(`    }`);
  x(`  });`);
  x(`});`);
  x(`const $_data = bbn.fn.createObject();`);
  // Each element with namespace is set in $_data and is added to argNames and argValues
  let argNames = [];
  let argValues = [];
  for (let n in cp.$namespaces) {
    argNames.push(n);
    argValues.push(cp.$namespaces[n] === 'method' ? `$_this['${n}'].bind($_this)` : `$_this['${n}']`);
    if ((n.indexOf('$') !== 0) && !['method', 'props'].includes(cp.$namespaces[n]) && (n !== 'internal')) {
      x(`$_data["${n}"] = $_this.${n};`);
    }
  }

  // Calling the function with each element from namespace as named arguments
  x(`await (async function (${argNames.join(', ')}) {`);
  x.msp();

  //x(`let ownProps = Object.getOwnPropertyNames($_this);`);
  //x(`let n;`);
  //x(`for (let i = 0; n = ownProps[i]; i++) {`);
  //x(`  if ((n.indexOf('$') !== 0) && !$_this.$namespaces[n]) {`);
  //x(`    bbn.fn.warning('var ' + n + ' = $_this["' + n + '"];');`);
  //x(`    eval('var ' + n + ' = $_this["' + n + '"];');`);
  //x(`  }`);
  //x(`}`);
  
  //x(` _setInternalResult`);
  x(`const $_sr = (_name, _exp, _hash) => {`);
  x(`  return $_this.$_setInternalResult($_res, _name, _exp, _hash);`);
  x(`};`);
  //x(` _getInternalState`);
  x(`const $_gs = (_name, _hash) => {`);
  x(`  return $_this.$_getInternalState($_res, _name, _hash);`);
  x(`};`);
  //x(` _getInternalValue`);
  x(`const $_gv = (_name, _hash) => {`);
  x(`  let val = undefined;`);
  x(`  try {`);
  x(`    val = $_this.$_getInternalValue($_res, _name, _hash);`);
  x(`  } catch (e) {`);
  x(`    bbn.fn.log(["THERE SHOULD BE AN ERROR", _name, _t]);`);
  x(`  }`);
  x(`  return val;`);
  x(`};`);
  // Used for conditions
  x(`let _isCondTrue = false;`);
  // Used for setting properties
  x(`let $_props;`);
  x(`let $_tmp1;`);
  x(`let $_tmp2;`);
  x(`let $_node;`);
  // Will be true when an element needs to be created
  x(`let $_anew;`);
  // Will contain an HTML element of the existing element
  x(`let $_old;`);
  // Will contain a map of the current elements while the function is running
  x(`const $_items = bbn.fn.createObject({"-": $_this.$el});`);
  // An array of the parents elements
  x(`const $_par = [$_this.$el];`);
  // Forgotten elements
  x(`const $_fgtn = bbn.fn.createObject();`);
  // An array of booleans meaning a node should be looked into / evaluated
  x(`const $_go = bbn.fn.createObject();`);
  // An object of current indexes in the DOM creation
  x(`const $_num = bbn.fn.createObject({"-": 0});`);
  // An array of the final elements to be inserted
  x(`const $_final = [];`);
  
  // If the element merges with its root, it happens here and the template will change
  const template = treatRoot(cp, tpl, hashName);

  // Taking care of the whole template
  nodesToFunction(cp, template, hashName);

  // Inserting root elements last
  x(`bbn.fn.each($_final, a => {`);
  x(`  $_this.$insertElement(a.ele, $_this.$el, a.position);`);
  x(`})`);
  x.lsp();
  x(`})(${argValues.join(', ')});`);
  x(`return $_res;`);
  x.lsp();
    
  const AsyncFunction = async function () {}.constructor;
  return new AsyncFunction('$_this', x.get(true));
}
