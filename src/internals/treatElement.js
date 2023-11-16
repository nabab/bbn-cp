import bbn from "@bbn/bbn";
import sr from "../internals/sr.js";
import treatProperties from "./treatProperties.js";
import treatItems from "./treatItems.js";
import treatSlot from "./treatSlot.js";
import treatText from "./treatText.js";

export default async function treatElement (a, cp, hash, parent, go) {
  const res = new DocumentFragment();
  const id = a.id;
  const old = cp.$retrieveElement(id, hash);
  const node = cp.$currentMap[id];
  let ele;
  if (old) {
    ele = old;
  }
  else if (!go) {
    go = true;
  }

  if (node.forget?.exp) {
    const forgotten = sr(cp, node.forget, hash);
    if (cp.$_getInternalState(node.forget.id, hash) === 'OK') {
      go = true;
      if (forgotten) {
        if (ele && a.items) {
          for (let i = 0; i < a.items.length; i++) {
            res.append(treatElement(a.items[i], cp, hash, res, go));
          }

          cp.$removeDOM(ele);
        }

        return res;
      }
      else {
        if (!ele) {
          ele = await cp.$createElement(a, res, data, node);
        }
        bbn.fn.each(a.items, it => {
          const e = cp.$retrieveElement(it.id, hash);
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
    treatText(cp, node, hash);
  }
  else if (node.tag === 'slot') {
    treatSlot(cp, node, hash);
  }
  else if (node.tag) {
    const tmp = treatProperties(cp, node.id, hash, go);
    go = tmp.go;
    const props = tmp.props;



    if (node.model) {
      bbn.fn.iterate(node.model, m => {
        sr(cp, m, hash);
        if (!go && (cp.$_getInternalState(m.id, hash) !== "OK")) {
          go = true;
        }
      });
    }

    if (bbn.fn.numProperties(node.directives)) {
      for (let n in node.directives) {
        if (node.directives[n].exp) {
          sr(cp, node.directives[n], hash);
          if (!go && (cp.$_getInternalState(node.directives.id, hash) !== "OK")) {
            go = true;
          }
        }
      }
    }

    // Start if ($_go)
    if (go) {
      //bbn.fn.log("IN TODO " + cp.$options.name);
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
      if ((ele !== cp.$el) && (!ele || bbn.fn.isComment(ele) || !bbn.cp.isTag(tmp.tag, node))) {
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
              tmp.directives[n].value = sr(cp, node.directives[n], hash);
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
              //let _bbnEventName = '${eventName}';
              //let _bbnRealName = '${name}';
              if (name === '_default_') {
                let modelCfg = cp.$isComponent(ele) ? ele.bbnCfg?.model || ele.constructor?.bbnCfg?.model : {prop: 'value', event: eventName};
                let realName = modelCfg.prop;
                ele.bbnSchema.model[realName] = ele.bbnSchema.model._default_;
                delete ele.bbnSchema.model._default_;
                if (node.tag === 'bbn-checkbox') {
                  bbn.fn.warning(name)
                }
              }
              ele.addEventListener(eventName, e => {
                let $event = e;
                let eventValue = e.detail?.args ? e.detail.args[0] : e.target?.value;
                let oldValue = bbn.fn.isPrimitive(modelVarName ? sr(cp, m, modelVarName, hash) : modelVarName);
                //bbn.fn.log(["ON MODEL CHANGE", _bbnEventName, oldValue, "${modelVarRoot}", _bbnEventValue, cp.$options.name]);
                if (oldValue !== eventValue) {
                  if (modelVarRoot === modelVarName) {
                    if (Object.hasOwn(tmp.props, modelVarRoot)) {
                      //bbn.fn.log("IS A PROP " + _bbnRealName, cp.$options.name, "${modelVarRoot}", _bbnEventValue);
                      cp.$setProp(modelVarRoot, e);
                    }
                    else {
                      cp[modelVarRoot] = eventValue;
                    }

                    modelVarRoot = eventValue;
                    //bbn.fn.log("FROM MODEL " + _bbnRealName, cp.$options.name, cp.$cfg.props, _bbnEventValue, ${modelVarRoot}, "${modelVarRoot}", Object.hasOwn(cp.$cfg.props, "${modelVarRoot}"));
                  }
                  else {
                    modelVarName = eventValue;
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
      const f = await treatItems(cp, node.items, hash);
      if (f) {
        ele.append(f);
      }
    }

    return ele;

  }

  return null;

}
