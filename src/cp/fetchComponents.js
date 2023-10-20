import {bbn} from "@bbn/bbn/dist/index.js";

export default async function fetchComponents(toDefine) {
  bbn.fn.checkType(toDefine, Array, bbn._("fetchComponents must be called with an array of component names to fetch"));
  // Returning a promise allows the loading for new components definition
  // No component definitions needed no wait
  if (!toDefine.length) {
    return;
  }

  const groups = bbn.fn.createObject();
  bbn.fn.each(toDefine, tag => {
    bbn.fn.checkType(tag, String);
    let idx = -1;
    let handlerIdx = -1;
    let mixins = [];
    bbn.fn.each(bbn.cp.knownPrefixes, (a, i) => {
      if (a.prefix && (tag.indexOf(a.prefix) === 0)) {
        // Taking the longest (most precise) prefix's rule
        if (a.mixins) {
          bbn.fn.each(a.mixins, m => {
            if (mixins.indexOf(m) === -1) {
              mixins.push(m);
            }
          })
        }

        if (idx > -1) {
          if (a.prefix.length > bbn.cp.knownPrefixes[idx].prefix.length) {
            if (bbn.fn.isFunction(a.handler)) {
              handlerIdx = i;
            }

            idx = i;
          }
          else if ((handlerIdx === -1) && bbn.fn.isFunction(a.handler)) {
            handlerIdx = i;
          }
        }
        else {
          if (bbn.fn.isFunction(a.handler)) {
            handlerIdx = i;
          }

          idx = i;
        }
      }
    });

    if (handlerIdx === -1) {
      throw new Error("Impossible to find a handler for " + tag);
    }

    if (!groups[bbn.cp.knownPrefixes[idx].prefix]) {
      groups[bbn.cp.knownPrefixes[idx].prefix] = bbn.fn.createObject({
        components: [],
        prefix: bbn.cp.knownPrefixes[idx].prefix
      });
      groups[bbn.cp.knownPrefixes[idx].prefix].handler = bbn.cp.knownPrefixes[handlerIdx].handler;
      groups[bbn.cp.knownPrefixes[idx].prefix].mixins = mixins;
    }

    if (mixins) {
      bbn.fn.each(mixins, m => {
        if (groups[bbn.cp.knownPrefixes[idx].prefix].mixins.indexOf(m) === -1) {
          groups[bbn.cp.knownPrefixes[idx].prefix].mixins.push(m);
        }
      });
    }

    groups[bbn.cp.knownPrefixes[idx].prefix].components.push(tag);
  });

  bbn.fn.log("GROUPS", groups);
  for (let prefix in groups) {
    bbn.fn.log("PREFIX");
    const rule = groups[prefix];
    bbn.fn.log("GROUPS2", prefix);
    let res = await rule.handler(rule.components);
    bbn.fn.log("RES", res);
    if (bbn.fn.isArray(res.components)) {
      bbn.fn.each(res.components, obj => {
        if (!obj.definition || !obj.name) {
          throw new Error(bbn._("Impossible to find a definition or a name in %s", rule.prefix));
        }

        if (rule.mixins) {
          if (!bbn.fn.isArray(obj.definition.mixins)) {
            obj.definition.mixins = [];
          }

          bbn.fn.each(rule.mixins, m => {
            if (obj.definition.mixins.indexOf(m) === -1) {
              obj.definition.mixins.push(m);
            }
          });
        }

        //bbn.fn.log(obj.name, obj);
        bbn.cp.define(obj.name, obj.definition, obj.template, obj.css);

      });
    }
  }
}