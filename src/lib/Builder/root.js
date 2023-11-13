import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.root = function(tpl) {
  if ((tpl.length === 1)
    && tpl[0].items
    && !tpl[0].attr?.['bbn-if']
    && !tpl[0].attr?.['bbn-for']
    && !tpl[0].attr?.['bbn-model']
    && !tpl[0].attr?.['bbn-forget']
    && !bbn.cp.isComponent(tpl[0])
    && (['div', 'span', cp.$cfg.tag].includes(tpl[0].tag))
  ) {
    //$_items['0-0'] = $_this.$el;
    if (tpl[0].attr) {
      $_props = bbn.fn.createObject();
      for (let n in tpl[0].attr) {
        //$_props[n] = 
        if (tpl[0].attr[n].exp) {
          $_sr(tpl[0].attr[n].hash, tpl[0].attr[n].exp, hashName);
        }
        else {
          bbn.fn.escapeDquotes(tpl[0].attr[n].value);
        }
      }
      if (bbn.fn.numProperties(tpl[0].directives)) {

        for (let n in tpl[0].directives) {
          if (!$_this.$el.bbnSchema.directives) { $_this.$el.bbnSchema.directives = bbn.fn.createObject(); }
          if (!$_this.$el.bbnSchema.directives[n]) { $_this.$el.bbnSchema.directives[n] = bbn.fn.clone($_this.$tpl[0].directives[n]); }
          if (tpl[0].directives[n].exp) {
            $_this.$el.bbnSchema.directives[n].value = $_sr(tpl[0].directives[n].hash, tpl[0].directives[n].exp, hashName);
          }
          if (!$_this.$el.bbnDirectives) { Object.defineProperty($_this.$el, 'bbnDirectives', { value: bbn.fn.createObject(), writable: false, configurable: false }); }
          if (!$_this.$el.bbnDirectives['{$n}']) { $_this.$el.bbnDirectives[n] = bbn.fn.createObject(); }
        }

        if (!$_this.$numBuild) {
          bbn.cp.insertDirectives($_this.$el.bbnSchema.directives, $_this.$el);
        }
        for (let n in tpl[0].directives) {
          if ($_this.$numBuild) {
            bbn.cp.updateDirectives({ n: $_this.$el.bbnSchema.directives[n] }, $_this.$el);
          }

        }
      }
      $_this.$updateFromSchema($_props);
      if (tpl[0].events) {
        if (!$_this.$numBuild) {
          for (let n in tpl[0].events) {
            let ev = tpl[0].events[n];

            if (!$_items['-'].bbnSchema?.events?.[n]) {
              //bbn.fn.log("SETTING EVENT n ON " + $_this.$options.name, _ele, $_anew);
              $_items['-'].addEventListener(n, _bbnEventObject => {
                //  bbn.fn.log("EXECUTING EVENT n ev.exp ON node.tag", _bbnEventObject.detail);
                if (ev.modifiers.length) {
                  if (!_bbnEventObject.key || !JSON.stringify(ev.modifiers).includes(_bbnEventObject.key.toLowerCase())) {
                    return;
                  }
                }

                let $event = _bbnEventObject;

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

                //  $_this.$forceUpdate();
                let eventEnd = '}';
                if (ev.once || ev.passive || ev.capture) {
                  eventEnd += ', {';
                  if (ev.once) {
                    eventEnd += `once: true, `;
                  }

                  if (ev.passive) {
                    eventEnd += `passive: true, `;
                  }

                  if (ev.capture) {
                    eventEnd += `capture: true, `;
                  }

                  eventEnd += '}';
                }

                eventEnd += ');';
              })
            }
          }
        }
      }
    }
    else {
      $_this.$updateFromSchema();
    }

    return tpl[0].items;
  }
  $_this.$updateFromSchema();
  return tpl;
};
