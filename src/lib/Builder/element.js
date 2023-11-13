import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.loop = async function(node, hashName) {
  if (node.tag) {
    if (node.model) {
      bbn.fn.iterate(node.model, m => {
        $_sr(m.hash, m.exp, hashName);
        if (!$_go && ($_gs(m.hash, hashName) !== "OK")) {
          $_go = true;
        }
      });
    }
    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          $_sr(node.directives[n].hash, node.directives[n].exp, hashName);
          if (!$_go && ($_gs(node.directives[n].hash, hashName) !== "OK")) {
            $_go = true;
          }
        }
      }
    }

    // Start if ($_go)
    if ($_go && !$_fgtn[node.id]?.[hashName || '$_root']) {
      //  bbn.fn.log("IN TODO " + $_this.$options.name);
      //  bbn.fn.log("DOING node.id node.tag");
      $_tmp1 = bbn.fn.clone($_node);
      if (hashName) {
        $_tmp1.loopHash = hashName;
      }
      $_tmp1.props = $_props;

      if (node.tag === 'component') {
        if (bbn.fn.isObject($_props.is)) {
          $_tmp1.tag = $_props.name ? bbn.fn.camelToCss($_props.name) : 'bbn-anon';
          $_tmp1.cfg = bbn.cp.normalizeComponent($_props.is);
        }
        else {
          $_tmp1.tag = bbn.fn.camelToCss($_props.is);
        }
      }

      $_anew = false;
      if (($_items[node.id] !== $_this.$el) && !$_fgtn[node.id]?.[hashName || '$_root'] && (
        !$_items[node.id]
        || bbn.fn.isComment($_items[node.id])
        || !bbn.cp.isTag($_tmp1.tag, $_items[node.id])
      )
      ) {
        $_anew = true;
      }
      if ($_anew) {
        if (node.model) {
          for (let n in node.model) {
            $_tmp1.model[n].value = $_tmp1.props[n] = $_sr($_node.model[n].hash, node.model[n].exp, hashName);
          }
        }
        if (bbn.fn.numProperties(node.directives)) {
          for (let n in node.directives) {
            if (node.directives[n].exp) {
              $_tmp1.directives[n].value = $_gv(node.directives[n].hash, hashName);
            }
          }
        }
        $_items[node.id] = await $_this.$createElement($_tmp1, $_par.at(-1), $_num[$_par.at(-1).bbnId], $_tmp1.loop);
        if ($_par.at(-1) === $_this.$el) {
          $_final.push({ ele: $_items[node.id], position: $_num['-'] - 1 });
        }
        if (bbn.fn.numProperties(node.directives)) {
          bbn.cp.insertDirectives($_items[node.id].bbnSchema.directives, $_items[node.id]);
        }
      }
      else {


        if (node.model) {
          $_tmp1.model = $_items[node.id].bbnSchema.model;
          for (let n in node.model) {
            if (n === '_default_') {
              if ($_this.$isComponent($_items[node.id])) {
                let modelProp = $_items[node.id].bbnCfg?.model?.prop || $_items[node.id].constructor?.bbnCfg?.model?.prop || 'value';
                $_tmp1.model[modelProp].value = $_tmp1.props[modelProp] = $_sr($_node.model[n].hash, node.model[n].exp, hashName);
              }
              else {
                $_tmp1.model.value.value = $_tmp1.props.value = $_sr($_node.model[n].hash, node.model[n].exp, hashName);
              }
            }
            else {
              $_tmp1.model[n].value = $_tmp1.props[n] = $_sr($_node.model[n].hash, node.model[n].exp, hashName);
            }
          }
        }
        if (bbn.fn.numProperties(node.directives)) {
          for (let n in node.directives) {
            if (node.directives[n].exp) {
              if ($_gs(node.directives[n].hash, hashName) !== "OK") {
                $_node.directives[n].value = $_gv(node.directives[n].hash, hashName);
                $_items[node.id].bbnSchema.directives[n].value = $_gv(node.directives[n].hash, hashName);
                bbn.cp.updateDirectives({ n: $_node.directives[n] }, $_items[node.id]);
              }
            }
          }
        }
        $_this.$updateElementFromProps($_tmp1, $_items[node.id]);
      }
      if ($_par.at(-1) === $_this.$el) {
        $_num['-']++;
      }
      if (!$_num[$_par.at(-1).bbnId]) {
        $_num[$_par.at(-1).bbnId] = 0;
      }
      $_num[$_par.at(-1).bbnId]++;
      let hasEvents = Object.keys(node.events || {}).length > 0;

      if (node.model || hasEvents) {
        if ($_anew) {
          x.msp();
          let _bbnCurrentElement = $_items[node.id];
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
              let _bbnEventName = eventName;
              let _bbnRealName = name;
              if (name === '_default_') {
                let _bbnModelCfg = $_this.$isComponent($_items[node.id]) ? $_items[node.id].bbnCfg?.model || $_items[node.id].constructor?.bbnCfg?.model : { prop: 'value', event: _bbnEventName };
                _bbnRealName = _bbnModelCfg.prop;
                _bbnEventName = _bbnModelCfg.event;
                _bbnCurrentElement.bbnSchema.model[_bbnRealName] = _bbnCurrentElement.bbnSchema.model._default_;
                delete _bbnCurrentElement.bbnSchema.model._default_;
                if (node.tag === 'bbn-checkbox') {
                  bbn.fn.warning(_bbnRealName)
                }
              }
              _bbnCurrentElement.addEventListener(_bbnEventName, _bbnEventObject => {
                let $event = _bbnEventObject;
                let _bbnEventValue = $event.detail?.args ? $event.detail.args[0] : $event.target?.value;
                let oldValue = bbn.fn.isPrimitive(modelVarName) ? $_sr(m.hash, modelVarName, hashName) : modelVarName;
                //  bbn.fn.log(["ON MODEL CHANGE", _bbnEventName, oldValue, modelVarRoot, _bbnEventValue, $_this.$options.name]);
                if (oldValue !== _bbnEventValue) {
                  if (modelVarRoot === modelVarName) {
                    if (Object.hasOwn($_this.$props, modelVarRoot)) {
                      //      bbn.fn.log("IS A PROP " + _bbnRealName, $_this.$options.name, modelVarRoot, _bbnEventValue);
                      $_this.$setProp(modelVarRoot, _bbnEventValue);
                    }
                    else {
                      $_this[modelVarRoot] = _bbnEventValue;
                    }
                    modelVarRoot = _bbnEventValue;
                    //    bbn.fn.log("FROM MODEL " + _bbnRealName, $_this.$options.name, $_this.$cfg.props, _bbnEventValue, modelVarRoot, modelVarRoot, Object.hasOwn($_this.$cfg.props, modelVarRoot));
                  }
                  else {
                    modelVarName = _bbnEventValue;
                  }
                  //    if (_bbnCurrentElement?.bbn) {
                  //      _bbnCurrentElement?.bbn.$forceUpdate();
                  //    }
                  //    $_this.$forceUpdate();
                }
              });
            }
          }

          if (hasEvents) {
            for (let n in node.events) {
              let ev = node.events[n];
              //bbn.fn.log("SETTING EVENT n ON " + $_this.$options.name, _ele, $_anew);
              $_items[node.id].addEventListener(n, _bbnEventObject => {
                //  bbn.fn.log("EXECUTING EVENT n ev.exp ON node.tag", _bbnEventObject.detail);
                let $event = _bbnEventObject;
                if (ev.modifiers.length) {
                  //bbn.fn.log($event, n);
                  if (n.indexOf('key') === 0) {
                    if (!_bbnEventObject.key || !JSON.stringify(ev.modifiers).includes(_bbnEventObject.key.toLowerCase())) {
                      return;
                    }
                  }
                  else if (n.indexOf('mouse') === 0) {
                    if (ev.modifiers.includes('right')) {
                      if (_bbnEventObject.button !== 2) {
                        return;
                      }
                    }
                    else if (ev.modifiers.includes('left')) {
                      if (_bbnEventObject.button !== 0) {
                        return;
                      }
                    }
                  }
                }

                if (ev.prevent) {
                  $event.preventDefault();
                }

                if (ev.stop) {
                  $event.stopImmediatePropagation();
                }

                if (ev.exp) {
                  if ((ev.exp.indexOf(';') > -1) || (ev.exp.indexOf('if') === 0)) {
                    ev.exp;
                  }
                  else {
                    let $_action = (ev.exp);
                    if (bbn.fn.isFunction($_action)) {
                      const args = _bbnEventObject.detail?.args || [$event];
                      args.push(_bbnEventObject);
                      $_action.bind($_this.$origin)(...args);
                    }
                  }
                  bbn.fn.iterate($_data, ($_val, $_idx) => {
                    //    bbn.fn.log(['$_val, $_idx', $_val, $_idx, eval($_idx), $_this[$_idx], '++++']);
                    if ($_val !== eval($_idx)) {
                      if ($_this[$_idx] !== undefined) {
                        $_this[$_idx] = eval($_idx);
                      }
                      $_data[$_idx] = $_this[$_idx];
                    }
                  });
                }

                //  $_this.$tick();
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
              });
            }
          }

        }
      }
    }
  }
};
