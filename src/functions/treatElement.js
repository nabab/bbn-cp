import bbn from "@bbn/bbn";
import sr from "../internals/sr.js";
import treatText from "./treatText.js";
import treatSlot from "./treatSlot.js";

export default async function treatElement (a, cp, hash, parent, go) {
  const res = new DocumentFragment();
  const id = a.id;
  const old = this.$retrieveElement(id, hash);
  const node = this.$currentMap[id];
  if (old) {
    ele = old;
  }
  else if (!go) {
    go = true;
  }

  if (node.forget?.exp) {
    const forgotten = sr(cp, node.forget, hash);
    if (this.$_getInternalState(node.forget.id, hash) === 'OK') {
      go = true;
      if (forgotten) {
        if (ele && a.items) {
          for (let i = 0; i < a.items.length; i++) {
            res.append(treatElement(a.items[i], cp, hash, res, go));
          }

          this.$removeDOM(ele);
        }

        return res;
      }
      else {
        if (!ele) {
          ele = await this.$createElement(a, res, data, node);
        }
        bbn.fn.each(a.items, it => {
          const e = this.$retrieveElement(it.id, hash);
          ele.appendChild(e);
        });
      }
    }
  }

  if (!node.pre && ['transition', 'template'].includes(node.tag)) {
    if (ele && a.items) {
      for (let i = 0; i < a.items.length; i++) {
        res.append(treatElement(a.items[i], cp, hash, res, go));
      }
    }

    return res;
  }
  else {
    if (!go && !ele) {
      go = true;
    }
  }

  if (node.text) {
    treatText(node, hashName);
  }
  else if (node.tag === 'slot') {
    treatSlot(cp, node, hashName);
  }
  else if (node.tag) {
    bbn.fn.log([cp, node.id, hash, go]);
    const tmp = bbn.cp.treatProperties(cp, node.id, hash, go);
    bbn.fn.log(tmp);
    go = tmp.go;
    const props = tmp.props;



    if (node.model) {
      bbn.fn.iterate(node.model, m => {
        sr(m.id, hash);
        if (!go && (cp.$_getInternalState(m.id, hash) !== "OK")) {
          go = true;
        }
      });
    }

    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          sr(node.directives[n], hash);
          if (!go && (cp.$_getInternalState(node.directives.id, hash) !== "OK")) {
            go = true;
          }
        }
      }
    }

    // Start if ($_go)
    if (go) {
      //bbn.fn.log("IN TODO " + $_this.$options.name);
      //bbn.fn.log("DOING ${node.id} ${node.tag}");
      const tmp = bbn.fn.clone(node);
      delete tmp.items;
      if (hash) {
        tmp.loopHash = hash;
      }
      tmp.props = props;
      
      if (node.tag === 'component') {
        if (bbn.fn.isObject(props.is)) {
          tmp.tag = props.name ? bbn.fn.camelToCss(props.name) : 'bbn-anon';
          tmp.cfg = bbn.cp.normalizeComponent(props.is);
        }
        else {
          tmp.tag = bbn.fn.camelToCss(props.is);
        }
      }
      let anew = false;
      if ((ele !== this.$el) && (!ele || bbn.fn.isComment(ele) || !bbn.cp.isTag(tmp.tag, node))) {
        anew = true;
      }

      if (anew) {
        if (node.model) {
          for (let n in node.model) {
            tmp.model[n].value = tmp.props[n];
          }
        }

        if (bbn.fn.numProperties(node.directives)) {
          for (let n in node.directives) {
            if (node.directives[n].exp) {
              tmp.directives[n].value = sr(node.directives[n], hash);
            }
          }
        }
        ele = await cp.$createElement(tmp, res);
        if (bbn.fn.numProperties(node.directives)) {
          bbn.cp.insertDirectives(ele.bbnSchema.directives, ele);
        }

        let hasEvents = Object.keys(node.events || {}).length > 0;
        if (node.model || hasEvents) {
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
                let _bbnModelCfg = cp.$isComponent(ele) ? ele.bbnCfg?.model || ele.constructor?.bbnCfg?.model : {prop: 'value', event: eventName};
                _bbnRealName = _bbnModelCfg.prop;
                _bbnEventName = _bbnModelCfg.event;
                ele.bbnSchema.model[_bbnRealName] = ele.bbnSchema.model._default_;
                delete _bbnCurrentElement.bbnSchema.model._default_;
                if (node.tag === 'bbn-checkbox') {
                  bbn.fn.warning(name)
                }
              }
              ele.addEventListener(eventName, e => {
                let $event = e;
                let _bbnEventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
                let oldValue = bbn.fn.isPrimitive(modelVarName ? sr(m, modelVarName, hash) : modelVarName);
                //bbn.fn.log(["ON MODEL CHANGE", _bbnEventName, oldValue, "${modelVarRoot}", _bbnEventValue, $_this.$options.name]);
                if (oldValue !== _bbnEventValue) {
                  if (modelVarRoot === modelVarName) {
                    if (Object.hasOwn(tmp.props, modelVarRoot)) {
                      //bbn.fn.log("IS A PROP " + _bbnRealName, $_this.$options.name, "${modelVarRoot}", _bbnEventValue);
                      cp.$setProp(modelVarRoot, e);
                    }
                    else {
                      cp[modelVarRoot] = _bbnEventValue;
                    }

                    modelVarRoot = _bbnEventValue;
                    //bbn.fn.log("FROM MODEL " + _bbnRealName, $_this.$options.name, $_this.$cfg.props, _bbnEventValue, ${modelVarRoot}, "${modelVarRoot}", Object.hasOwn($_this.$cfg.props, "${modelVarRoot}"));
                  }
                  else {
                    modelVarName = _bbnEventValue;
                  }
                }
              });
            }
          }
    
          if (hasEvents) {
            bbn.cp.treatEvents(cp, ele);
          }
        }
    
      }
      else {
        if (node.model) {
          tmp.model = ele.bbnSchema.model;
          for (let n in node.model) {
            if (n === '_default_') {
              if (cp.$isComponent(ele)) {
                let modelProp = ele.bbnCfg?.model?.prop || ele.constructor?.bbnCfg?.model?.prop || 'value';
                tmp.model[modelProp].value = tmp.props[modelProp];
              }
              else {
                tmp.model.value.value = tmp.props.value;
              }
            }
            else {
              tmp.model[n].value = tmp.props[n];
            }
          }
        }
        if (bbn.fn.numProperties(node.directives)) {
          for (let n in node.directives) {
            if (node.directives[n].exp) {
              if ($cp.$_getInternalState(node.directives[n].id, hash) !== "OK") {
                node.directives[n].value = cp.$_getInternalValue(node.directives[n].id, hash);
                ele.bbnSchema.directives[n].value = node.directives[n].value;
                bbn.cp.updateDirectives({[n]: node.directives[n]}, ele);
              }
            }
          }
        }
        cp.$updateElementFromProps(tmp, ele);
      }
    }

    if (node.pre) {
      if (ele) {
        let preVal = cp.$_getInternalResult(node.id, `${node.pre}`, hash);
        if (ele.innerHTML !== preVal) {
          ele.innerHTML = preVal;
        }
      }
    }
    else if (node.items) {
      treatItems(cp, node, hashName);
    }
  }

}
