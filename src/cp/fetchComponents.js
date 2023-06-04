(() => {
  bbn.fn.autoExtend('cp', {
    async fetchComponents(toDefine) {
      bbn.fn.checkType(toDefine, Array);
      // Returning a promise allows the loading for new components definition
      // No component definitions needed no wait
      if (!toDefine.length) {
        return;
      }
      // Fetching definitions
      if (toDefine[0].indexOf('bbn-') === 0) {
        const urlPrefix = cdnUrl + 'dev/bbn-cp/master/src/components/?components=';
        const prefix = 'bbn-';
        const url = urlPrefix + toDefine.map(a => a.indexOf(prefix) === 0 ? a.substr(prefix.length) : a).join(',') + '&v=3280&test=1&lang=fr';
        // Request
        const d = await bbn.fn.ajax(url, 'text');
        let res;
        try {
          res = await eval(d.data);
        }
        catch (e) {
          throw new Error(e);
        }
        bbn.fn.each(res, obj => {
          if (!bbn.fn.isArray(obj.html)) {
            throw new Error("No template for " + obj.name)
          }

          const template = obj.html[0].content;
          const name = prefix + obj.name;
          const finalFn = eval(obj.script);
          bbn.fn.checkType(finalFn, 'function');
          const cpDef = finalFn();
          bbn.cp.define(name, cpDef, template, obj.css);
        });
      }
      else {
        const urlPrefix = 'components/';
        const url = urlPrefix + toDefine.join('/') + '?v=3280&test=1&lang=fr';
        // Request
        const d = await bbn.fn.ajax(url, 'text');
        let res;
        try {
          if (bbn.fn.isString(d.data)) {
            res = eval('(() => {return ' + d.data + '})()');
          }
        }
        catch (e) {
          throw new Error(e);
        }
        if (res.components) {
          bbn.fn.each(res.components, obj => {
            const template = obj.content;
            const name = obj.name;
            //const finalFn = eval(obj.script);
            //bbn.fn.checkType(finalFn, 'function');
            const cpDef = eval(obj.script);
            cpDef.template = template;
            bbn.cp.define(name, cpDef, template, obj.css);
          });
        }
      }
    }
  })
})();
