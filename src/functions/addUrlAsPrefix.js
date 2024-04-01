import {bbn} from "@bbn/bbn";

/**
 * Adds a prefix to the list of known prefixes for component names.
 * Each prefix can have an associated handler function and an array of mixins.
 *
 * Handles component prefixes within the framework. 
 * It allows the registration of prefixes along with associated handlers and mixins. 
 * The sorting by prefix length ensures that when resolving component names, 
 * the most specific prefix is considered first, which is important for accurately 
 * identifying components and applying the correct behavior and mixins.
 * 
 * Considerations:
 * - Error Handling: Ensure robust error handling, especially if the prefix or handler does not meet the expected criteria.
 * - Performance: Consider the impact of repeatedly sorting the knownPrefixes array, especially if addPrefix is called frequently.
 * - Namespace Pollution: Be cautious of potential namespace pollution or conflicts, especially in a large application with many prefixes.
 * - Mixins Integration: If mixins are a core part of the framework, ensure their integration with prefixes is seamless and well-documented.
 * 
 * @param {string} prefix - The prefix to be added.
 * @param {Function} [handler] - Optional handler function associated with the prefix.
 * @param {Array} [mixins] - Optional array of mixins to be used with the prefix.
 */
export default function addUrlAsPrefix(prefix, url, mixins){
  return bbn.cp.addPrefix(prefix, async components => {
    if (bbn.fn.substr(url, -1) !== '/') {
      url += '/';
    }
    if (bbn.fn.substr(prefix, -1) !== '-') {
      prefix += '/';
    }
    
    const furl = url + components.join('/') 
        + '?v=' + bbn.cp.version
        + '&test=' + (bbn.env.isDev ? '1' : '0')
        + '&lang=' + bbn.env.lang;
    // Request
    const d = await bbn.fn.ajax(furl, 'text');
    let tmp;
    try {
      if (bbn.fn.isString(d.data)) {
        tmp = (new Function('return ' + d.data + ';'))();
      }
    }
    catch (e) {
      throw Error(e);
    }

    const res = bbn.fn.createObject({
      components: []
    });

    if (tmp.components) {
      bbn.fn.each(tmp.components, obj => {
        let definition;
        try {
          definition = eval(obj.script);
        }
        catch (e) {
          throw Error(e);
        }
        if (!bbn.fn.isEmpty(mixins) && definition) {
          if (!definition.mixins) {
            definition.mixins = [];
          }

          definition.mixins.push(...(bbn.fn.isObject(mixins) ? [mixins] : mixins));
        }

        res.components.push(bbn.fn.createObject({
          name: obj.name,
          definition,
          template: obj.content,
          css: obj.css || null
        }));
      });
    }

    return res;
  });
}
