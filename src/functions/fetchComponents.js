import {bbn} from "@bbn/bbn";

/**
 * Fetches and defines components based on provided names and prefixes.
 * @param {Array<string>} toDefine - Array of component names to fetch and define.
 */
export default async function fetchComponents(toDefine) {
  bbn.fn.checkType(toDefine, Array, bbn._("fetchComponents must be called with an array of component names to fetch"));
  // Returning a promise allows the loading for new components definition
  // No component definitions needed no wait
  if (!toDefine.length) {
    return;
  }

// Grouping components by their prefixes.
  const groups = bbn.fn.createObject();
  bbn.fn.each(toDefine, tag => {
    bbn.fn.checkType(tag, String); // Ensure each tag is a string.
    let idx = -1;
    let handlerIdx = -1;
    let mixins = [];

    // Determine the appropriate handler based on known prefixes.
    bbn.fn.each(bbn.cp.knownPrefixes, (a, i) => {
      if (a.prefix && (tag.indexOf(a.prefix) === 0)) {
        // Adding mixins from the prefix rule.
        if (a.mixins) {
          bbn.fn.each(a.mixins, m => {
            if (!mixins.includes(m)) {
              mixins.push(m);
            }
          });
        }

        // Selecting the longest matching prefix.
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
          handlerIdx = bbn.fn.isFunction(a.handler) ? i : handlerIdx;
          idx = i;
        }
      }
    });

    if (handlerIdx === -1) {
      throw Error("Impossible to find a handler for " + tag);
    }

    // Group components under the same prefix.
    if (!groups[bbn.cp.knownPrefixes[idx].prefix]) {
      groups[bbn.cp.knownPrefixes[idx].prefix] = bbn.fn.createObject({
        components: [],
        prefix: bbn.cp.knownPrefixes[idx].prefix
      });
      groups[bbn.cp.knownPrefixes[idx].prefix].handler = bbn.cp.knownPrefixes[handlerIdx].handler;
      groups[bbn.cp.knownPrefixes[idx].prefix].mixins = mixins;
    }

    // Add mixins to the group.
    if (mixins) {
      bbn.fn.each(mixins, m => {
        if (!groups[bbn.cp.knownPrefixes[idx].prefix].mixins.includes(m)) {
          groups[bbn.cp.knownPrefixes[idx].prefix].mixins.push(m);
        }
      });
    }

    // Add the component to its group.
    groups[bbn.cp.knownPrefixes[idx].prefix].components.push(tag);
  });

  // Process each group of components.
  for (let prefix in groups) {
    const rule = groups[prefix];
    let res = await rule.handler(rule.components);
    
    if (bbn.fn.isArray(res.components)) {
      // Define each component in the group.
      bbn.fn.each(res.components, obj => {
        if (!obj.definition || !obj.name) {
          throw Error(bbn._("Impossible to find a definition or a name in %s", rule.prefix));
        }

        // Add mixins to the component definition.
        if (rule.mixins) {
          obj.definition.mixins = obj.definition.mixins || [];
          bbn.fn.each(rule.mixins, m => {
            if (!obj.definition.mixins.includes(m)) {
              obj.definition.mixins.push(m);
            }
          });
        }

        // Define the component using bbn.cp.define.
        bbn.cp.define(obj.name, obj.definition, obj.template, obj.css);
      });
    }
  }
}
