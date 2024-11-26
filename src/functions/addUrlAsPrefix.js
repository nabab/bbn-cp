import { bbn } from "@bbn/bbn";

/**
 * Adds a prefix just with a URL, which will be used to query the component definitions.
 * 
 * @param {String} prefix - The prefix to be added.
 * @param {String} url - The URL where to seek component definitions.
 * @param {Array} [mixins] - Optional array of mixins to be used with the prefix.
 */
export default function addUrlAsPrefix(prefix, url, mixins) {
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
      throw new Error(e);
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
          throw new Error(e);
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
